"use client";

import { useState, useEffect } from 'react';
import { LogOut, Briefcase, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [showJsonUpload, setShowJsonUpload] = useState(false);
  const [jsonText, setJsonText] = useState('');

  // Login state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Create job state
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    logo: '',
    category: '',
    department: '',
    location: '',
    jobType: 'Full-time',
    experience: '',
    education: '',
    mode: 'Onsite',
    salary: '',
    openings: 1,
    deadline: '',
    shortDescription: '',
    longDescription: '',
    responsibilities: '',
    qualifications: '',
    preferredSkills: '',
    tags: '',
    applyLink: '',
    postedBy: '',
    isFeatured: false
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
  };

  // Handle JSON file upload
  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        setMessage({ type: 'error', text: 'Please select a JSON file' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          populateFormWithJson(jsonData);
        } catch (error) {
          setMessage({ type: 'error', text: 'Invalid JSON format: ' + error.message });
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle JSON text paste
  const handleJsonTextSubmit = () => {
    if (!jsonText.trim()) {
      setMessage({ type: 'error', text: 'Please paste JSON data' });
      return;
    }

    try {
      const jsonData = JSON.parse(jsonText);
      populateFormWithJson(jsonData);
      setJsonText('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Invalid JSON format: ' + error.message });
    }
  };

  // Populate form with JSON data
  const populateFormWithJson = (jsonData) => {
    // Validate required fields
    if (!jsonData.title || !jsonData.company || !jsonData.category || !jsonData.location) {
      setMessage({ type: 'error', text: 'JSON must contain title, company, category, and location' });
      return;
    }

    // Populate form with JSON data
    setJobForm({
      title: jsonData.title || '',
      company: jsonData.company || '',
      logo: jsonData.logo || '',
      category: jsonData.category || '',
      department: jsonData.department || '',
      location: jsonData.location || '',
      jobType: jsonData.jobType || 'Full-time',
      experience: jsonData.experience || '',
      education: jsonData.education || '',
      mode: jsonData.mode || 'Onsite',
      salary: jsonData.salary || '',
      openings: jsonData.openings || 1,
      deadline: jsonData.deadline ? jsonData.deadline.split('T')[0] : '',
      shortDescription: jsonData.shortDescription || '',
      longDescription: jsonData.longDescription || '',
      responsibilities: Array.isArray(jsonData.responsibilities) 
        ? jsonData.responsibilities.join('\n') 
        : '',
      qualifications: Array.isArray(jsonData.qualifications) 
        ? jsonData.qualifications.join('\n') 
        : '',
      preferredSkills: Array.isArray(jsonData.preferredSkills) 
        ? jsonData.preferredSkills.join('\n') 
        : '',
      tags: Array.isArray(jsonData.tags) 
        ? jsonData.tags.join(', ') 
        : '',
      applyLink: jsonData.applyLink || '',
      postedBy: jsonData.postedBy || admin?.name || 'Admin',
      isFeatured: jsonData.isFeatured || false
    });

    setMessage({ type: 'success', text: 'JSON data loaded successfully! You can now review and submit.' });
    setShowJsonUpload(false);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('adminToken', data.token);
      setCurrentPage('dashboard');
      setMessage({ type: 'success', text: 'Login successful!' });
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create job
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Add logo file if exists
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      // Add all other fields
      formData.append('title', jobForm.title);
      formData.append('company', jobForm.company);
      formData.append('category', jobForm.category);
      formData.append('department', jobForm.department);
      formData.append('location', jobForm.location);
      formData.append('jobType', jobForm.jobType);
      formData.append('experience', jobForm.experience);
      formData.append('education', jobForm.education);
      formData.append('mode', jobForm.mode);
      formData.append('salary', jobForm.salary);
      formData.append('openings', parseInt(jobForm.openings));
      formData.append('deadline', jobForm.deadline);
      formData.append('shortDescription', jobForm.shortDescription);
      formData.append('longDescription', jobForm.longDescription);
      formData.append('applyLink', jobForm.applyLink);
      formData.append('postedBy', admin?.name || 'Admin');
      formData.append('isFeatured', jobForm.isFeatured);

      // Handle arrays
      const responsibilities = jobForm.responsibilities.split('\n').filter(r => r.trim());
      const qualifications = jobForm.qualifications.split('\n').filter(q => q.trim());
      const preferredSkills = jobForm.preferredSkills.split('\n').filter(s => s.trim());
      const tags = jobForm.tags.split(',').map(t => t.trim()).filter(t => t);

      formData.append('responsibilities', JSON.stringify(responsibilities));
      formData.append('qualifications', JSON.stringify(qualifications));
      formData.append('preferredSkills', JSON.stringify(preferredSkills));
      formData.append('tags', JSON.stringify(tags));

      const response = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create job');
      }

      setMessage({ type: 'success', text: 'Job posted successfully!' });
      
      // Reset form
      setJobForm({
        title: '',
        company: '',
        logo: '',
        category: '',
        department: '',
        location: '',
        jobType: 'Full-time',
        experience: '',
        education: '',
        mode: 'Onsite',
        salary: '',
        openings: 1,
        deadline: '',
        shortDescription: '',
        longDescription: '',
        responsibilities: '',
        qualifications: '',
        preferredSkills: '',
        tags: '',
        applyLink: '',
        postedBy: '',
        isFeatured: false
      });
      setLogoFile(null);
      setLogoPreview('');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setAdmin(null);
    setCurrentPage('login');
    localStorage.removeItem('adminToken');
    setMessage({ type: 'success', text: 'Logged out successfully!' });
  };

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <Briefcase className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Login</h1>

          {message.text && (
            <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'error' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message.type === 'error' ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading || !loginForm.email || !loginForm.password}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Job Board Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{admin?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message.type === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Post a New Job</h2>
            <button
              onClick={() => setShowJsonUpload(!showJsonUpload)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Upload className="w-4 h-4" />
              {showJsonUpload ? 'Manual Entry' : 'Upload JSON'}
            </button>
          </div>

          {/* JSON Upload Section */}
          {showJsonUpload && (
            <div className="mb-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Upload Job Data (JSON)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Paste your JSON data directly or upload a .json file. The data will populate the form below for review.
              </p>

              {/* Tab Selector */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setJsonText('')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    jsonText === '' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📝 Paste JSON
                </button>
                <button
                  onClick={() => document.getElementById('json-file-input').click()}
                  className="flex-1 py-2 px-4 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 transition"
                >
                  📁 Upload File
                </button>
              </div>

              {/* JSON Text Area */}
              <div className="mb-4">
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="Paste your JSON data here..."
                  className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                />
                <button
                  onClick={handleJsonTextSubmit}
                  disabled={!jsonText.trim()}
                  className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Load JSON Data
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                id="json-file-input"
                type="file"
                accept=".json"
                onChange={handleJsonUpload}
                className="hidden"
              />

              {/* JSON Format Example */}
              <details className="mt-4">
                <summary className="text-sm font-medium text-blue-700 cursor-pointer hover:text-blue-800">
                  📋 View JSON format example
                </summary>
                <pre className="mt-2 p-3 bg-gray-800 text-green-400 rounded text-xs overflow-x-auto">
{`{
  "title": "Customer Support Specialist",
  "company": "PeopleFirst Solutions",
  "category": "Human Resources",
  "department": "Nontech",
  "location": "Gurugram, Haryana",
  "jobType": "Full-time",
  "experience": "4+ years",
  "education": "MBA in Human Resources",
  "mode": "Onsite",
  "salary": "₹8,00,000 - ₹12,00,000",
  "openings": 2,
  "deadline": "2025-02-15",
  "shortDescription": "Lead HR operations...",
  "longDescription": "We are seeking...",
  "responsibilities": [
    "Manage recruitment",
    "Implement HR policies"
  ],
  "qualifications": [
    "MBA in HR",
    "Strong knowledge of labor laws"
  ],
  "preferredSkills": [
    "HRMS tools",
    "Conflict resolution"
  ],
  "tags": ["HR", "Manager", "Full-time"],
  "applyLink": "https://example.com/apply",
  "postedBy": "HR Team",
  "isFeatured": false
}`}
                </pre>
              </details>
            </div>
          )}

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={jobForm.company}
                  onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                
                {/* Logo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">Company Logo</label>
                  
                  {!logoPreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload logo</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative inline-block">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-32 w-32 object-contain border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Category"
                  value={jobForm.category}
                  onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="Tech">Tech</option>
                  <option value="Nontech">Nontech</option>
                </select>
                <select
                  value={jobForm.jobType}
                  onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                <select
                  value={jobForm.mode}
                  onChange={(e) => setJobForm({ ...jobForm, mode: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Experience Required"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Education Required"
                  value={jobForm.education}
                  onChange={(e) => setJobForm({ ...jobForm, education: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Compensation & Openings */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Compensation & Openings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Salary (e.g., $50k-$70k)"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Number of Openings"
                  value={jobForm.openings}
                  onChange={(e) => setJobForm({ ...jobForm, openings: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  min="1"
                />
                <input
                  type="date"
                  value={jobForm.deadline}
                  onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Descriptions</h3>
              <textarea
                placeholder="Short Description"
                value={jobForm.shortDescription}
                onChange={(e) => setJobForm({ ...jobForm, shortDescription: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                rows="3"
              />
              <textarea
                placeholder="Long Description"
                value={jobForm.longDescription}
                onChange={(e) => setJobForm({ ...jobForm, longDescription: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
              />
            </div>

            {/* Lists */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Requirements & Skills</h3>
              <textarea
                placeholder="Responsibilities (one per line)"
                value={jobForm.responsibilities}
                onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                rows="4"
              />
              <textarea
                placeholder="Qualifications (one per line)"
                value={jobForm.qualifications}
                onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                rows="4"
              />
              <textarea
                placeholder="Preferred Skills (one per line)"
                value={jobForm.preferredSkills}
                onChange={(e) => setJobForm({ ...jobForm, preferredSkills: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
              />
            </div>

            {/* Additional Info */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="url"
                  placeholder="Apply Link"
                  value={jobForm.applyLink}
                  onChange={(e) => setJobForm({ ...jobForm, applyLink: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  value={jobForm.tags}
                  onChange={(e) => setJobForm({ ...jobForm, tags: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={jobForm.isFeatured}
                  onChange={(e) => setJobForm({ ...jobForm, isFeatured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Mark as Featured Job</span>
              </label>
            </div>

            <button
              onClick={handleCreateJob}
              disabled={isLoading || !jobForm.title || !jobForm.company || !jobForm.category || !jobForm.location || !jobForm.department}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Posting Job...' : 'Post Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}