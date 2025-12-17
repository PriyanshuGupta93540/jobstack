'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check
} from 'lucide-react';

export default function BlogDetailScreen({ blog, relatedBlogs }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blogs/${blog.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/blogs/${blog.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Improved */}
      <div className="relative h-[450px] bg-gradient-to-r from-gray-900 to-gray-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">     
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-full text-sm font-medium mb-4">
              {blog.category}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-2xl">
              {blog.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-green-600 flex items-center justify-center">
                  <User size={20} />
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left">
                  {blog.content}
                </p>
              </div>

              {/* Sections */}
              {blog.sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    <span className="border-b-4 border-gradient-to-r from-orange-500 to-green-600 pb-2">
                      {section.subheading}
                    </span>
                  </h2>
                  
                  {section.image && (
                    <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={section.image}
                        alt={section.subheading}
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="prose prose-lg max-w-none">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Engagement Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                      liked
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={20} fill={liked ? 'white' : 'none'} />
                    <span>{likes} Likes</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShareOpen(!shareOpen)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Share2 size={20} />
                      <span>Share Article</span>
                    </button>
                    
                    {shareOpen && (
                      <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl p-4 z-10 min-w-[200px] border border-gray-100">
                        <div className="flex flex-col gap-2">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Facebook size={18} className="text-blue-600" />
                            <span className="text-gray-700">Facebook</span>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Twitter size={18} className="text-blue-400" />
                            <span className="text-gray-700">Twitter</span>
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Linkedin size={18} className="text-blue-700" />
                            <span className="text-gray-700">LinkedIn</span>
                          </a>
                          <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {copied ? (
                              <Check size={18} className="text-green-600" />
                            ) : (
                              <LinkIcon size={18} className="text-gray-600" />
                            )}
                            <span className="text-gray-700">
                              {copied ? 'Copied!' : 'Copy Link'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">About Author</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-semibold mb-2">{blog.author}</p>
                <p className="text-sm text-gray-500">
                  Expert in renewable energy and sustainable agriculture
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-orange-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-bold mb-4 text-lg">Article Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <Eye size={18} />
                      <span className="text-sm">Views</span>
                    </div>
                    <span className="font-bold text-lg">{blog.views}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <div className="flex items-center gap-2">
                      <Heart size={18} />
                      <span className="text-sm">Likes</span>
                    </div>
                    <span className="font-bold text-lg">{likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span className="text-sm">Read Time</span>
                    </div>
                    <span className="font-bold text-lg">{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-orange-500">Related</span>{' '}
              <span className="text-green-600">Articles</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <Link
                  key={relatedBlog.id}
                  href={`/blogs/${relatedBlog.slug}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedBlog.thumbnail}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-orange-600 font-medium">
                      {relatedBlog.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{relatedBlog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    
    </div>
  );
}