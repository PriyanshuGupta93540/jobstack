"use client";

import React, { useState, useEffect } from "react";
import SearchFilterSidebar from "../components/SearchFilterSidebar";
import JobCard from "../components/JobCard";
import OtherBanner from "../components/OtherBanner";

const NonTechJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  // Computed filter options
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);

  const department = "Nontech";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/department/${department}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);

        // Extract filter options
        extractFilterOptions(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [department]);

  // Extract unique categories, locations, and skills with counts
  const extractFilterOptions = (jobsData) => {
    const categoryMap = {};
    const locationMap = {};
    const skillMap = {};

    jobsData.forEach(job => {
      if (job.category) {
        categoryMap[job.category] = (categoryMap[job.category] || 0) + 1;
      }

      if (job.location) {
        locationMap[job.location] = (locationMap[job.location] || 0) + 1;
      }

      if (job.preferredSkills && Array.isArray(job.preferredSkills)) {
        job.preferredSkills.forEach(skill => {
          skillMap[skill] = (skillMap[skill] || 0) + 1;
        });
      }
    });

    setCategories(
      Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
    );
    setLocations(
      Object.entries(locationMap).map(([name, count]) => ({ name, count }))
    );
    setSkills(
      Object.entries(skillMap).map(([name, count]) => ({ name, count }))
    );
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...jobs];

    // Keyword search
    if (searchKeyword) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.shortDescription?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Location search
    if (locationSearch) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job =>
        selectedCategories.includes(job.category)
      );
    }

    // Locations
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(job =>
        selectedLocations.includes(job.location)
      );
    }

    // Skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job =>
        job.preferredSkills?.some(skill => selectedSkills.includes(skill))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, selectedCategories, selectedLocations, selectedSkills, searchKeyword, locationSearch]);

  const handleToggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleLocation = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleToggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedSkills([]);
    setSearchKeyword("");
    setLocationSearch("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <OtherBanner title="Non-Tech Jobs" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <SearchFilterSidebar
            categories={categories}
            locations={locations}
            skills={skills}
            selectedCategories={selectedCategories}
            selectedLocations={selectedLocations}
            selectedSkills={selectedSkills}
            searchKeyword={searchKeyword}
            locationSearch={locationSearch}
            onToggleCategory={handleToggleCategory}
            onToggleLocation={handleToggleLocation}
            onToggleSkill={handleToggleSkill}
            onSearchKeywordChange={setSearchKeyword}
            onLocationSearchChange={setLocationSearch}
            onClearAll={handleClearAll}
          />

          {/* Jobs Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
              </h2>
              {(selectedCategories.length > 0 || selectedLocations.length > 0 || selectedSkills.length > 0) && (
                <div className="text-sm text-gray-600">
                  Active filters: {selectedCategories.length + selectedLocations.length + selectedSkills.length}
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading non-tech jobs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">Error: {error}</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg mb-2">No jobs found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id || job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonTechJobsPage;