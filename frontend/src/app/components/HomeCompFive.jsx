import React from 'react';
import Link from 'next/link';
import { Calendar, MessageSquare, ArrowRight, TrendingUp, Users, Laptop, Eye, Heart, Clock } from 'lucide-react';
import { blogData } from '@/app/data/blogData';

const HomeCompFive = () => {
  // Get the first 3 featured blogs, or the first 3 blogs if no featured ones
  const featuredBlogs = blogData.filter(blog => blog.featured).slice(0, 3);
  const displayBlogs = featuredBlogs.length >= 3 ? featuredBlogs : blogData.slice(0, 3);

  // Icon mapping for categories
  const categoryIcons = {
    'Dhanteras Special': <TrendingUp className="w-6 h-6" />,
    'Industry': <Users className="w-6 h-6" />,
    'Innovation': <Laptop className="w-6 h-6" />,
    'Career Advice': <TrendingUp className="w-6 h-6" />,
    'Business Growth': <Users className="w-6 h-6" />,
    'Work Life': <Laptop className="w-6 h-6" />
  };

  // Gradient mapping for categories
  const categoryGradients = {
    'Dhanteras Special': 'from-orange-500 to-green-600',
    'Industry': 'from-teal-500 to-emerald-600',
    'Innovation': 'from-green-500 to-teal-600',
    'Career Advice': 'from-emerald-500 to-cyan-600',
    'Business Growth': 'from-teal-500 to-emerald-600',
    'Work Life': 'from-emerald-500 to-cyan-600'
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
              Blog & Insights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest From  <span className="text-transparent bg-clip-text bg-teal-600">Our Blog</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Discover insights on renewable energy, sustainable agriculture, and India's clean energy revolution
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={blog.thumbnail || blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${categoryGradients[blog.category] || 'from-orange-500 to-green-600'} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className= "bg-teal-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                    {categoryIcons[blog.category] || <TrendingUp className="w-6 h-6" />}
                    {blog.category}
                  </span>
                </div>

                {/* Featured Badge (if applicable) */}
                {blog.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-green-600" />
                    <span>{blog.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-green-600 transition-all duration-300">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Bottom Section with Stats and Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="bg-teal-600 flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold hover:gap-3 transition-all duration-300 hover:shadow-lg group/btn"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-teal-600 hover:from-orange-600 hover:to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCompFive;