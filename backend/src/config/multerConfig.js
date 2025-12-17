import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';
import { GridFSBucket } from 'mongodb';

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
  }
};

// Create multer storage using MongoDB GridFSBucket directly
const storage = multer.memoryStorage(); // Store in memory first

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Helper function to upload to GridFS
export const uploadToGridFS = (file) => {
  return new Promise((resolve, reject) => {
    const filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);
    
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName: file.originalname,
        mimeType: file.mimetype
      }
    });

    uploadStream.on('error', (error) => {
      reject(error);
    });

    uploadStream.on('finish', () => {
      resolve({
        id: uploadStream.id,
        filename: filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.buffer.length
      });
    });

    uploadStream.end(file.buffer);
  });
};

export default upload;