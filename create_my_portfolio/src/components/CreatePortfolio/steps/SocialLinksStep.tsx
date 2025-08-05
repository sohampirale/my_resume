"use client";

import { useState, useEffect } from "react";

export default function SocialLinksStep({ formData, updateFormData }) {
  const [localData, setLocalData] = useState({
    github: formData.social?.github || "",
    linkedIn: formData.social?.linkedIn || "",
    mail: formData.social?.mail || ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Social platform configurations
  const socialPlatforms = [
    {
      key: 'github',
      name: 'GitHub',
      icon: '🐙',
      placeholder: 'https://github.com/yourusername',
      baseUrl: 'github.com/',
      color: 'text-gray-300',
      bgColor: 'bg-gray-700',
      description: 'Showcase your code repositories and contributions'
    },
    {
      key: 'linkedIn',
      name: 'LinkedIn',
      icon: '💼',
      placeholder: 'https://linkedin.com/in/yourprofile',
      baseUrl: 'linkedin.com/in/',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      description: 'Professional networking and career highlights'
    },
    {
      key: 'mail',
      name: 'Email',
      icon: '📧',
      placeholder: 'your.email@example.com',
      baseUrl: 'mailto:',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      description: 'Primary contact email address'
    }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Update parent component with social object
    updateFormData({ 
      social: newData 
    });
    
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

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return true; // Empty is valid (optional)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    if (!email) return true; // Empty is valid (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate individual field
  const validateField = (field, value) => {
    let error = '';
    
    if (value) { // Only validate if value exists (all fields are optional)
      switch (field) {
        case 'github':
          if (!isValidUrl(value)) {
            error = 'Please enter a valid URL';
          } else if (!value.includes('github.com')) {
            error = 'Please enter a valid GitHub URL';
          }
          break;
        case 'linkedIn':
          if (!isValidUrl(value)) {
            error = 'Please enter a valid URL';
          } else if (!value.includes('linkedin.com')) {
            error = 'Please enter a valid LinkedIn URL';
          }
          break;
        case 'mail':
          if (!isValidEmail(value)) {
            error = 'Please enter a valid email address';
          }
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  // Extract username from URL for display
  const extractUsername = (url, platform) => {
    if (!url) return '';
    try {
      if (platform === 'mail') return url;
      if (platform === 'github') {
        const match = url.match(/github\.com\/([^\/\?]+)/);
        return match ? match[1] : '';
      }
      if (platform === 'linkedIn') {
        const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/);
        return match ? match[1] : '';
      }
    } catch {
      return '';
    }
    return '';
  };

  // Auto-format URL
  const formatUrl = (value, platform) => {
    if (!value) return value;
    
    if (platform === 'mail') return value;
    
    // If user enters just username, auto-format to full URL
    if (!value.startsWith('http') && !value.includes('.')) {
      if (platform === 'github') {
        return `https://github.com/${value}`;
      }
      if (platform === 'linkedIn') {
        return `https://linkedin.com/in/${value}`;
      }
    }
    
    // Add https if missing
    if (value.includes('.') && !value.startsWith('http')) {
      return `https://${value}`;
    }
    
    return value;
  };

  // Handle paste/blur formatting
  const handleFormat = (field, value) => {
    const formatted = formatUrl(value, field);
    handleInputChange(field, formatted);
  };

  // Count filled links
  const filledLinksCount = Object.values(localData).filter(value => value.trim()).length;

  useEffect(() => {
    // Validate existing data on mount
    Object.keys(localData).forEach(field => {
      if (localData[field]) {
        validateField(field, localData[field]);
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Social Links</h2>
        <p className="text-gray-400">Connect your professional profiles</p>
      </div>

      <div className="space-y-6">
        {socialPlatforms.map((platform) => (
          <div key={platform.key} className="space-y-3">
            {/* Platform Header */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${platform.bgColor} flex items-center justify-center`}>
                <span className="text-xl">{platform.icon}</span>
              </div>
              <div>
                <h3 className={`font-medium ${platform.color}`}>{platform.name}</h3>
                <p className="text-gray-400 text-sm">{platform.description}</p>
              </div>
            </div>

            {/* Input Field */}
            <div className="ml-13">
              <input
                type={platform.key === 'mail' ? 'email' : 'url'}
                value={localData[platform.key]}
                onChange={(e) => handleInputChange(platform.key, e.target.value)}
                onBlur={(e) => {
                  handleBlur(platform.key);
                  handleFormat(platform.key, e.target.value);
                }}
                placeholder={platform.placeholder}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors[platform.key] && touched[platform.key]
                    ? 'border-red-500 focus:ring-red-500'
                    : `border-gray-600 focus:ring-blue-500 focus:border-transparent`
                }`}
              />
              
              {/* Error Message */}
              {errors[platform.key] && touched[platform.key] && (
                <p className="mt-1 text-sm text-red-400">{errors[platform.key]}</p>
              )}
              
              {/* Username Preview */}
              {localData[platform.key] && !errors[platform.key] && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Preview:</span>
                  <span className={`text-sm ${platform.color}`}>
                    {platform.baseUrl}{extractUsername(localData[platform.key], platform.key)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <h4 className="text-white font-medium mb-3">Quick Tips</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">💡</span>
            <span>You can enter just your username, we'll format the full URL automatically</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✨</span>
            <span>All social links are optional - add what's relevant to your profession</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-400">🔗</span>
            <span>These links will appear on your portfolio for visitors to connect with you</span>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-blue-300 font-medium">Social Links Added</h4>
            <p className="text-blue-200/80 text-sm">
              {filledLinksCount === 0 
                ? 'No social links added yet' 
                : `${filledLinksCount} of ${socialPlatforms.length} platforms connected`
              }
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{filledLinksCount}</div>
            <div className="text-xs text-blue-300">Links</div>
          </div>
        </div>
        
        {/* Visual Progress */}
        <div className="mt-3">
          <div className="flex space-x-1">
            {socialPlatforms.map((platform, index) => (
              <div
                key={platform.key}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  localData[platform.key] 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Card */}
      {filledLinksCount > 0 && (
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
          <h4 className="text-white font-medium mb-3">Portfolio Preview</h4>
          <div className="flex flex-wrap gap-3">
            {socialPlatforms.map((platform) => (
              localData[platform.key] && !errors[platform.key] && (
                <div
                  key={platform.key}
                  className={`flex items-center space-x-2 px-3 py-2 ${platform.bgColor} rounded-lg border border-gray-600`}
                >
                  <span>{platform.icon}</span>
                  <span className={`text-sm ${platform.color}`}>
                    {platform.name}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}