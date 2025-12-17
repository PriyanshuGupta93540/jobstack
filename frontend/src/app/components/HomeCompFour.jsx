'use client'

import React from 'react';

const HomeCompFour = () => {
  const companies = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      bgColor: "bg-white"
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      bgColor: "bg-white"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      bgColor: "bg-gray-50"
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      bgColor: "bg-white"
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      bgColor: "bg-white"
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      bgColor: "bg-white"
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      bgColor: "bg-white"
    },
    {
      name: "Oracle",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      bgColor: "bg-white"
    },
  ];

  return (
    <div className="py-16 px-4 bg-teal-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-wide">
            TRUSTED BY LEADING COMPANIES
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-50 to-transparent z-10"></div>
          
          {/* Scrolling Animation */}
          <div className="flex animate-scroll">
            {/* First Set */}
            {companies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4"
              >
                <div className={`${company.bgColor} w-40 h-32 rounded-xl shadow-md flex items-center justify-center p-6 hover:shadow-xl transition-shadow duration-10 border border-gray-100`}>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate Set for Seamless Loop */}
            {companies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4"
              >
                <div className={`${company.bgColor} w-40 h-32 rounded-xl shadow-md flex items-center justify-center p-6 hover:shadow-xl transition-shadow duration-10 border border-gray-100`}>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 10s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HomeCompFour;