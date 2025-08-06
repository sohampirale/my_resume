"use client";

import React from 'react';
import { 
  Eye, 
  Edit, 
  User, 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  FileText, 
  Target, 
  BarChart3, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Phone, 
  ExternalLink, 
  Star,
  Calendar,
  Award,
  Code,
  Building
} from 'lucide-react';

interface FormData {
  name: string;
  slug: string;
  tagLine?: string;
  description?: string;
  location: string;
  social: {
    github: string;
    linkedIn: string;
    mail: string;
  };
  about: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  projects: Array<{
    title: string;
    description?: string;
    image?: string;
    tech: string[];
    category: string;
    github?: string;
    demo?: string;
    featured?: boolean;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    description?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    cgpa?: string;
  }>;
  contact: {
    email: string;
    location: string;
    social: {
      github: string;
      linkedIn: string;
      mail: string;
    };
  };
}

interface FormPreviewProps {
  formData: FormData;
  onEdit: (stepNumber: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const FormPreview: React.FC<FormPreviewProps> = ({ 
  formData, 
  onEdit, 
  onSubmit, 
  isSubmitting 
}) => {
  const previewSections = [
    { step: 1, title: "Basic Info", icon: User, color: "blue" },
    { step: 2, title: "Social Links", icon: ExternalLink, color: "purple" },
    { step: 3, title: "About", icon: FileText, color: "green" },
    { step: 4, title: "Skills", icon: Target, color: "orange" },
    { step: 5, title: "Stats", icon: BarChart3, color: "pink" },
    { step: 6, title: "Projects", icon: FolderOpen, color: "cyan" },
    { step: 7, title: "Experience", icon: Briefcase, color: "yellow" },
    { step: 8, title: "Education", icon: GraduationCap, color: "indigo" },
    { step: 9, title: "Contact", icon: Phone, color: "emerald" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 bg-blue-500/20 border-blue-500/30",
      purple: "text-purple-400 bg-purple-500/20 border-purple-500/30",
      green: "text-green-400 bg-green-500/20 border-green-500/30",
      orange: "text-orange-400 bg-orange-500/20 border-orange-500/30",
      pink: "text-pink-400 bg-pink-500/20 border-pink-500/30",
      cyan: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
      yellow: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      indigo: "text-indigo-400 bg-indigo-500/20 border-indigo-500/30",
      emerald: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const hasContent = (section: string) => {
    switch (section) {
      case "basic":
        return formData.name || formData.slug || formData.tagLine || formData.description || formData.location;
      case "social":
        return formData.social.github || formData.social.linkedIn || formData.social.mail;
      case "about":
        return formData.about;
      case "skills":
        return formData.skills && formData.skills.length > 0;
      case "stats":
        return formData.stats && formData.stats.length > 0;
      case "projects":
        return formData.projects && formData.projects.length > 0;
      case "experience":
        return formData.experience && formData.experience.length > 0;
      case "education":
        return formData.education && formData.education.length > 0;
      case "contact":
        return formData.contact.email || formData.contact.location;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4">
          <Eye className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Preview Your Portfolio</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Review all your information before creating your portfolio. 
          You can edit any section by clicking the edit button.
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Portfolio Overview
          </h3>
          <button
            onClick={() => onEdit(1)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Name</p>
              <p className="text-lg font-semibold text-white">{formData.name || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Portfolio URL</p>
              <p className="text-blue-400 font-mono text-sm">yoursite.com/{formData.slug || "not-set"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Location</p>
              <p className="text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {formData.location || "Not specified"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {formData.tagLine && (
              <div>
                <p className="text-sm text-gray-400 mb-1">Tagline</p>
                <p className="text-white italic">"{formData.tagLine}"</p>
              </div>
            )}
            {formData.description && (
              <div>
                <p className="text-sm text-gray-400 mb-1">Description</p>
                <p className="text-gray-300 text-sm line-clamp-3">{formData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Links */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-400" />
              Social Links
            </h3>
            <button
              onClick={() => onEdit(2)}
              className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {hasContent("social") ? (
            <div className="space-y-3">
              {formData.social.github && (
                <div className="flex items-center gap-3 text-sm">
                  <Github className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 break-all">{formData.social.github}</span>
                </div>
              )}
              {formData.social.linkedIn && (
                <div className="flex items-center gap-3 text-sm">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 break-all">{formData.social.linkedIn}</span>
                </div>
              )}
              {formData.social.mail && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{formData.social.mail}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No social links added</p>
          )}
        </div>

        {/* About */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              About
            </h3>
            <button
              onClick={() => onEdit(3)}
              className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {formData.about ? (
            <p className="text-gray-300 text-sm leading-relaxed">{formData.about}</p>
          ) : (
            <p className="text-gray-500 text-sm">No about section added</p>
          )}
        </div>

        {/* Skills */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Skills ({formData.skills?.length || 0})
            </h3>
            <button
              onClick={() => onEdit(4)}
              className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs hover:bg-orange-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {hasContent("skills") ? (
            <div className="space-y-3">
              {formData.skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-8">{skill.level}%</span>
                  </div>
                </div>
              ))}
              {formData.skills.length > 4 && (
                <p className="text-xs text-gray-500">+{formData.skills.length - 4} more skills</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills added</p>
          )}
        </div>

        {/* Stats */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-400" />
              Stats ({formData.stats?.length || 0})
            </h3>
            <button
              onClick={() => onEdit(5)}
              className="flex items-center gap-1 px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs hover:bg-pink-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {hasContent("stats") ? (
            <div className="grid grid-cols-2 gap-3">
              {formData.stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <div className="text-lg font-bold text-pink-400">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No stats added</p>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-cyan-400" />
            Projects ({formData.projects?.length || 0})
          </h3>
          <button
            onClick={() => onEdit(6)}
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        {hasContent("projects") ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.projects.slice(0, 4).map((project, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    {project.title}
                  </h4>
                  <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                {project.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs text-gray-500">+{project.tech.length - 3} more</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <Github className="w-4 h-4 text-gray-400" />
                  )}
                  {project.demo && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
            {formData.projects.length > 4 && (
              <div className="col-span-full text-center py-4">
                <p className="text-gray-500 text-sm">+{formData.projects.length - 4} more projects</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No projects added</p>
        )}
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-yellow-400" />
              Experience ({formData.experience?.length || 0})
            </h3>
            <button
              onClick={() => onEdit(7)}
              className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs hover:bg-yellow-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {hasContent("experience") ? (
            <div className="space-y-4">
              {formData.experience.slice(0, 3).map((exp, index) => (
                <div key={index} className="border-l-2 border-yellow-400/30 pl-4">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-yellow-400" />
                    {exp.position}
                  </h4>
                  <p className="text-yellow-400 text-sm">{exp.company}</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </p>
                  {exp.description && (
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">{exp.description}</p>
                  )}
                </div>
              ))}
              {formData.experience.length > 3 && (
                <p className="text-xs text-gray-500">+{formData.experience.length - 3} more experiences</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No experience added</p>
          )}
        </div>

        {/* Education */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              Education ({formData.education?.length || 0})
            </h3>
            <button
              onClick={() => onEdit(8)}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs hover:bg-indigo-500/30 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
          </div>
          {hasContent("education") ? (
            <div className="space-y-4">
              {formData.education.slice(0, 3).map((edu, index) => (
                <div key={index} className="border-l-2 border-indigo-400/30 pl-4">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    {edu.degree}
                  </h4>
                  <p className="text-indigo-400 text-sm">{edu.school}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {edu.year}
                    </p>
                    {edu.cgpa && (
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {edu.cgpa}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {formData.education.length > 3 && (
                <p className="text-xs text-gray-500">+{formData.education.length - 3} more education entries</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No education added</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-400" />
            Contact Information
          </h3>
          <button
            onClick={() => onEdit(9)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all duration-200 text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.contact.email && (
            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-white text-sm font-medium">{formData.contact.email}</p>
              </div>
            </div>
          )}
          {formData.contact.location && (
            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-white text-sm font-medium">{formData.contact.location}</p>
              </div>
            </div>
          )}
          {formData.contact.social.github && (
            <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
              <Github className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">GitHub</p>
                <p className="text-white text-sm font-medium break-all">{formData.contact.social.github}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{formData.skills?.length || 0}</div>
            <div className="text-xs text-gray-400">Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{formData.projects?.length || 0}</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{formData.experience?.length || 0}</div>
            <div className="text-xs text-gray-400">Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400">{formData.education?.length || 0}</div>
            <div className="text-xs text-gray-400">Education</div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Your Portfolio...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Create Portfolio
            </div>
          )}
        </button>
        <p className="text-gray-400 text-sm mt-4">
          Your portfolio will be created and ready to share with the world!
        </p>
      </div>
    </div>
  );
};

export default FormPreview;