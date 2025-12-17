"use client";

import React from "react";
import { useRouter } from "next/navigation";

const JobCard = ({ job }) => {
  const router = useRouter();

const handleViewDetails = () => {
  const jobId = job._id || job.id;

  // Option 1: If you have separate folders for tech and non-tech
  if (job.department?.toLowerCase() === "tech") {
    router.push(`/tech/${jobId}`);
  } else {
    router.push(`/non-tech/${jobId}`);
  }

  // Option 2: If you want one shared details page for all jobs (recommended)
  // router.push(`/jobs/${jobId}`);
};

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 px-6 pt-4 pb-6 relative max-w-sm">
      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded">
            Featured
          </span>
        </div>
      )}

      {/* Company Logo and Name */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          {job.logo && (job.logo.startsWith("data:image") || job.logo.startsWith("http")) ? (
            <img
              src={job.logo}
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {job.logo || job.company?.charAt(0) || "C"}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            {job.company || "Company"}
          </h4>
          {job.companySubtitle && (
            <p className="text-sm text-gray-600">{job.companySubtitle}</p>
          )}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {job.title || "Job Title"}
      </h3>

      {/* Location/Mode Badge */}
      {(job.mode || job.location) && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-pink-600 bg-pink-50 px-3 py-1.5 rounded">
            <span>📍</span>
            {job.location}
          </span>
        </div>
      )}

      {/* Details: Category, Experience, Education */}
      {(job.category || job.experience || job.education) && (
        <div className="mb-4 space-y-1 text-sm text-gray-700">
          {job.category && (
            <p>
              <span className="font-semibold">Category:</span> {job.category}
            </p>
          )}
          {job.experience && (
            <p>
              <span className="font-semibold">Experience:</span> {job.experience}
            </p>
          )}
          {job.education && (
            <p>
              <span className="font-semibold">Education:</span> {job.education}
            </p>
          )}
        </div>
      )}

      {/* Preferred Skills */}
      {job.tags && job.tags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Preferred Skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* View Details Button */}
      <button 
        onClick={handleViewDetails}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;