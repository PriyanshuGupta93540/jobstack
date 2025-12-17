import express from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByCategory,
  createJob,
  getJobsByDepartment,
  createFeaturedJob,
  getAllFeaturedJobs
} from '../controllers/jobController.js';
// import upload from '../middleware/upload.js';
import upload from '../../middleware/upload.js';
// import { authenticateAdmin } from '../middleware/authMiddleware.js'; 
import authenticateAdmin  from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/featured', getAllFeaturedJobs);
router.get('/category/:category', getJobsByCategory);
router.get('/department/:department', getJobsByDepartment);
router.get('/:id', getJobById);

// Protected routes with file upload (using your authenticateAdmin middleware)
router.post('/', authenticateAdmin, upload.single('logo'), createJob);
router.post('/featured', authenticateAdmin, upload.single('logo'), createFeaturedJob);

export default router;