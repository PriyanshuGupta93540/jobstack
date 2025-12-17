"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Briefcase, Bookmark, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeCompTwo = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch featured jobs from API
  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/featured`
        );


        if (!response.ok) {
          throw new Error('Failed to fetch featured jobs');
        }

        const data = await response.json();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  // Handle View Details - Same logic as JobCard
  const handleViewDetails = (job) => {
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

  // Loading state
  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading featured jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading jobs</p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No jobs found
  if (jobs.length === 0) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-600">No featured jobs available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className='text-teal-600'>Jobs</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore top opportunities across Tech and Non-Tech domains from leading global brands.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-teal-200 transition-all duration-300 cursor-pointer"
              onClick={() => handleViewDetails(job)}
            >
              {/* Header with Logo and Bookmark */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-teal-100 rounded flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-lg">
                          {job.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">{job.company}</p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {job.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    // Add bookmark functionality here
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <Bookmark className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{job.jobType}</span>
                </div>
                {job.experience && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span>{job.experience}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    {job.salary ? (
                      <>
                        <p className="text-xl font-bold text-gray-900">
                          {job.salary}
                        </p>
                        <p className="text-xs text-gray-500">/Year</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">Salary not disclosed</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatDate(job.createdAt)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double navigation
                    handleViewDetails(job);
                  }}
                  className="w-full py-2.5 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCompTwo;