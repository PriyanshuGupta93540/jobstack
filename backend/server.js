import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import jobRoutes from "./src/routes/jobRoutes.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";
import connectDB from "./src/config/db.js";
import subscriberRoutes from "./src/routes/subscriberRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB
connectDB();

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Job Portal API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

// Start server - BIND TO 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});