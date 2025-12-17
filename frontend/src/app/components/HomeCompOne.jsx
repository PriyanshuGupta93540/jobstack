"use client";

import React from "react";
import Link from "next/link";
import { FileText, Car, Briefcase, GraduationCap, Heart, Utensils, Plane, Smartphone } from "lucide-react";

const HomeCompOne = () => {
  const categories = [
    // Tech Categories (first 4)
    {
      icon: <FileText className="w-12 h-12 text-teal-600" />,
      title: "Software Development",
      jobs: "122 Active Jobs",
      link: "/tech?department=tech&category=Software Development",
    },
    {
      icon: <Car className="w-12 h-12 text-teal-600" />,
      title: "Cloud & DevOps",
      jobs: "248 Active Jobs",
      link: "/tech?department=tech&category=Cloud & DevOps",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-teal-600" />,
      title: "AI & Machine Learning",
      jobs: "212 Active Jobs",
      link: "/tech?department=tech&category=AI & Machine Learning",
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-teal-600" />,
      title: "Data Science",
      jobs: "180 Active Jobs",
      link: "/tech?department=tech&category=Data Science",
    },

    // Non-Tech Categories (last 4)
    {
      icon: <Heart className="w-12 h-12 text-teal-600" />,
      title: "Sales & Business Development",
      jobs: "90 Active Jobs",
      link: "/non-tech?department=non-tech&category=Sales & Business Development",
    },
    {
      icon: <Utensils className="w-12 h-12 text-teal-600" />,
      title: "Marketing",
      jobs: "55 Active Jobs",
      link: "/non-tech?department=non-tech&category=Marketing",
    },
    {
      icon: <Plane className="w-12 h-12 text-teal-600" />,
      title: "HR & Recruitment",
      jobs: "160 Active Jobs",
      link: "/non-tech?department=non-tech&category=HR & Recruitment",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-teal-600" />,
      title: "Finance & Accounts",
      jobs: "80 Active Jobs",
      link: "/non-tech?department=non-tech&category=Finance & Accounts",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[42px] font-bold text-gray-900 mb-2">
            Explore Best <span className="text-teal-600">Categories</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities across various industries and domains
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {category.jobs}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCompOne;