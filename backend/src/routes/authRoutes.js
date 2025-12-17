import express from 'express';
import { login, verifyToken } from '../controllers/authController.js';
import authenticateAdmin  from '../../middleware/authMiddleware.js';
// import authenticateAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticateAdmin, verifyToken);

export default router;