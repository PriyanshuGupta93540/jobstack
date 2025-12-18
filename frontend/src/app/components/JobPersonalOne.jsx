// components/job-details/JobPersonalOne.jsx

import React from "react";
import { Briefcase, MapPin, DollarSign, Star } from "lucide-react";

const JobPersonalOne = ({ job }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700">
      {/* Breadcrumb */}
      {/* <div className="container mx-auto px-6 py-4">
        <nav className="text-white text-sm">
          <span className="opacity-75">Home</span>
          <span className="mx-2 opacity-75">/</span>
          <span className="opacity-75">Career</span>
          <span className="mx-2 opacity-75">/</span>
          <span>{job.title}</span>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Job Type Badge */}
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {job.jobType || "Full Time"}
              </span>
            </div>

            {/* Job Title */}
            <div>
              <h1 className="text-5xl font-bold mb-4">{job.title}</h1>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                {job.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(job.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                    <span className="ml-1">{job.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed max-w-xl">
              {job.shortDescription || job.description || "We are looking for an experienced Senior Front-End Developer..."}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <a
                href={job.applyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105"
              >
                Apply Job
              </a>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-lg transition-all border border-white/30">
                Save job
              </button>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-300">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-sm font-medium">Department</span>
                </div>
                <p className="text-lg font-semibold">
                  {job.department || "Software"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-300">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-lg font-semibold">
                  {job.location}
                  {job.mode && `, ${job.mode}`}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-300">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Salary</span>
                </div>
                <p className="text-lg font-semibold">
                  {job.salary
                    ? `$${job.salary} PA`
                    : job.salaryRange || "$5000-$10,000 PA"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-full overflow-hidden w-[500px] h-[500px] mx-auto shadow-2xl">
                <img
                  src={
                    job.image ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
                  }
                  alt="Professional"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-orange-400/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-24 h-24 bg-teal-400/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPersonalOne;  