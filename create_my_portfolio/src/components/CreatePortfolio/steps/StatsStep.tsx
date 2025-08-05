"use client";

import React from 'react';
import { Plus, X, TrendingUp, Award, Users, Calendar } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

interface StatsStepProps {
  stats: Stat[];
  onStatsChange: (stats: Stat[]) => void;
  errors?: { [key: string]: string };
}

const StatsStep: React.FC<StatsStepProps> = ({ stats, onStatsChange, errors }) => {
  const addStat = () => {
    const newStat: Stat = {
      value: '',
      label: ''
    };
    onStatsChange([...stats, newStat]);
  };

  const removeStat = (index: number) => {
    const updatedStats = stats.filter((_, i) => i !== index);
    onStatsChange(updatedStats);
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updatedStats = stats.map((stat, i) => 
      i === index ? { ...stat, [field]: value } : stat
    );
    onStatsChange(updatedStats);
  };

  const statExamples = [
    { icon: TrendingUp, value: "50+", label: "Projects Completed" },
    { icon: Award, value: "3+", label: "Years Experience" },
    { icon: Users, value: "100+", label: "Happy Clients" },
    { icon: Calendar, value: "24/7", label: "Available Support" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
          <TrendingUp className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Portfolio Statistics</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Add impressive statistics that showcase your achievements and experience. 
          These help visitors quickly understand your expertise and impact.
        </p>
      </div>

      {/* Examples Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Example Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statExamples.map((example, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <example.icon className="w-5 h-5 text-blue-400" />
              <div>
                <span className="text-2xl font-bold text-white">{example.value}</span>
                <p className="text-sm text-gray-400">{example.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Form */}
      <div className="space-y-6">
        {stats.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Your Statistics</h3>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-300">Statistic #{index + 1}</span>
                  </div>
                  <button
                    onClick={() => removeStat(index)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Remove statistic"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Value Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Value <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="e.g., 50+, 3 Years, 100%"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                    {errors?.[`stats.${index}.value`] && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors[`stats.${index}.value`]}
                      </p>
                    )}
                  </div>

                  {/* Label Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Label <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="e.g., Projects Completed, Years Experience"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                    {errors?.[`stats.${index}.label`] && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors[`stats.${index}.label`]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview */}
                {stat.value && stat.label && (
                  <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <p className="text-xs text-gray-400 mb-1">Preview:</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-lg font-bold text-white">{stat.value}</span>
                      <span className="text-sm text-gray-300">{stat.label}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add New Stat Button */}
        <button
          onClick={addStat}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add New Statistic
        </button>

        {/* Help Text */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-300">Tips for Great Statistics</h4>
              <ul className="text-sm text-blue-200/80 space-y-1">
                <li>• Use specific numbers when possible (50+ Projects vs Many Projects)</li>
                <li>• Include time-based metrics (3+ Years Experience)</li>
                <li>• Highlight client satisfaction (100% Client Satisfaction)</li>
                <li>• Show availability or response time (24/7 Support)</li>
                <li>• Keep values concise but impactful</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optional Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Statistics are optional but highly recommended to showcase your achievements.
            {stats.length === 0 && " You can skip this step if you prefer."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsStep;