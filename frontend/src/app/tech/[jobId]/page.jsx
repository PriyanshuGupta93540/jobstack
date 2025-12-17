// app/jobs/[jobId]/page.jsx   (or app/tech/[jobId]/page.jsx — same file works for both)

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import JobPersonalTwo from "@/app/components/JobPersonalTwo";
import JobPersonalOne from "@/app/components/JobPersonalOne";
// import JobPersonalOne from "@/components/job-details/JobPersonalOne";
// import JobPersonalTwo from "@/components/job-details/JobPersonalTwo";

const JobDetailsPage = () => {
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


        if (!res.ok) throw new Error("Failed to fetch job");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError("Job not found or something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <button
            onClick={() => router.back()}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto ">
        {/* Back Button */}
        {/* <button
          onClick={() => router.back()}
          className="mb-8 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition"
        >
          Back to Jobs
        </button> */}

        {/* Job Content – Split into Two Clean Components */}
        <div className="space-y-12">
          <JobPersonalOne job={job} />
          <JobPersonalTwo job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;