"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import JobCard from '../components/JobCard';
import SearchFilterSidebar from '../components/SearchFilterSidebar';

// Loading fallback component
function JobsLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    </div>
  );
}

// Main content component that uses useSearchParams
function AllJobsContent() {
  const searchParams = useSearchParams();
  
  // Get URL parameters
  const urlKeyword = searchParams.get('keyword') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlLocation = searchParams.get('location') || '';

  // State
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchKeyword, setSearchKeyword] = useState(urlKeyword);
  const [locationSearch, setLocationSearch] = useState(urlLocation);
  const [selectedCategories, setSelectedCategories] = useState(urlCategory ? [urlCategory] : []);
  const [selectedLocations, setSelectedLocations] = useState(urlLocation ? [urlLocation] : []);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Sidebar data
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data);
        
        // Extract unique values for filters
        extractFilterData(data);
        
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Extract categories, locations, and skills from jobs
  const extractFilterData = (jobsData) => {
    // Categories with count
    const categoryMap = {};
    jobsData.forEach(job => {
      if (job.category) {
        categoryMap[job.category] = (categoryMap[job.category] || 0) + 1;
      }
    });
    const categoriesArray = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
    setCategories(categoriesArray);

    // Locations with count
    const locationMap = {};
    jobsData.forEach(job => {
      if (job.location) {
        locationMap[job.location] = (locationMap[job.location] || 0) + 1;
      }
    });
    const locationsArray = Object.entries(locationMap).map(([name, count]) => ({ name, count }));
    setLocations(locationsArray);

    // Skills with count (from tags)
    const skillMap = {};
    jobsData.forEach(job => {
      if (job.tags && Array.isArray(job.tags)) {
        job.tags.forEach(tag => {
          skillMap[tag] = (skillMap[tag] || 0) + 1;
        });
      }
    });
    const skillsArray = Object.entries(skillMap).map(([name, count]) => ({ name, count }));
    setSkills(skillsArray);
  };

  // Apply filters whenever filter states or jobs change
  useEffect(() => {
    let result = [...jobs];

    // Filter by keyword (search in title, company, category, description)
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(keyword) ||
        job.company?.toLowerCase().includes(keyword) ||
        job.category?.toLowerCase().includes(keyword) ||
        job.shortDescription?.toLowerCase().includes(keyword) ||
        job.longDescription?.toLowerCase().includes(keyword)
      );
    }

    // Filter by location search
    if (locationSearch.trim()) {
      const locKeyword = locationSearch.toLowerCase();
      result = result.filter(job => 
        job.location?.toLowerCase().includes(locKeyword)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter(job => 
        selectedCategories.includes(job.category)
      );
    }

    // Filter by selected locations
    if (selectedLocations.length > 0) {
      result = result.filter(job => 
        selectedLocations.includes(job.location)
      );
    }

    // Filter by selected skills (tags)
    if (selectedSkills.length > 0) {
      result = result.filter(job => 
        job.tags && job.tags.some(tag => selectedSkills.includes(tag))
      );
    }

    setFilteredJobs(result);
  }, [jobs, searchKeyword, locationSearch, selectedCategories, selectedLocations, selectedSkills]);

  // Toggle functions
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLocation = (location) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearAllFilters = () => {
    setSearchKeyword('');
    setLocationSearch('');
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedSkills([]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading jobs</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-600 border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            {filteredJobs.length} Jobs Found
          </h1>
          <p className="text-gray-100">
            {searchKeyword && `Showing results for "${searchKeyword}"`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
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
            onToggleCategory={toggleCategory}
            onToggleLocation={toggleLocation}
            onToggleSkill={toggleSkill}
            onSearchKeywordChange={setSearchKeyword}
            onLocationSearchChange={setLocationSearch}
            onClearAll={clearAllFilters}
          />

          {/* Jobs Grid */}
          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No jobs found</p>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-teal-600 font-medium hover:text-teal-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function AllJobs() {
  return (
    <Suspense fallback={<JobsLoadingFallback />}>
      <AllJobsContent />
    </Suspense>
  );
}