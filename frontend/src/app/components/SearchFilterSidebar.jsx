// SearchFilterSidebar.jsx (fixed – now shows all sections)
import { ChevronDown } from 'lucide-react';

const SearchFilterSidebar = ({
  categories,
  locations,
  skills,
  selectedCategories,
  selectedLocations,
  selectedSkills,
  searchKeyword,
  locationSearch,
  onToggleCategory,
  onToggleLocation,
  onToggleSkill,
  onSearchKeywordChange,
  onLocationSearchChange,
  onClearAll
}) => {
  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Search Filter</h2>
          <button 
            onClick={onClearAll}
            className="text-teal-600 text-sm font-medium hover:text-teal-700"
          >
            Clear All
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by keywords..."
            value={searchKeyword}
            onChange={(e) => onSearchKeywordChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Location Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Location, Zip..."
            value={locationSearch}
            onChange={(e) => onLocationSearchChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Job Categories */}
        <div className="mb-6">
          <button className="w-full flex justify-between items-center text-gray-900 font-semibold mb-3">
            <span>Job Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500">No categories available</p>
            ) : (
              categories.map((category) => (
                <label key={category.name} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => onToggleCategory(category.name)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-teal-600">
                    {category.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">({category.count})</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Job Locations */}
        <div className="mb-6">
          <button className="w-full flex justify-between items-center text-gray-900 font-semibold mb-3">
            <span>Job Locations</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {locations.length === 0 ? (
              <p className="text-sm text-gray-500">No locations available</p>
            ) : (
              locations.map((location) => (
                <label key={location.name} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.name)}
                    onChange={() => onToggleLocation(location.name)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-teal-600">
                    {location.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">({location.count})</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <button className="w-full flex justify-between items-center text-gray-900 font-semibold mb-3">
            <span>Skills</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {skills.length === 0 ? (
              <p className="text-sm text-gray-500">No skills available</p>
            ) : (
              skills.map((skill) => (
                <label key={skill.name} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill.name)}
                    onChange={() => onToggleSkill(skill.name)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-teal-600">
                    {skill.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">({skill.count})</span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterSidebar;