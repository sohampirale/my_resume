"use client";

import { useState, useEffect } from "react";

export default function AboutStep({ formData, updateFormData }) {
  const [localData, setLocalData] = useState({
    about: formData.about || ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  // About section examples and tips
  const aboutExamples = [
    {
      role: "Frontend Developer",
      text: "I'm a passionate frontend developer with 3+ years of experience creating responsive web applications. I specialize in React, TypeScript, and modern CSS frameworks. I love turning complex problems into simple, beautiful designs that users enjoy interacting with."
    },
    {
      role: "UI/UX Designer",
      text: "I'm a creative UI/UX designer focused on crafting intuitive digital experiences. With a background in psychology and design, I bridge the gap between user needs and business goals. I believe great design is invisible - it just works."
    },
    {
      role: "Full Stack Developer",
      text: "I'm a versatile full-stack developer who enjoys building complete web solutions from database to deployment. I work with modern technologies like Node.js, React, and cloud platforms to create scalable applications that solve real-world problems."
    }
  ];

  const writingTips = [
    {
      icon: "🎯",
      title: "Be Specific",
      description: "Mention your key skills, years of experience, and what makes you unique"
    },
    {
      icon: "💡",
      title: "Show Personality", 
      description: "Let your personality shine through - this isn't a formal resume"
    },
    {
      icon: "🚀",
      title: "Focus on Value",
      description: "Explain what you bring to the table and what drives you professionally"
    },
    {
      icon: "📝",
      title: "Keep it Concise",
      description: "Aim for 3-4 sentences that capture the essence of who you are"
    }
  ];

  // Handle input changes
  const handleInputChange = (value) => {
    setLocalData({ about: value });
    updateFormData({ about: value });
    
    // Update counts
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharacterCount(value.length);
    
    // Clear error when user starts typing
    if (errors.about) {
      setErrors(prev => ({ ...prev, about: '' }));
    }
  };

  // Handle field blur for validation
  const handleBlur = () => {
    setTouched(prev => ({ ...prev, about: true }));
    validateField(localData.about);
  };

  // Validate about field
  const validateField = (value) => {
    let error = '';
    
    if (!value.trim()) {
      error = 'About section is required';
    } else if (value.trim().length < 50) {
      error = 'Please write at least 50 characters about yourself';
    } else if (value.length > 1000) {
      error = 'About section should be under 1000 characters';
    }
    
    setErrors(prev => ({ ...prev, about: error }));
    return !error;
  };

  // Use example text
  const useExample = (exampleText) => {
    handleInputChange(exampleText);
  };

  // Get writing quality indicator
  const getQualityIndicator = () => {
    const length = localData.about.trim().length;
    const sentences = localData.about.trim() ? localData.about.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    
    if (length < 50) return { color: 'text-red-400', label: 'Too Short', percentage: 20 };
    if (length < 100) return { color: 'text-yellow-400', label: 'Getting Started', percentage: 40 };
    if (length < 200) return { color: 'text-blue-400', label: 'Good Length', percentage: 70 };
    if (length < 400) return { color: 'text-green-400', label: 'Great Detail', percentage: 90 };
    if (length > 800) return { color: 'text-orange-400', label: 'Consider Shortening', percentage: 100 };
    return { color: 'text-green-400', label: 'Perfect Length', percentage: 85 };
  };

  const qualityIndicator = getQualityIndicator();

  useEffect(() => {
    // Initialize counts and validation
    if (localData.about) {
      const words = localData.about.trim() ? localData.about.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharacterCount(localData.about.length);
      validateField(localData.about);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">About You</h2>
        <p className="text-gray-400">Tell your professional story in 3-4 sentences</p>
      </div>

      {/* Main About Textarea */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          About Section <span className="text-red-400">*</span>
        </label>
        
        <div className="relative">
          <textarea
            value={localData.about}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="Hi, I'm a passionate [your role] with [years] years of experience in [your expertise]. I specialize in [key skills] and love [what drives you]. I'm always excited to [your goals/interests]..."
            rows={6}
            maxLength={1000}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
              errors.about && touched.about
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {characterCount}/1000
          </div>
        </div>

        {/* Error Message */}
        {errors.about && touched.about && (
          <p className="text-sm text-red-400">{errors.about}</p>
        )}

        {/* Stats Row */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <span className="text-gray-400">
              Words: <span className="text-white">{wordCount}</span>
            </span>
            <span className="text-gray-400">
              Characters: <span className="text-white">{characterCount}</span>
            </span>
          </div>
          <div className={`${qualityIndicator.color} font-medium`}>
            {qualityIndicator.label}
          </div>
        </div>

        {/* Quality Indicator Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              qualityIndicator.color.includes('red') ? 'bg-red-500' :
              qualityIndicator.color.includes('yellow') ? 'bg-yellow-500' :
              qualityIndicator.color.includes('blue') ? 'bg-blue-500' :
              qualityIndicator.color.includes('green') ? 'bg-green-500' :
              'bg-orange-500'
            }`}
            style={{ width: `${qualityIndicator.percentage}%` }}
          />
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
        <h4 className="text-white font-medium mb-3 flex items-center">
          <span className="mr-2">✍️</span>
          Writing Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {writingTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-lg">{tip.icon}</span>
              <div>
                <h5 className="text-gray-200 font-medium text-sm">{tip.title}</h5>
                <p className="text-gray-400 text-xs">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Templates */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center">
          <span className="mr-2">💡</span>
          Need Inspiration? Try These Examples
        </h4>
        
        <div className="grid gap-4">
          {aboutExamples.map((example, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-blue-400 font-medium text-sm">{example.role}</h5>
                <button
                  onClick={() => useExample(example.text)}
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors duration-200"
                >
                  Use This
                </button>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{example.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      {localData.about && localData.about.length > 20 && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-3 flex items-center">
            <span className="mr-2">👁️</span>
            Portfolio Preview
          </h4>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h5 className="text-white font-semibold mb-2">About</h5>
            <p className="text-gray-300 leading-relaxed break-words whitespace-pre-line">
              done!
            {localData.about}
          </p>

          </div>
        </div>
      )}

      {/* Requirements Notice */}
      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-400 mt-0.5">⚠️</div>
          <div>
            <h4 className="text-yellow-300 font-medium mb-1">Required Section</h4>
            <p className="text-yellow-200/80 text-sm">
              The about section is required and should be at least 50 characters long. 
              This is often the first thing visitors will read about you, so make it count!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}