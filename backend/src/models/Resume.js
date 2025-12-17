import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: String,
    education: String
  }
});

export default mongoose.model('Resume', resumeSchema);