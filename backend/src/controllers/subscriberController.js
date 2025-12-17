import Subscriber from '../models/Subscriber.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    // Create new subscriber
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed!',
      data: {
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt
      }
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing. Please try again.',
      error: error.message
    });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .sort({ subscribedAt: -1 })
      .select('email subscribedAt');

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers',
      error: error.message
    });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await Subscriber.findByIdAndDelete(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting subscriber',
      error: error.message
    });
  }
};
