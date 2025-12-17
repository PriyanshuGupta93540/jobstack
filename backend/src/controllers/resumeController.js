import Resume from '../models/Resume.js';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { uploadToGridFS } from '../config/multerConfig.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Upload file to GridFS
    const uploadedFile = await uploadToGridFS(req.file);

    // Save resume metadata to database
    const resume = new Resume({
      filename: uploadedFile.filename,
      originalName: uploadedFile.originalname,
      fileId: uploadedFile.id,
      mimeType: uploadedFile.mimetype,
      size: uploadedFile.size
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        id: resume._id,
        filename: resume.originalName,
        uploadedAt: resume.uploadedAt
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading resume',
      error: error.message
    });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({ uploadedAt: -1 })
      .select('-fileId');

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes',
      error: error.message
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const downloadStream = bucket.openDownloadStream(resume.fileId);

    downloadStream.on('error', (error) => {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    });

    res.set('Content-Type', resume.mimeType);
    res.set('Content-Disposition', `attachment; filename="${resume.originalName}"`);

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading resume',
      error: error.message
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    // Delete file from GridFS
    await bucket.delete(resume.fileId);

    // Delete resume metadata
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: error.message
    });
  }
};