"use client"

import React from 'react';
import Link from 'next/link';
import { ChevronDown, LogIn, UserPlus, Facebook, Linkedin, Twitter, Dribbble, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">J</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900">JobStock</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12 font-semibold text-[18px]">
            <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-gray-900">
              <Link href="/">Home</Link>
              {/* <ChevronDown className="w-4 h-4" /> */}
            </div>

            <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-gray-900">
              <Link
                href="/tech?department=tech"
                className={`hover:text-teal-600 transition-colors ${pathname === '/tech' ? 'text-teal-600 font-semibold' : ''
                  }`}
              >
                Tech
              </Link>
              {/* <ChevronDown className="w-4 h-4" /> */}
            </div>

            <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-gray-900">
              <Link
                href="/non-tech?department=non-tech"
                className={`hover:text-teal-600 transition-colors ${pathname === '/non-tech' ? 'text-teal-600 font-semibold' : ''
                  }`}
              >
                Non-Tech
              </Link>
              {/* <ChevronDown className="w-4 h-4" /> */}
            </div>

            {/* <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-gray-900">
              <span>Pages</span>
              <ChevronDown className="w-4 h-4" />
            </div> */}

            <Link href="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>
             {/* <Link href="/admin" className="text-gray-700 hover:text-gray-900">
              Admin Panel
            </Link> */}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, Linkedin, Globe, Twitter, Dribbble].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-teal-700/50 backdrop-blur-sm hover:bg-teal-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 border border-teal-600/30"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;