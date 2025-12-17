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

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB
connectDB();

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

// ✅ For Vercel: Export the app instead of listening
export default app;

// ✅ For local development: Only listen if not in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}