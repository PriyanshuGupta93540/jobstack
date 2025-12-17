import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    
    // Create default admin if not exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Admin'
      });
      console.log('Default admin created');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB