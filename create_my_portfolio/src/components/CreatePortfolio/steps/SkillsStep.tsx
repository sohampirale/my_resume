"use client";

import { useState, useEffect } from "react";
import { Plus, X, Target, Zap, Code, Palette } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsStepProps {
  formData: {
    skills: Skill[];
    [key: string]: any;
  };
  updateFormData: (data: any) => void;
}

export default function SkillsStep({ formData, updateFormData }: SkillsStepProps) {
  const [localSkills, setLocalSkills] = useState<Skill[]>(formData.skills || []);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Skill suggestions by category
  const skillSuggestions = {
    "Frontend": [
      "React", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", 
      "Tailwind CSS", "Bootstrap", "Sass", "Next.js", "Nuxt.js", "Svelte"
    ],
    "Backend": [
      "Node.js", "Express.js", "Python", "Django", "Flask", "Java", "Spring Boot",
      "C#", ".NET", "PHP", "Laravel", "Ruby", "Ruby on Rails", "Go", "Rust"
    ],
    "Database": [
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "DynamoDB", 
      "Firebase", "Supabase", "GraphQL", "Prisma", "Sequelize"
    ],
    "DevOps": [
      "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "CI/CD", 
      "Jenkins", "GitHub Actions", "Terraform", "Nginx", "Apache"
    ],
    "Mobile": [
      "React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin", 
      "React Native", "Expo"
    ],
    "Design": [
      "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign",
      "UI/UX Design", "Wireframing", "Prototyping"
    ]
  };

  // Handle skill changes
  const handleSkillChange = (index: number, field: 'name' | 'level', value: string | number) => {
    const updatedSkills = [...localSkills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setLocalSkills(updatedSkills);
    updateFormData({ skills: updatedSkills });
    
    // Clear errors for this skill
    if (errors[`skill_${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`skill_${index}_${field}`];
      setErrors(newErrors);
    }
  };

  // Add new skill
  const addSkill = () => {
    if (newSkill.name.trim()) {
      const updatedSkills = [...localSkills, { name: newSkill.name.trim(), level: newSkill.level }];
      setLocalSkills(updatedSkills);
      updateFormData({ skills: updatedSkills });
      setNewSkill({ name: '', level: 50 });
    }
  };

  // Remove skill
  const removeSkill = (index: number) => {
    const updatedSkills = localSkills.filter((_, i) => i !== index);
    setLocalSkills(updatedSkills);
    updateFormData({ skills: updatedSkills });
  };

  // Add skill from suggestion
  const addSuggestion = (skillName: string) => {
    if (!localSkills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const updatedSkills = [...localSkills, { name: skillName, level: 75 }];
      setLocalSkills(updatedSkills);
      updateFormData({ skills: updatedSkills });
    }
  };

  // Get skill level color and label
  const getSkillLevelInfo = (level: number) => {
    if (level >= 90) return { color: 'from-emerald-500 to-green-400', label: 'Expert', textColor: 'text-emerald-400' };
    if (level >= 75) return { color: 'from-blue-500 to-cyan-400', label: 'Advanced', textColor: 'text-blue-400' };
    if (level >= 50) return { color: 'from-purple-500 to-pink-400', label: 'Intermediate', textColor: 'text-purple-400' };
    if (level >= 25) return { color: 'from-yellow-500 to-orange-400', label: 'Beginner', textColor: 'text-yellow-400' };
    return { color: 'from-red-500 to-red-400', label: 'Learning', textColor: 'text-red-400' };
  };

  // Sync with parent data
  useEffect(() => {
    if (formData.skills && formData.skills !== localSkills) {
      setLocalSkills(formData.skills);
    }
  }, [formData.skills]);

  return (
    <div className="space-y-8">
      {/* Header - removed since it's handled by parent */}
      
      {/* Add New Skill Section */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-white font-semibold mb-4 flex items-center text-lg">
          <Plus className="w-5 h-5 mr-2 text-cyan-400" />
          Add Your Skills
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="e.g., React, Python, UI/UX Design..."
                className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Level ({newSkill.level}%)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={addSkill}
            disabled={!newSkill.name.trim()}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Skills List */}
      {localSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg flex items-center">
            <Target className="w-5 h-5 mr-2 text-cyan-400" />
            Your Skills & Technologies ({localSkills.length})
          </h3>
          
          <div className="space-y-4">
            {localSkills.map((skill, index) => {
              const levelInfo = getSkillLevelInfo(skill.level);
              return (
                <div key={index} className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* Skill Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    {/* Remove Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeSkill(index)}
                        className="flex items-center justify-center w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Remove skill"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Skill Level Slider */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-300">
                        Skill Level
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${levelInfo.textColor}`}>
                          {levelInfo.label}
                        </span>
                        <span className="text-cyan-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider mb-3"
                    />
                    
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-500 relative overflow-hidden`}
                        style={{ width: `${skill.level}%` }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skill Suggestions */}
      <div className="space-y-6">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Zap className="w-5 h-5 mr-2 text-cyan-400" />
          Popular Skills by Category
        </h3>
        
        <div className="grid gap-6">
          {Object.entries(skillSuggestions).map(([category, skills]) => (
            <div key={category} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg mr-3">
                  {category === 'Frontend' && <Code className="w-4 h-4 text-cyan-400" />}
                  {category === 'Backend' && <Target className="w-4 h-4 text-cyan-400" />}
                  {category === 'Database' && <div className="w-4 h-4 bg-cyan-400 rounded-sm" />}
                  {category === 'DevOps' && <Zap className="w-4 h-4 text-cyan-400" />}
                  {category === 'Mobile' && <div className="w-4 h-4 bg-cyan-400 rounded" />}
                  {category === 'Design' && <Palette className="w-4 h-4 text-cyan-400" />}
                </div>
                <h4 className="text-white font-semibold">{category}</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skillName) => {
                  const isAdded = localSkills.some(skill => 
                    skill.name.toLowerCase() === skillName.toLowerCase()
                  );
                  
                  return (
                    <button
                      key={"randomskill"+Math.random()}
                      onClick={() => addSuggestion(skillName)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                        isAdded
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                          : 'bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 transform hover:scale-105'
                      }`}
                    >
                      {isAdded ? '✓ Added' : `+ ${skillName}`}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      {localSkills.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20 border border-cyan-700/30 rounded-xl p-6">
          <h4 className="text-cyan-300 font-semibold mb-4 flex items-center text-lg">
            <span className="mr-2">👁️</span>
            Portfolio Preview
          </h4>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6">
            <div className="text-center mb-6">
              <h5 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                Skills & Technologies
              </h5>
            </div>
            
            <div className="space-y-4">
              {localSkills.slice(0, 6).map((skill, index) => {
                const levelInfo = getSkillLevelInfo(skill.level);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-full bg-gradient-to-r ${levelInfo.color} rounded-full transition-all duration-500`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              {localSkills.length > 6 && (
                <p className="text-gray-400 text-sm text-center mt-4">
                  ...and {localSkills.length - 6} more skills
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <div className="text-blue-400 mt-0.5 text-xl">💡</div>
          <div>
            <h4 className="text-blue-300 font-semibold mb-2">Tips for Adding Skills</h4>
            <ul className="text-blue-200/80 text-sm space-y-1 leading-relaxed">
              <li>• Be honest about your skill levels - it helps set proper expectations</li>
              <li>• Include both technical skills and soft skills if relevant</li>
              <li>• 50-75% is intermediate, 75-90% is advanced, 90%+ is expert level</li>
              <li>• You can always edit or remove skills later</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
}