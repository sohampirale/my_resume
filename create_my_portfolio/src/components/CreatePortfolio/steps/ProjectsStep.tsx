"use client";

import React, { useState } from 'react';
import { Plus, X, Star, Github, ExternalLink, Image, Code, Folder, Tag } from 'lucide-react';

interface Project {
  title: string;
  description?: string;
  image?: string;
  tech: string[];
  category: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

interface ProjectsStepProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
  errors?: { [key: string]: string };
}

const ProjectsStep: React.FC<ProjectsStepProps> = ({ projects, onProjectsChange, errors }) => {
  const [newTechInputs, setNewTechInputs] = useState<{ [key: number]: string }>({});

  const categories = [
    'Web Development',
    'Mobile App',
    'Desktop Application',
    'API/Backend',
    'Machine Learning',
    'Data Science',
    'DevOps',
    'UI/UX Design',
    'Game Development',
    'Blockchain',
    'IoT',
    'Other'
  ];

  const addProject = () => {
    const newProject: Project = {
      title: '',
      description: '',
      image: '',
      tech: [],
      category: '',
      github: '',
      demo: '',
      featured: false
    };
    onProjectsChange([...projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onProjectsChange(updatedProjects);
    // Clean up tech input state
    const newInputs = { ...newTechInputs };
    delete newInputs[index];
    setNewTechInputs(newInputs);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    onProjectsChange(updatedProjects);
  };

  const addTech = (projectIndex: number) => {
    const techValue = newTechInputs[projectIndex]?.trim();
    if (techValue && !projects[projectIndex].tech.includes(techValue)) {
      const updatedTech = [...projects[projectIndex].tech, techValue];
      updateProject(projectIndex, 'tech', updatedTech);
      
      // Clear input
      setNewTechInputs(prev => ({ ...prev, [projectIndex]: '' }));
    }
  };

  const removeTech = (projectIndex: number, techIndex: number) => {
    const updatedTech = projects[projectIndex].tech.filter((_, i) => i !== techIndex);
    updateProject(projectIndex, 'tech', updatedTech);
  };

  const handleTechKeyPress = (e: React.KeyboardEvent, projectIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech(projectIndex);
    }
  };

  const updateTechInput = (projectIndex: number, value: string) => {
    setNewTechInputs(prev => ({ ...prev, [projectIndex]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
          <Folder className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Your Projects</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Showcase your best work! Add projects that demonstrate your skills and experience. 
          Include details, technologies used, and links to live demos or repositories.
        </p>
      </div>

      {/* Projects Form */}
      <div className="space-y-6">
        {projects.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Projects</h3>
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-300">Project #{index + 1}</span>
                    {project.featured && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeProject(index)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Remove project"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Title and Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Project Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        placeholder="e.g., E-commerce Website, Mobile App"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      />
                      {errors?.[`projects.${index}.title`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`projects.${index}.title`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={project.category}
                        onChange={(e) => updateProject(index, 'category', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors?.[`projects.${index}.category`] && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors[`projects.${index}.category`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={project.description || ''}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Describe your project, its features, and what problems it solves..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                      Technologies Used <span className="text-red-400">*</span>
                    </label>
                    
                    {/* Current Tech Tags */}
                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                          >
                            <Code className="w-3 h-3" />
                            {tech}
                            <button
                              onClick={() => removeTech(index, techIndex)}
                              className="hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Tech Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTechInputs[index] || ''}
                        onChange={(e) => updateTechInput(index, e.target.value)}
                        onKeyPress={(e) => handleTechKeyPress(e, index)}
                        placeholder="e.g., React, Node.js, MongoDB"
                        className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      />
                      <button
                        onClick={() => addTech(index)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    {errors?.[`projects.${index}.tech`] && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors[`projects.${index}.tech`]}
                      </p>
                    )}
                  </div>

                  {/* Links Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub Repository
                      </label>
                      <input
                        type="url"
                        value={project.github || ''}
                        onChange={(e) => updateProject(index, 'github', e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </label>
                      <input
                        type="url"
                        value={project.demo || ''}
                        onChange={(e) => updateProject(index, 'demo', e.target.value)}
                        placeholder="https://your-project.com"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Image and Featured Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        Project Image
                      </label>
                      <input
                        type="url"
                        value={project.image || ''}
                        onChange={(e) => updateProject(index, 'image', e.target.value)}
                        placeholder="https://example.com/project-image.jpg"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors w-full">
                        <input
                          type="checkbox"
                          checked={project.featured || false}
                          onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                          className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">Featured</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Project Preview */}
                  {(project.title || project.description) && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <div className="space-y-2">
                        {project.title && (
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            {project.title}
                            {project.featured && <Star className="w-4 h-4 text-yellow-400" />}
                          </h4>
                        )}
                        {project.category && (
                          <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                            {project.category}
                          </span>
                        )}
                        {project.description && (
                          <p className="text-sm text-gray-300">{project.description}</p>
                        )}
                        {project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Project Button */}
        <button
          onClick={addProject}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>

        {/* Help Text */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <Folder className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-purple-300">Tips for Great Projects</h4>
              <ul className="text-sm text-purple-200/80 space-y-1">
                <li>• Use clear, descriptive titles that explain what the project does</li>
                <li>• Include specific technologies and frameworks you used</li>
                <li>• Write descriptions that highlight problems solved and features</li>
                <li>• Add GitHub links to show your code quality</li>
                <li>• Include live demo links when possible</li>
                <li>• Mark your best work as "Featured" to highlight it</li>
                <li>• Use high-quality screenshots or mockups as project images</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {projects.length === 0 
              ? "Add projects to showcase your skills and experience to potential clients or employers."
              : `You have ${projects.length} project${projects.length === 1 ? '' : 's'} added. You can always add more or edit existing ones.`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsStep;