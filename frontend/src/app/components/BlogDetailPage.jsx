"use client"

import React, { useState, useEffect } from 'react';
import {
  Heart, Share2, Clock, Calendar, User, MessageCircle,
  Eye, ChevronUp, Bookmark, ArrowRight
} from 'lucide-react';
import { blogPosts, getCategoryColor, formatDate } from "../data/blogData";
import RelatedPosts from './RelatedPosts';

const BlogDetailPage = ({ slug }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Find the blog post from blogData based on slug
  const post = blogPosts.find(p =>
    p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") === slug
  );

  // If post not found, show 404
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blogs" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Back to Blogs
          </a>
        </div>
      </div>
    );
  }

  // Static blog data structure (keeping your original design)
  const blogData = {
    title: post.title,
    author: "KEC Agritech",
    authorBio: "Leading sustainable energy solutions across India",
    date: formatDate(post.date),
    readTime: post.readTime,
    views: post.views.toLocaleString(),
    likes: post.likes,
    comments: 18,
    category: post.category,
    tags: ["CBG", "Renewable Energy", "Farm Waste", "Green Economy", "Sustainable Farming"],
    featuredImage: post.image,

    content: `Every year, India generates millions of tonnes of agricultural residue, including paddy straw, wheat stalks, and sugarcane trash. While some of it is used for cattle feed or composting, a significant portion is burnt by farmers, leading to massive air pollution, soil degradation, and greenhouse gas emissions. But what if this 'waste' could be transformed into clean energy and valuable resources?`,

    sections: [
      {
        heading: "CBG Technology: Turning Waste into Wealth",
        content:
          "Compressed Biogas (CBG) technology is emerging as a breakthrough solution by converting agricultural waste into multiple revenue streams. Through anaerobic digestion, farm residue is broken down by microorganisms to produce biogas, which is then purified and compressed into CBG—a renewable fuel that can replace conventional natural gas and transportation fuels.",
        points: [
          "Compressed Biogas (CBG): A clean, renewable fuel",
          "Organic Fertilizer: A nutrient-rich byproduct",
          "Carbon Credits: Additional income opportunities"
        ],
        image: "images/blog4.jpg"
      },
      {
        heading: "Why CBG Over Traditional Energy Sources?",
        content:
          "Unlike coal, petrol, or diesel that are depleting finite natural resources, CBG is produced from renewable biomass. It burns cleaner, emits significantly less CO2, and helps reduce India's dependence on costly LNG imports. For industries, transport fleets, and households, CBG offers a cost-effective and sustainable alternative.",
        image: "images/blog9.jpg"
      },
      {
        heading: "Empowering Farmers & Rural Economies",
        content:
          "Farmers stand at the heart of the CBG revolution. Instead of burning crop residue, they can now sell it to biogas plants, creating a new income stream. This not only improves farm economics but also contributes to cleaner air and healthier communities.",
        highlight:
          "Rural economies benefit through job creation, logistics, and self-help groups.",
        image: "images/blog11.jpg"
      },
      {
        heading: "The CBG Parks Model",
        content:
          "At KEC Agritech, we are driving the idea of 'CBG Parks'—cluster-based projects where multiple biogas plants work in synergy with local farms and industries. These parks ensure efficient feedstock collection, processing, and distribution while creating circular economies in rural India."
      },
      {
        heading: "Environmental Benefits of CBG",
        content:
          "Every ton of biomass diverted to CBG plants prevents methane emissions from open burning or decomposition. This directly contributes to climate change mitigation. Additionally, the nutrient-rich digestate left after biogas production serves as organic manure, reducing the need for chemical fertilizers."
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedPosts = [
    {
      title: "Algae Bio-fuel: The Ocean's Green Gold",
      image: "images/blog4.jpg",
      readTime: "6 min read",
      excerpt: "Exploring the potential of algae as a sustainable biofuel source"
    },
    {
      title: "Agricultural Biomass Solutions",
      image: "images/blog9.jpg",
      readTime: "10 min read",
      excerpt: "Converting farm waste into valuable energy resources"
    },
    {
      title: "Bio-diesel Production at Scale",
      image: "images/blog11.jpg",
      readTime: "7 min read",
      excerpt: "Commercial opportunities in bio-diesel manufacturing"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* HERO SECTION */}
      <div className="relative mt-28 bg-gradient-to-br from-green-50 via-green-100 to-green-400 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[82%] mx-auto">

            <div>
              <span className="inline-block px-4 py-1 bg-green-600 rounded-full text-sm font-medium text-white">
                {blogData.category}
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 mt-4">
                {blogData.title}
              </h2>

              <div className="flex flex-wrap items-center gap-6 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{blogData.author}</div>
                    <div className="text-sm opacity-80">{blogData.authorBio}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{blogData.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{blogData.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{blogData.views}</span>
                </div>

              </div>
            </div>

            <div className="block">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={blogData.featuredImage}
                  alt={blogData.title}
                  className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN ARTICLE */}
      <article className="max-w-5xl mx-auto px-6 py-12">

        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-gray-700 text-justify leading-relaxed first-letter:text-7xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-3 first-letter:float-left">
            {blogData.content}
          </p>
        </div>

        {blogData.sections.map((section, index) => (
          <div key={index} className="mb-20">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {section.heading}
            </h2>

            {/* {section.image && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )} */}

            <p className="text-[17.5px] text-gray-700 leading-relaxed mb-6">
              {section.content}
            </p>

            {section.points && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-6">
                <ul className="space-y-4">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.highlight && (
              <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-xl my-6">
                <p className="text-lg text-gray-800 italic">
                  {section.highlight}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-10 my-16">
          <p className="text-2xl font-medium text-center">
            "CBG is not just a renewable fuel; it is a complete ecosystem that transforms waste into wealth..."
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-8 border-t border-gray-200">
          {blogData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

      </article>

      {/* COMMENTS SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Join the Discussion ({blogData.comments})
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="What are your thoughts on CBG technology?"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows="4"
                />
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* RELATED POSTS */}
      <RelatedPosts
        currentPostId={post.id}
        blogPosts={blogPosts}
        formatDate={formatDate}
      />

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all flex items-center justify-center z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

    </div>
  );
};

export default BlogDetailPage;

