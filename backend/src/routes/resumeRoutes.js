import express from 'express';
import upload from '../config/multerConfig.js';
import {
  uploadResume,
  getAllResumes,
  getResume,
  deleteResume
} from '../controllers/resumeController.js';

const router = express.Router();

// Resume upload routes - anyone can upload
router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResume);
router.delete('/:id', deleteResume);

export default router;