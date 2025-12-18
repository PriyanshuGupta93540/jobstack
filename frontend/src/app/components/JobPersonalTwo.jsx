// components/job-details/JobPersonalTwo.jsx
import React from "react";
import { CheckCircle, FileText, Users, Code } from "lucide-react";

const JobPersonalTwo = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-10 max-w-4xl mx-16 mb-12">
      {/* Short Description */}
      {job.shortDescription && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Overview</h2>
          <p className=" leading-relaxed text-gray-600 leading-relaxed whitespace-pre-line roboto-text tracking-wide text-[15px]">{job.shortDescription}</p>
        </div>
      )}

      {/* Long Description */}
      {job.longDescription && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Full Description</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line roboto-text tracking-wide text-[15px]">{job.longDescription}</p>
        </div>
      )}

      {/* Responsibilities */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-teal-600" />
            Responsibilities
          </h2>
          <ul className="space-y-2 text-gray-700 font-sans">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600 leading-relaxed whitespace-pre-line roboto-text tracking-wide text-[15px]">
                <span className="text-teal-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Qualifications */}
      {job.qualifications && job.qualifications.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FileText className="w-7 h-7 text-teal-600" />
            Qualifications
          </h2>
          <ul className="space-y-2 text-gray-700">
            {job.qualifications.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600 leading-relaxed whitespace-pre-line roboto-text tracking-wide text-[15px]">
                <span className="text-teal-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preferred Skills */}
      {job.preferredSkills && job.preferredSkills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Code className="w-7 h-7 text-teal-600" />
            Preferred Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {job.preferredSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-gray-600 leading-relaxed whitespace-pre-line roboto-text tracking-wide text-[15px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPersonalTwo;