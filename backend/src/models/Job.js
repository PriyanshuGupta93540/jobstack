import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    company: { type: String, required: true },
    logo: { type: String },

    category: { type: String, required: true },   
    department: { type: String, enum: ["Tech", "Nontech"] },                 
    location: { type: String, required: true },   

    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time" },

    experience: { type: String },               
    education: { type: String },              

    mode: { type: String, enum: ["Remote", "Onsite", "Hybrid"], default: "Onsite" },

    salary: { type: String },                
    rating: { type: Number, default: 0 },

    openings: { type: Number, default: 1 },       
    deadline: { type: Date },                     

    shortDescription: { type: String },
    longDescription: { type: String },

    responsibilities: [{ type: String }],         
    qualifications: [{ type: String }],           
    preferredSkills: [{ type: String }],          

    tags: [{ type: String }],

    applyLink: { type: String },                  
    postedBy: { type: String },                   
    isActive: { type: Boolean, default: true },   
    isFeatured: { type: Boolean, default: false }, // ✅ NEW: Mark jobs as featured
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);