import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  Code2, 
  Terminal,
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Folder,
  FileText,
  User,
  Briefcase,
  BookOpen,
  Send,
  ArrowUpRight,
  Dot
} from 'lucide-react';

// Hero Component - Sophisticated Minimal
const Hero = ({ name, title, description, location, avatar, social }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState('');
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
      const role = roles[currentRole];
      
      if (!isDeleting) {
        setCurrentText(role.substring(0, currentChar + 1));
        currentChar++;
        
        if (currentChar === role.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      } else {
        setCurrentText(role.substring(0, currentChar - 1));
        currentChar--;
        
        if (currentChar === 0) {
          isDeleting = false;
          currentRole = (currentRole + 1) % roles.length;
        }
      }
    };
    
    const timer = setInterval(typeWriter, isDeleting ? 50 : 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Status indicator */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Available for work</span>
                </div>
                <div className="w-px h-4 bg-zinc-700" />
                <span className="text-zinc-500 text-sm font-mono">{location}</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
                  <span className="font-extralight text-zinc-400">Hi, I'm</span>
                  <br />
                  <span className="font-medium bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>
                
                <div className="h-8 flex items-center">
                  <span className="text-xl text-zinc-400 font-light">
                    {currentText}
                    <span className="w-0.5 h-5 bg-blue-400 inline-block ml-1 animate-pulse" />
                  </span>
                </div>
              </div>
              
              <p className="text-zinc-400 text-lg leading-relaxed max-w-lg font-light">
                {description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <button className="group relative bg-white text-black px-8 py-3 font-medium overflow-hidden transition-all duration-300 hover:bg-zinc-100">
                  <span className="relative z-10 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
                
                <button className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                  <span>Let's talk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-1 pt-8">
                <div className="w-8 h-px bg-zinc-700" />
                {social.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="group w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-300 relative"
                  >
                    {link.icon}
                    <div className="absolute inset-0 border border-zinc-800 group-hover:border-zinc-600 transition-colors" />
                  </a>
                ))}
                <div className="w-8 h-px bg-zinc-700" />
              </div>
            </div>
            
            {/* Right Content - Enhanced Avatar */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Main image container */}
                <div className="relative w-80 h-96 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500">
                  <img 
                    src={avatar} 
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-4 h-4 bg-blue-400 transform rotate-45 opacity-80" />
                  <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-purple-400 rounded-full opacity-60" />
                </div>
                
                {/* Background decoration */}
                <div className="absolute -inset-4 border border-zinc-800/50 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component - Sophisticated Grid
const About = ({ about, skills, stats }) => {
  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-sm font-mono tracking-wide">ABOUT</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <h2 className="text-4xl font-light">
            Crafting digital experiences with
            <span className="text-zinc-400 italic ml-2">precision</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* About Text */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              {about}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl font-light mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-sm font-medium">{stat.label}</div>
                  <div className="w-full h-px bg-zinc-800 mt-3 group-hover:bg-blue-400/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills */}
          <div className="space-y-8">
            <h3 className="text-xl font-medium text-zinc-300">Core Technologies</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-zinc-300">{skill.name}</span>
                    <span className="text-zinc-500 text-sm font-mono">{skill.level}%</span>
                  </div>
                  <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-blue-400/20"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component - Elevated Cards
const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-sm font-mono tracking-wide">PROJECTS</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <h2 className="text-4xl font-light mb-8">Selected Works</h2>
          
          {/* Filter */}
          <div className="flex space-x-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative pb-2 text-sm font-medium transition-colors ${
                  filter === category
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {filter === category && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-400 to-purple-400" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="space-y-6">
                {/* Image */}
                <div className="relative aspect-[4/3] bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating number */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Links overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <a 
                      href={project.github}
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demo}
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-medium group-hover:text-zinc-300 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-medium">Featured</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-zinc-500 leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono hover:border-zinc-700 hover:text-zinc-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Component - Timeline with hover effects
const Experience = ({ experience, education }) => {
  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-sm font-mono tracking-wide">JOURNEY</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div className="space-y-8">
            <h2 className="text-2xl font-medium mb-8">Experience</h2>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="group relative pl-8">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
                  
                  {/* Timeline dot */}
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-zinc-800 border-2 border-zinc-950 rounded-full group-hover:bg-blue-400 group-hover:border-zinc-950 transition-colors" />
                  
                  <div className="space-y-3 pb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <h3 className="font-medium group-hover:text-zinc-300 transition-colors">{exp.position}</h3>
                      <span className="text-zinc-500 text-sm font-mono">{exp.duration}</span>
                    </div>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                    <p className="text-zinc-500 leading-relaxed font-light">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <h2 className="text-2xl font-medium mb-8">Education</h2>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="group relative pl-8">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
                  
                  {/* Timeline dot */}
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-zinc-800 border-2 border-zinc-950 rounded-full group-hover:bg-purple-400 group-hover:border-zinc-950 transition-colors" />
                  
                  <div className="space-y-3 pb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <h3 className="font-medium group-hover:text-zinc-300 transition-colors">{edu.degree}</h3>
                      <span className="text-zinc-500 text-sm font-mono">{edu.year}</span>
                    </div>
                    <p className="text-purple-400 font-medium">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-zinc-500 text-sm font-light">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component - Refined Form
const Contact = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-px bg-zinc-700" />
            <span className="text-zinc-500 text-sm font-mono tracking-wide">CONTACT</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <h2 className="text-4xl font-light">Let's create something together</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you're a company looking to hire, or you have a project in mind, 
              I'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="group flex items-center space-x-4">
                <div className="w-12 h-12 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Email</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
              </div>

              <div className="group flex items-center space-x-4">
                <div className="w-12 h-12 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-colors">
                  <MapPin className="w-5 h-5 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Location</p>
                  <p className="font-medium">{contact.location}</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-1 pt-8">
              <div className="w-8 h-px bg-zinc-700" />
              {contact.social.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="group w-12 h-12 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center transition-colors"
                >
                  <div className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
              <div className="w-8 h-px bg-zinc-700" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-zinc-800 text-white focus:border-zinc-600 focus:outline-none transition-colors font-light"
                    placeholder="Your name"
                  />
                  <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    focusedField === 'name' ? 'w-full' : 'w-0'
                  }`} />
                </div>
                
                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-zinc-800 text-white focus:border-zinc-600 focus:outline-none transition-colors font-light"
                    placeholder="your@email.com"
                  />
                  <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    focusedField === 'email' ? 'w-full' : 'w-0'
                  }`} />
                </div>
                
                {/* Message Field */}
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="4"
                    className="w-full px-0 py-4 bg-transparent border-b border-zinc-800 text-white focus:border-zinc-600 focus:outline-none transition-colors font-light resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    focusedField === 'message' ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </div>
              
              <button
                type="submit"
                className="group relative bg-white text-black px-8 py-4 font-medium overflow-hidden transition-all duration-300 hover:bg-zinc-100"
              >
                <span className="relative z-10 flex items-center">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const PortfolioPage = () => {
  // Same test data
  const portfolioData = {
    name: "Alex Chen",
    title: "Full Stack Developer & UI/UX Designer",
    description: "I specialize in creating digital experiences that seamlessly blend beautiful design with robust functionality. Currently focused on modern web technologies and user-centered development approaches.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    social: [
      { 
        icon: <Github className="w-5 h-5" />, 
        url: "https://github.com/alexchen" 
      },
      { 
        icon: <Linkedin className="w-5 h-5" />, 
        url: "https://linkedin.com/in/alexchen" 
      },
      { 
        icon: <Mail className="w-5 h-5" />, 
        url: "mailto:alex@example.com" 
      }
    ],

    about: "I'm a passionate Computer Science student at Stanford University with a focus on creating meaningful digital experiences. My journey spans full-stack development, user interface design, and problem-solving through code. I believe in writing clean, maintainable code and designing interfaces that users actually enjoy using. When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or mentoring fellow students.",
    
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "React/Next.js", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 78 },
      { name: "PostgreSQL", level: 75 },
      { name: "UI/UX Design", level: 82 }
    ],

    stats: [
      { value: "3+", label: "Years Experience" },
      { value: "50+", label: "Projects Delivered" },
      { value: "15+", label: "Technologies" },
      { value: "100%", label: "Client Satisfaction" }
    ],

    projects: [
      {
        title: "EcoTracker Platform",
        description: "A comprehensive sustainability platform that helps organizations track their carbon footprint with real-time analytics, automated reporting, and actionable insights for environmental impact reduction.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
        tech: ["React", "Node.js", "MongoDB", "Chart.js"],
        category: "web",
        github: "https://github.com/alexchen/ecotracker",
        demo: "https://ecotracker.demo.com",
        featured: true
      },
      {
        title: "StudyBuddy AI",
        description: "An intelligent study companion that leverages machine learning to create personalized study plans, adaptive flashcards, and progress tracking for enhanced learning outcomes.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
        tech: ["React Native", "TensorFlow", "Firebase", "Python"],
        category: "mobile",
        github: "https://github.com/alexchen/studybuddy",
        demo: "https://studybuddy.demo.com",
        featured: true
      },
      {
        title: "Portfolio Analytics",
        description: "A sophisticated dashboard for managing investment portfolios with real-time market data, risk analysis, and performance visualization tools.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
        category: "web",
        github: "https://github.com/alexchen/portfolio-dashboard",
        demo: "https://portfolio-dashboard.demo.com",
        featured: false
      },
      {
        title: "GameHub Community",
        description: "A social gaming platform where enthusiasts can discover, review, and discuss games while connecting with like-minded players worldwide.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
        tech: ["Next.js", "Prisma", "NextAuth", "Tailwind"],
        category: "web",
        github: "https://github.com/alexchen/gamehub",
        demo: "https://gamehub.demo.com",
        featured: false
      }
    ],

    experience: [
      {
        position: "Frontend Developer Intern",
        company: "TechCorp Solutions",
        duration: "Jun 2024 - Aug 2024",
        description: "Led the development of responsive web components using React and TypeScript, resulting in a 30% improvement in user engagement. Collaborated with senior developers on performance optimization and implemented modern testing practices."
      },
      {
        position: "Freelance Developer",
        company: "Independent",
        duration: "Jan 2023 - Present",
        description: "Delivered custom web solutions for startups and local businesses, focusing on modern design principles and exceptional user experiences. Managed full project lifecycles from concept to deployment."
      },
      {
        position: "Teaching Assistant",
        company: "Stanford University",
        duration: "Sep 2023 - May 2024",
        description: "Mentored 50+ students in CS106A (Programming Methodology), conducted lab sessions, and provided guidance on Java programming fundamentals and software development best practices."
      }
    ],

    education: [
      {
        degree: "BS Computer Science",
        school: "Stanford University",
        year: "2022 - 2026",
        gpa: "3.85"
      },
      {
        degree: "High School Diploma",
        school: "Palo Alto High School",
        year: "2018 - 2022",
        gpa: "4.0"
      }
    ],

    contact: {
      email: "alex.chen@stanford.edu",
      location: "San Francisco, CA",
      social: [
        { 
          icon: <Github className="w-5 h-5" />, 
          url: "https://github.com/alexchen" 
        },
        { 
          icon: <Linkedin className="w-5 h-5" />, 
          url: "https://linkedin.com/in/alexchen" 
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero 
        name={portfolioData.name}
        title={portfolioData.title}
        description={portfolioData.description}
        location={portfolioData.location}
        avatar={portfolioData.avatar}
        social={portfolioData.social}
      />
      
      <About 
        about={portfolioData.about}
        skills={portfolioData.skills}
        stats={portfolioData.stats}
      />
      
      <Projects 
        projects={portfolioData.projects}
      />
      
      <Experience 
        experience={portfolioData.experience}
        education={portfolioData.education}
      />
      
      <Contact 
        contact={portfolioData.contact}
      />
      
      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-500 font-light">
              © 2024 {portfolioData.name}. Crafted with attention to detail.
            </p>
            <div className="flex items-center space-x-4 text-zinc-600">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-mono">Built with React & Tailwind</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;