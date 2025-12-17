import Job from "../models/Job.js";
import configureCloudinary from '../config/cloudinary.js';
import fs from 'fs';

// CREATE JOB with Image Upload
export const createJob = async (req, res) => {
  try {
    let logoUrl = '';

    // Upload to Cloudinary if file exists
    if (req.file) {
      const cloudinary = configureCloudinary(); // Configure on first use
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'job-logos',
        transformation: [{ width: 200, height: 200, crop: 'limit' }]
      });
      logoUrl = result.secure_url;

      // Delete local file after upload
      fs.unlinkSync(req.file.path);
    }

    // Parse JSON arrays from FormData
    const responsibilities = req.body.responsibilities ? JSON.parse(req.body.responsibilities) : [];
    const qualifications = req.body.qualifications ? JSON.parse(req.body.qualifications) : [];
    const preferredSkills = req.body.preferredSkills ? JSON.parse(req.body.preferredSkills) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const jobData = {
      title: req.body.title,
      company: req.body.company,
      logo: logoUrl,
      category: req.body.category,
      department: req.body.department,
      location: req.body.location,
      jobType: req.body.jobType,
      experience: req.body.experience,
      education: req.body.education,
      mode: req.body.mode,
      salary: req.body.salary,
      openings: parseInt(req.body.openings) || 1,
      deadline: req.body.deadline,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      responsibilities,
      qualifications,
      preferredSkills,
      tags,
      applyLink: req.body.applyLink,
      postedBy: req.body.postedBy,
      isFeatured: req.body.isFeatured === 'true'
    };

    const newJob = await Job.create(jobData);
    res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ message: err.message });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE JOB BY ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET JOBS BY CATEGORY
export const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const jobs = await Job.find({ category });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET JOBS BY DEPARTMENT
export const getJobsByDepartment = async (req, res) => {
  try {
    let { department } = req.params;
    if (!department) return res.status(400).json({ message: "Department required" });

    department = decodeURIComponent(department).trim();
    const regex = new RegExp(`^${department}$`, "i");

    const jobs = await Job.find({ department: { $regex: regex } });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this department" });
    }
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE FEATURED JOB
export const createFeaturedJob = async (req, res) => {
  try {
    let logoUrl = '';

    if (req.file) {
      const cloudinary = configureCloudinary(); // Configure on first use
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'job-logos',
        transformation: [{ width: 200, height: 200, crop: 'limit' }]
      });
      logoUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const responsibilities = req.body.responsibilities ? JSON.parse(req.body.responsibilities) : [];
    const qualifications = req.body.qualifications ? JSON.parse(req.body.qualifications) : [];
    const preferredSkills = req.body.preferredSkills ? JSON.parse(req.body.preferredSkills) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const jobData = {
      ...req.body,
      logo: logoUrl,
      responsibilities,
      qualifications,
      preferredSkills,
      tags,
      openings: parseInt(req.body.openings) || 1,
      isFeatured: true
    };

    const newJob = await Job.create(jobData);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL FEATURED JOBS
export const getAllFeaturedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};