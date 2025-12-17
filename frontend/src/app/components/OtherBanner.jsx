import React from 'react';

const OtherBanner = ({ title = "Grid Style Jobs 01"} ) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64">
          <div className="grid grid-cols-8 gap-1">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-20 w-48 h-48">
          <div className="grid grid-cols-6 gap-1">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default OtherBanner;