import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load dotenv FIRST, before any other imports that use env vars
dotenv.config();

// ✅ Now import routes and config (after dotenv is loaded)
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

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB
connectDB();

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));