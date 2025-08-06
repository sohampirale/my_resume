"use client";

import React from 'react';
import { Plus, X, Briefcase, Building, Calendar, MapPin } from 'lucide-react';

interface Experience {
  position: string;
  company: string;
  duration: string;
  description?: string;
}

interface ExperienceStepProps {
  experience: Experience[];
  onExperienceChange: (experience: Experience[]) => void;
  errors?: { [key: string]: string };
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ experience, onExperienceChange, errors }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      position: '',
      company: '',
      duration: '',
      description: ''
    };
    onExperienceChange([...experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    onExperienceChange(updatedExperience);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onExperienceChange(updatedExperience);
  };

  const durationExamples = [
    "Jan 2023 - Present",
    "2022 - 2024",
    "Jun 2021 - Dec 2022",
    "2020 - Present",
    "Mar 2019 - Aug 2021"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4">
          <Briefcase className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Work Experience</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Showcase your professional journey! Add your work experience to demonstrate your career growth, 
          skills development, and the value you've brought to different organizations.
        </p>
      </div>

      {/* Duration Examples */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-400" />
          Duration Format Examples
        </h3>
        <div className="flex flex-wrap gap-2">
          {durationExamples.map((example, index) => (
            <div key={index} className="px-3 py-2 bg-gray-700/50 rounded-lg text-sm text-gray-300 border border-gray-600/30">
              {example}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Use formats like "Month Year - Month Year" or just "Year - Year". Use "Present" for current positions.
        </p>
      </div>

      {/* Experience Form */}
      <div className="space-y-6">
        {experience.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Experience</h3>
            {experience.map((exp, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              >
                {/* Experience Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-300">Experience #{index + 1}</span>
                    {exp.duration.toLowerCase().includes('present') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Current
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeExperience(index)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Remove experience"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Position and Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Position/Role <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          placeholder="e.g., Full Stack Developer, UI/UX Designer"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                        />
                      </div>
                      {errors?.[`experience.${index}.position`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`experience.${index}.position`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Company <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          placeholder="e.g., Google, Microsoft, Startup Inc."
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                        />
                      </div>
                      {errors?.[`experience.${index}.company`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`experience.${index}.company`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Duration <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                        placeholder="e.g., Jan 2023 - Present, 2022 - 2024"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                      />
                    </div>
                    {errors?.[`experience.${index}.duration`] && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors[`experience.${index}.duration`]}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Job Description
                      <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                    </label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        Include key achievements, technologies used, and impact made
                      </p>
                      {exp.description && (
                        <p className="text-xs text-gray-500">
                          {exp.description.length} characters
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Experience Preview */}
                  {(exp.position && exp.company) && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-white">{exp.position}</h4>
                            <p className="text-green-400 flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {exp.company}
                            </p>
                          </div>
                          {exp.duration && (
                            <div className="text-right">
                              <p className="text-sm text-gray-300 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {exp.duration}
                              </p>
                            </div>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Experience Button */}
        <button
          onClick={addExperience}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Work Experience
        </button>

        {/* Help Text */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <Briefcase className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-green-300">Tips for Great Experience Entries</h4>
              <ul className="text-sm text-green-200/80 space-y-1">
                <li>• Use specific job titles that clearly describe your role</li>
                <li>• Include company names that add credibility to your profile</li>
                <li>• Be consistent with date formats across all entries</li>
                <li>• Focus on achievements and impact, not just daily tasks</li>
                <li>• Mention specific technologies, tools, or methodologies used</li>
                <li>• Quantify your accomplishments when possible (increased sales by 25%)</li>
                <li>• Start with your most recent position and work backwards</li>
                <li>• Use "Present" for current positions to show you're actively employed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {experience.length === 0 
              ? "Add your work experience to show your professional journey and expertise."
              : `You have ${experience.length} experience entr${experience.length === 1 ? 'y' : 'ies'} added. List them in reverse chronological order (most recent first).`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;