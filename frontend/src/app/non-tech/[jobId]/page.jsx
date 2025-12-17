// app/non-tech/[jobId]/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import JobPersonalOne from "@/app/components/JobPersonalOne";
import JobPersonalTwo from "@/app/components/JobPersonalTwo";
// import JobPersonalOne from "@/components/job-details/JobPersonalOne";
// import JobPersonalTwo from "@/components/job-details/JobPersonalTwo";

const NonTechJobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`
        );


        if (!res.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await res.json();
        setJob(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "This job may have been removed."}</p>
          <button
            onClick={() => router.back()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            ← Back to Non-Tech Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full">
        {/* Back Button */}
        {/* <button
          onClick={() => router.back()}
          className="mb-8 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition"
        >
          ← Back to Non-Tech Jobs */}
        {/* </button> */}

        {/* Beautiful Details Layout */}
        <div className="space-y-12">
          <JobPersonalOne job={job} />
          <JobPersonalTwo job={job} />
        </div>
      </div>
    </div>
  );
};

export default NonTechJobDetailsPage;