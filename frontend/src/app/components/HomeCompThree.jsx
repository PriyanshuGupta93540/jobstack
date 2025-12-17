"use client";

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const HomeCompThree = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      designation: "Software Engineer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Job Stock made my job search incredibly easy. I found my dream job within two weeks of signing up. The platform is user-friendly and the job recommendations were spot on!"
    },
    {
      name: "Michael Chen",
      designation: "Product Manager",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      comment: "The best job portal I've ever used. The remote job listings are extensive and the application process is streamlined. Highly recommend to anyone looking for their next opportunity!"
    },
    {
      name: "Emily Rodriguez",
      designation: "UX Designer",
      company: "Airbnb",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 4,
      comment: "Great platform with excellent customer support. The job alerts feature helped me stay updated with relevant opportunities. Found an amazing remote position through Job Stock!"
    },
    {
      name: "David Thompson",
      designation: "Marketing Director",
      company: "Shopify",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Job Stock stands out from other job portals. The quality of job listings is high and the search filters are very detailed. Landed my current role thanks to this platform!"
    },
    {
      name: "Jessica Lee",
      designation: "Data Analyst",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Exceptional experience! The platform's interface is intuitive and the job matching algorithm is impressive. I received multiple interview calls within days of applying."
    },
    {
      name: "Robert Martinez",
      designation: "Full Stack Developer",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 4,
      comment: "Very satisfied with Job Stock. The variety of tech jobs available is outstanding. The quick apply feature saved me so much time during my job search."
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, reviews.length - 3) : prev - 3));
  };

  const currentReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-teal-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className='text-teal-600'>Users Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied professionals who found their dream jobs through Job Stock
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white hover:bg-teal-600 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white hover:bg-teal-600 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex + 3 >= reviews.length}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
            {currentReviews.map((review, index) => (
              <div
                key={currentIndex + index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 relative group border border-gray-100 hover:border-teal-200 hover:-translate-y-2"
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 text-teal-50 group-hover:text-teal-100 transition-colors">
                  <Quote className="w-16 h-16" fill="currentColor" />
                </div>

                {/* Star Rating at Top */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {renderStars(review.rating)}
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-base">
                  "{review.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-teal-50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.designation}
                    </p>
                    <p className="text-xs text-teal-600 font-medium mt-0.5">
                      {review.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'w-8 bg-teal-600'
                    : 'w-2 bg-gray-300 hover:bg-teal-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCompThree;