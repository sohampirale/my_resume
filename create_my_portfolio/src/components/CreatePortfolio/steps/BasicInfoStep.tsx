"use client";

import { useState, useEffect } from "react";

export default function BasicInfoStep({ formData, updateFormData }) {
  const [localData, setLocalData] = useState({
    name: formData.name || "",
    slug: formData.slug || "",
    tagLine: formData.tagLine || "",
    description: formData.description || "",
    location: formData.location || ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    
    // Auto-generate slug when name changes
    if (field === 'name' && value) {
      const generatedSlug = generateSlug(value);
      newData.slug = generatedSlug;
    }
    
    setLocalData(newData);
    updateFormData(newData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, localData[field]);
  };

  // Validate individual field
  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'slug':
        if (!value.trim()) {
          error = 'Slug is required';
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          error = 'Slug can only contain lowercase letters, numbers, and hyphens';
        } else if (value.length < 3) {
          error = 'Slug must be at least 3 characters';
        }
        break;
      case 'location':
        if (!value.trim()) {
          error = 'Location is required';
        }
        break;
      case 'tagLine':
        if (value && value.length > 100) {
          error = 'Tagline should be under 100 characters';
        }
        break;
      case 'description':
        if (value && value.length > 500) {
          error = 'Description should be under 500 characters';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  // Validate all fields
  const validateAll = () => {
    const fields = ['name', 'slug', 'location'];
    let allValid = true;
    
    fields.forEach(field => {
      const isValid = validateField(field, localData[field]);
      if (!isValid) allValid = false;
    });
    
    return allValid;
  };

  useEffect(() => {
    // Validate on mount if data exists
    if (localData.name || localData.slug || localData.location) {
      validateAll();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={localData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="e.g., John Doe"
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.name && touched.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Location Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={localData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            onBlur={() => handleBlur('location')}
            placeholder="e.g., New York, USA"
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.location && touched.location
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.location && touched.location && (
            <p className="mt-1 text-sm text-red-400">{errors.location}</p>
          )}
        </div>

        {/* Slug Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Portfolio URL Slug <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">yoursite.com/</span>
            </div>
            <input
              type="text"
              value={localData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value.toLowerCase())}
              onBlur={() => handleBlur('slug')}
              placeholder="john-doe"
              className={`w-full pl-32 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.slug && touched.slug
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
              }`}
            />
          </div>
          {errors.slug && touched.slug && (
            <p className="mt-1 text-sm text-red-400">{errors.slug}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            This will be your unique portfolio URL. Auto-generated from your name.
          </p>
        </div>

        {/* Tagline Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Professional Tagline
            <span className="text-gray-400 text-xs ml-2">(Optional)</span>
          </label>
          <input
            type="text"
            value={localData.tagLine}
            onChange={(e) => handleInputChange('tagLine', e.target.value)}
            onBlur={() => handleBlur('tagLine')}
            placeholder="e.g., UI/UX Designer & Frontend Developer"
            maxLength={100}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.tagLine
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.tagLine && (
              <p className="text-sm text-red-400">{errors.tagLine}</p>
            )}
            <p className="text-xs text-gray-400 ml-auto">
              {localData.tagLine.length}/100
            </p>
          </div>
        </div>

        {/* Description Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Brief Description
            <span className="text-gray-400 text-xs ml-2">(Optional)</span>
          </label>
          <textarea
            value={localData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            placeholder="A brief description about yourself and what you do..."
            maxLength={500}
            rows={4}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
              errors.description
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description}</p>
            )}
            <p className="text-xs text-gray-400 ml-auto">
              {localData.description.length}/500
            </p>
          </div>
        </div>
      </div>

      {/* Form Summary */}
      {(localData.name || localData.tagLine) && (
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
          <h4 className="text-white font-medium mb-2">Preview:</h4>
          <div className="space-y-1">
            {localData.name && (
              <p className="text-lg font-semibold text-white">{localData.name}</p>
            )}
            {localData.tagLine && (
              <p className="text-blue-400">{localData.tagLine}</p>
            )}
            {localData.location && (
              <p className="text-gray-400 text-sm">📍 {localData.location}</p>
            )}
            {localData.slug && (
              <p className="text-gray-400 text-sm">🔗 yoursite.com/{localData.slug}</p>
            )}
          </div>
        </div>
      )}

      {/* Required Fields Notice */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-400 mt-0.5">ℹ️</div>
          <div>
            <h4 className="text-blue-300 font-medium mb-1">Required Fields</h4>
            <p className="text-blue-200/80 text-sm">
              Name, Location, and URL Slug are required to proceed to the next step.
              The slug will be auto-generated from your name, but you can customize it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}