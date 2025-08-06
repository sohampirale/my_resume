"use client";

import React from 'react';
import { Plus, X, GraduationCap, School, Calendar, Award } from 'lucide-react';

interface Education {
  degree: string;
  school: string;
  year: string;
  cgpa?: string;
}

interface EducationStepProps {
  education: Education[];
  onEducationChange: (education: Education[]) => void;
  errors?: { [key: string]: string };
}

const EducationStep: React.FC<EducationStepProps> = ({ education, onEducationChange, errors }) => {
  const addEducation = () => {
    const newEducation: Education = {
      degree: '',
      school: '',
      year: '',
      cgpa: ''
    };
    onEducationChange([...education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    onEducationChange(updatedEducation);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onEducationChange(updatedEducation);
  };

  const degreeExamples = [
    "Bachelor's in Computer Science",
    "Master's in Data Science",
    "B.Tech in Information Technology",
    "MBA in Business Administration",
    "Associate Degree in Web Development",
    "Certificate in Digital Marketing",
    "Ph.D. in Machine Learning",
    "Diploma in Graphic Design"
  ];

  const yearExamples = [
    "2024",
    "2020 - 2024",
    "2022",
    "Expected 2025",
    "2018 - 2022"
  ];

  const cgpaExamples = [
    "8.5/10",
    "3.8/4.0",
    "85%",
    "First Class",
    "Magna Cum Laude"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-2xl mb-4">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Education Background</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Showcase your educational journey! Add your degrees, certifications, and academic achievements 
          to demonstrate your knowledge foundation and continuous learning commitment.
        </p>
      </div>

      {/* Format Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Degree Examples
          </h3>
          <div className="space-y-2">
            {degreeExamples.slice(0, 4).map((example, index) => (
              <div key={index} className="text-xs text-gray-300 p-2 bg-gray-700/30 rounded">
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Year Examples
          </h3>
          <div className="space-y-2">
            {yearExamples.map((example, index) => (
              <div key={index} className="text-xs text-gray-300 p-2 bg-gray-700/30 rounded">
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <h3 className="text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            CGPA/Grade Examples
          </h3>
          <div className="space-y-2">
            {cgpaExamples.map((example, index) => (
              <div key={index} className="text-xs text-gray-300 p-2 bg-gray-700/30 rounded">
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Form */}
      <div className="space-y-6">
        {education.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Education</h3>
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              >
                {/* Education Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-300">Education #{index + 1}</span>
                    {edu.cgpa && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                        <Award className="w-3 h-3" />
                        {edu.cgpa}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeEducation(index)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Remove education"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Degree and School Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Degree/Qualification <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          placeholder="e.g., Bachelor's in Computer Science"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                      </div>
                      {errors?.[`education.${index}.degree`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`education.${index}.degree`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        School/University <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                          placeholder="e.g., Stanford University, MIT"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                      </div>
                      {errors?.[`education.${index}.school`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`education.${index}.school`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Year and CGPA Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Year/Duration <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducation(index, 'year', e.target.value)}
                          placeholder="e.g., 2024, 2020-2024, Expected 2025"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                      </div>
                      {errors?.[`education.${index}.year`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`education.${index}.year`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        CGPA/Grade
                        <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={edu.cgpa || ''}
                          onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                          placeholder="e.g., 8.5/10, 3.8/4.0, 85%"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Education Preview */}
                  {(edu.degree && edu.school) && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-white flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-indigo-400" />
                              {edu.degree}
                            </h4>
                            <p className="text-indigo-400 flex items-center gap-1 mt-1">
                              <School className="w-4 h-4" />
                              {edu.school}
                            </p>
                          </div>
                          <div className="text-right">
                            {edu.year && (
                              <p className="text-sm text-gray-300 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {edu.year}
                              </p>
                            )}
                            {edu.cgpa && (
                              <p className="text-sm text-indigo-300 flex items-center gap-1 mt-1">
                                <Award className="w-4 h-4" />
                                {edu.cgpa}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Education Button */}
        <button
          onClick={addEducation}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>

        {/* Help Text */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <GraduationCap className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-indigo-300">Tips for Education Entries</h4>
              <ul className="text-sm text-indigo-200/80 space-y-1">
                <li>• Include formal degrees, certifications, and relevant courses</li>
                <li>• Use full degree names (Bachelor's, Master's, Ph.D., etc.)</li>
                <li>• Add well-known institution names for credibility</li>
                <li>• Use consistent year formats (2024 or 2020-2024)</li>
                <li>• Include CGPA/GPA only if it's impressive (above 3.5/4.0 or 7.5/10)</li>
                <li>• Add "Expected" for ongoing studies</li>
                <li>• List most recent education first</li>
                <li>• Include relevant bootcamps, online certifications, and professional courses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {education.length === 0 
              ? "Add your educational background to showcase your academic foundation and qualifications."
              : `You have ${education.length} education entr${education.length === 1 ? 'y' : 'ies'} added. List them in reverse chronological order (most recent first).`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationStep;