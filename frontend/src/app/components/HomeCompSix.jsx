"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';

const HomeCompSix = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  // API Base URL - Update this to match your backend
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type)) {
        setError('Please upload a PDF or DOC/DOCX file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setShowModal(true);
    }
  };

  // Handle CV upload - UPDATED TO MATCH YOUR BACKEND API
  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      // Changed from 'cv' to 'resume' to match backend
      formData.append('resume', selectedFile);

      // Updated endpoint to match your backend route
      const response = await fetch(`${API_URL}/api/resumes/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      console.log('Upload success:', data);
      setUploadSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        setSelectedFile(null);
        setUploadSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message || 'Failed to upload CV. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setError(null);
    setUploadSuccess(false);
  };

  return (
    <div className='bg-white w-full mb-12'>
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 overflow-hidden p-8 mx-16 rounded-3xl">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-700 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-700 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-teal-600 rounded-full opacity-10"></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-32 left-1/3 w-20 h-1 bg-lime-400 opacity-40 transform -rotate-45"></div>
        <div className="absolute top-40 left-1/3 w-12 h-1 bg-lime-400 opacity-40 transform -rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-1 bg-lime-400 opacity-40 transform rotate-45"></div>

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div className="relative z-10 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative elements around image */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-lime-400 rounded-full opacity-30"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-lime-400 rounded-full opacity-20"></div>
                
                {/* Main Image */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
                    alt="Happy professional"
                    className="rounded-2xl shadow-xl w-full max-w-sm object-cover h-96"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="relative z-10 text-white">
              <h2 className="text-3xl md:text-[46px] font-bold mb-4 leading-tight">
                Get your{' '}
                <span className="text-lime-400">Matched Jobs</span>{' '}
                in a few minutes.
              </h2>
              
              <p className="text-teal-100 text-base md:text-lg mb-6 leading-relaxed">
                Find your dream job & earn from world leading brands. Upload your CV now.
              </p>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Button */}
              <button 
                onClick={handleButtonClick}
                className="bg-lime-400 hover:bg-lime-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-base flex items-center gap-2 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                <Upload className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                <span>Upload your CV</span>
              </button>

              {/* Stats or Additional Info */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-lime-400">50K+</div>
                  <div className="text-xs text-teal-200 mt-1">Active Jobs</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-lime-400">30K+</div>
                  <div className="text-xs text-teal-200 mt-1">Companies</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-lime-400">2M+</div>
                  <div className="text-xs text-teal-200 mt-1">Happy Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success State */}
              {uploadSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    CV Uploaded Successfully!
                  </h3>
                  <p className="text-gray-600">
                    We'll review your CV and match you with relevant jobs soon.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Upload Your CV
                  </h3>

                  {/* File Info */}
                  {selectedFile && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center gap-3">
                      <FileText className="w-8 h-8 text-teal-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Info */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-6">
                    <p className="text-xs text-blue-700">
                      ℹ️ Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading || !selectedFile}
                      className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCompSix;