"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Search, Briefcase, MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeBanner = () => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const categoryRef = useRef(null);
  const locationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch categories and locations from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
        );

        const jobs = await response.json();

        const uniqueCategories = [...new Set(jobs.map(job => job.category))].filter(Boolean);
        setCategories(uniqueCategories);

        const uniqueLocations = [...new Set(jobs.map(job => job.location))].filter(Boolean);
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchKeyword.trim()) {
      params.append('keyword', searchKeyword.trim());
    }
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }
    if (selectedLocation) {
      params.append('location', selectedLocation);
    }

    router.push(`/alljobs?${params.toString()}`);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Tech & Non-Tech
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Jobs That Fit Your Career
          </h1>
          <p className="text-white text-lg md:text-xl">
            Getting a new job is never easy. Check what new jobs we have in store for you on Job Stock.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl p-4 relative">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Keywords Input */}
            <div className="flex items-center flex-1 w-full md:w-auto border-r-0 md:border-r border-gray-200 pr-4">
              <Search className="w-5 h-5 text-teal-600 mr-3" />
              <input
                type="text"
                placeholder="Skills, Designations, Keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Job Category Custom Dropdown */}
            <div className="flex items-center flex-1 w-full md:w-auto border-r-0 md:border-r border-gray-200 pr-4 relative z-[100]" ref={categoryRef}>
              <Briefcase className="w-5 h-5 text-teal-600 mr-3" />
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full outline-none text-gray-700 px-2 cursor-pointer bg-transparent flex items-center justify-between text-left"
              >
                <span className={selectedCategory ? 'text-gray-700' : 'text-gray-400'}>
                  {selectedCategory || 'Job Category'}
                </span>
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCategoryDropdown && (
                <div
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[9999]"
                  style={{
                    top: `${categoryRef.current?.getBoundingClientRect().bottom + 8}px`,
                    left: `${categoryRef.current?.getBoundingClientRect().left}px`,
                    width: `${categoryRef.current?.getBoundingClientRect().width}px`
                  }}
                >
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-teal-600 hover:text-white cursor-pointer transition-colors"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City Custom Dropdown */}
            <div className="flex items-center flex-1 w-full md:w-auto pr-4 relative z-[100]" ref={locationRef}>
              <MapPin className="w-5 h-5 text-teal-600 mr-3" />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="w-full outline-none text-gray-700 px-2 cursor-pointer bg-transparent flex items-center justify-between text-left"
              >
                <span className={selectedLocation ? 'text-gray-700' : 'text-gray-400'}>
                  {selectedLocation || 'Select City'}
                </span>
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showLocationDropdown && (
                <div
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[9999]"
                  style={{
                    top: `${locationRef.current?.getBoundingClientRect().bottom + 8}px`,
                    left: `${locationRef.current?.getBoundingClientRect().left}px`,
                    width: `${locationRef.current?.getBoundingClientRect().width}px`
                  }}
                >
                  {locations.map((location) => (
                    <div
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-teal-600 hover:text-white cursor-pointer transition-colors"
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-teal-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              <span className="font-medium">Filter</span>
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </div>

          {/* Active Filters Display */}
          {(searchKeyword || selectedCategory || selectedLocation) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchKeyword && (
                <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  Keyword: {searchKeyword}
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  Location: {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation('')}
                    className="hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchKeyword('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="text-teal-600 text-sm font-medium hover:text-teal-700 px-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal (Mobile/Advanced Filters) */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  placeholder="Enter keywords..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSearchKeyword('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setShowFilterModal(false);
                  handleSearch();
                }}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBanner;