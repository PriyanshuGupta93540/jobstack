import express from 'express';
import {
  subscribe,
  getAllSubscribers,
  deleteSubscriber
} from '../controllers/subscriberController.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', subscribe);

// Get all subscribers
router.get('/', getAllSubscribers);

// Delete subscriber
router.delete('/:id', deleteSubscriber);

export default router;