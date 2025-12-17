"use client";

import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import SearchFilterSidebar from "../components/SearchFilterSidebar";

const TechCompOne = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { name: "Software Development", count: 62 },
    { name: "Data & Analytics", count: 31 },
    { name: "AI & Machine Learning", count: 20 },
    { name: "Cloud & DevOps", count: 43 },
    { name: "Cyber Security", count: 16 },
    { name: "Product & Project", count: 22 },
    { name: "UI/UX & Design", count: 21 },
    { name: "Quality Assurance (QA)", count: 17 },
    { name: "Networking & IT Support", count: 12 },
    { name: "Blockchain & Web3", count: 64 },
    { name: "IoT & Embedded Systems", count: 94 }
  ];

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
        );

        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();

        const transformedJobs = data.map((job, index) => ({
          id: job._id || index,
          title: job.title,
          company: job.company,
          tags: job.tags || [],
          logo: job.logo || getDefaultLogo(job.category || job.department),
          bgColor: getBgColorByCategory(job.category),
          salary: job.salary,
          location: job.location,
          department: job.department,
          rating: job.rating,
          openings: "Available",
          featured: job.rating >= 4.5,
          urgent: false,
          type: job.department,
          shortDescription: job.shortDescription,
          longDescription: job.longDescription,
          qualifications: job.qualifications,
          category: job.category,
          experience: job.experience,
          education: job.education
        }));

        setJobs(transformedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getDefaultLogo = (category) => {
    const logoMap = {
      tech: "💻",
      software: "💼",
      design: "🎨",
      management: "📊",
      development: "🔧",
      frontend: "🎯",
      backend: "🔥",
      fullstack: "⚡",
      data: "📈",
      default: "💼"
    };
    return logoMap[category?.toLowerCase()] || logoMap.default;
  };

  const getBgColorByCategory = (category) => {
    const colorMap = {
      tech: "bg-teal-500",
      design: "bg-pink-500",
      management: "bg-blue-900",
      development: "bg-green-500",
      software: "bg-blue-600",
      frontend: "bg-purple-500",
      backend: "bg-red-500",
      default: "bg-gray-500"
    };
    return colorMap[category?.toLowerCase()] || colorMap.default;
  };

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
  };

  // FIXED FILTERING LOGIC
  const filteredJobs =
    selectedCategories.length === 0
      ? jobs
      : jobs.filter((job) =>
        selectedCategories.some((selectedCat) => {
          // Match against the job's category field
          return job.category?.toLowerCase().includes(selectedCat.toLowerCase()) ||
            selectedCat.toLowerCase().includes(job.category?.toLowerCase());
        })
      );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <SearchFilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onClearAll={clearAllFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  1 - {Math.min(10, filteredJobs.length)}
                </span>{" "}
                of <span className="font-semibold">{filteredJobs.length}</span>{" "}
                Results
              </p>

              <div className="flex gap-3">
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
                  <option>Sort by (Default)</option>
                  <option>Sort by: Newest</option>
                  <option>Sort by: Salary</option>
                  <option>Sort by: Rating</option>
                </select>

                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
                  <option>10 Per Page</option>
                  <option>20 Per Page</option>
                  <option>50 Per Page</option>
                </select>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-center rounded-lg">
                Error loading jobs: {error}
              </div>
            )}

            {/* Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                      No jobs found matching the selected categories
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      3
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCompOne;