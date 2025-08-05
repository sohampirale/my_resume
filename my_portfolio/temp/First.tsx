import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  Code2, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Zap,
  Trophy,
  BookOpen,
  Briefcase
} from 'lucide-react';

// Hero Component
const Hero = ({ name, title, description, location, avatar, social }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className={`flex flex-col items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Avatar */}
          <div className="relative mb-8 group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 p-1 animate-spin-slow">
              <img 
                src={avatar} 
                alt={name}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          {/* Name with Gradient */}
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
            {name}
          </h1>

          {/* Animated Title */}
          <div className="text-2xl md:text-3xl text-cyan-300 mb-6 font-semibold">
            <span className="inline-block animate-bounce animation-delay-200">💻</span>
            <span className="mx-3">{title}</span>
            <span className="inline-block animate-bounce animation-delay-400">🚀</span>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
            {description}
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-400 mb-8">
            <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
            {location}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <Download className="w-5 h-5 inline mr-2" />
              Download Resume
            </button>
            <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5 inline mr-2" />
              Let's Connect
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {social.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = ({ about, skills, stats }) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {about}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Skills & Technologies</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between text-white mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                      style={{ width: `${skill.level}%` }}
                    ></div>
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

// Projects Component
const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={project.github}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                  <a 
                    href={project.demo}
                    className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Component
const Experience = ({ experience, education }) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Briefcase className="mr-3 text-cyan-400" />
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-700 last:border-l-0">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                      <span className="text-cyan-400 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-purple-400 font-semibold mb-3">{exp.company}</p>
                    <p className="text-gray-400">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <BookOpen className="mr-3 text-cyan-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-700 last:border-l-0">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-gray-900"></div>
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                      <span className="text-purple-400 text-sm">{edu.year}</span>
                    </div>
                    <p className="text-cyan-400 font-semibold mb-3">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-gray-400">GPA: <span className="text-green-400">{edu.gpa}</span></p>
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

// Contact Component
const Contact = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white font-semibold">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white font-semibold">{contact.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-400 mb-4">Follow me on social media</p>
                <div className="flex gap-4">
                  {contact.social.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Send Message
                <ArrowRight className="ml-2 w-5 h-5" />
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
  // Test data for a student
  const portfolioData = {
    // Hero Data
    name: "Alex Chen",
    title: "Full Stack Developer & UI/UX Designer",
    description: "Passionate computer science student crafting beautiful, functional web experiences with modern technologies. I love turning complex problems into simple, beautiful designs.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    social: [
      { 
        icon: <Github className="w-6 h-6" />, 
        url: "https://github.com/alexchen" 
      },
      { 
        icon: <Linkedin className="w-6 h-6" />, 
        url: "https://linkedin.com/in/alexchen" 
      },
      { 
        icon: <Mail className="w-6 h-6" />, 
        url: "mailto:alex@example.com" 
      }
    ],

    // About Data
    about: "I'm a passionate Computer Science student at Stanford University with a love for creating innovative web solutions. My journey began with curiosity about how websites work, and it has evolved into a deep passion for full-stack development and user experience design. I enjoy working with cutting-edge technologies and am always eager to learn new frameworks and tools.",
    
    skills: [
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "React/Next.js", level: 85 },
      { name: "Node.js/Express", level: 80 },
      { name: "Python/Django", level: 75 },
      { name: "UI/UX Design", level: 70 },
      { name: "Database Design", level: 80 }
    ],

    stats: [
      { value: "50+", label: "Projects Completed" },
      { value: "3", label: "Years Experience" },
      { value: "15+", label: "Technologies" },
      { value: "100+", label: "GitHub Commits" }
    ],

    // Projects Data
    projects: [
      {
        title: "EcoTracker",
        description: "A comprehensive web application that helps users track their carbon footprint with real-time analytics and personalized recommendations for reducing environmental impact.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
        tech: ["React", "Node.js", "MongoDB", "Chart.js"],
        category: "web",
        github: "https://github.com/alexchen/ecotracker",
        demo: "https://ecotracker.demo.com",
        featured: true
      },
      {
        title: "StudyBuddy AI",
        description: "AI-powered study companion mobile app that creates personalized study plans, tracks progress, and provides intelligent flashcards using machine learning.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
        tech: ["React Native", "TensorFlow", "Firebase", "Python"],
        category: "mobile",
        github: "https://github.com/alexchen/studybuddy",
        demo: "https://studybuddy.demo.com",
        featured: true
      },
      {
        title: "Portfolio Dashboard",
        description: "A beautiful, responsive dashboard for managing personal portfolios with drag-and-drop functionality and real-time data visualization.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
        category: "web",
        github: "https://github.com/alexchen/portfolio-dashboard",
        demo: "https://portfolio-dashboard.demo.com",
        featured: false
      },
      {
        title: "GameHub Social",
        description: "Social gaming platform where users can discover, rate, and share their favorite games with friends and gaming communities.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
        tech: ["Next.js", "Prisma", "NextAuth", "Tailwind"],
        category: "web",
        github: "https://github.com/alexchen/gamehub",
        demo: "https://gamehub.demo.com",
        featured: false
      },
      {
        title: "Weather Lens",
        description: "Innovative weather app that uses computer vision to analyze sky conditions and provide hyper-local weather predictions.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
        tech: ["Swift", "CoreML", "OpenCV", "REST API"],
        category: "mobile",
        github: "https://github.com/alexchen/weather-lens",
        demo: "https://weather-lens.demo.com",
        featured: false
      },
      {
        title: "Code Visualizer",
        description: "Educational tool that visualizes data structures and algorithms in real-time to help students understand complex programming concepts.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
        tech: ["JavaScript", "Canvas API", "WebGL", "TypeScript"],
        category: "education",
        github: "https://github.com/alexchen/code-visualizer",
        demo: "https://code-visualizer.demo.com",
        featured: true
      }
    ],

    // Experience Data
    experience: [
      {
        position: "Frontend Developer Intern",
        company: "TechCorp Solutions",
        duration: "Jun 2024 - Aug 2024",
        description: "Developed responsive web components using React and TypeScript, improving user engagement by 30%. Collaborated with senior developers on optimizing application performance."
      },
      {
        position: "Web Development Freelancer",
        company: "Self-Employed",
        duration: "Jan 2023 - Present",
        description: "Built custom websites for local businesses and startups, focusing on modern design principles and user experience. Managed projects from concept to deployment."
      },
      {
        position: "Teaching Assistant",
        company: "Stanford University",
        duration: "Sep 2023 - May 2024",
        description: "Assisted in teaching CS106A (Programming Methodology) course, helping 50+ students learn Java programming fundamentals and debugging techniques."
      }
    ],

    // Education Data
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "Stanford University",
        year: "2022 - 2026",
        gpa: "3.8"
      },
      {
        degree: "High School Diploma",
        school: "Palo Alto High School",
        year: "2018 - 2022",
        gpa: "4.0"
      }
    ],

    // Contact Data
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
    <div className="min-h-screen bg-gray-900">
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
      <footer className="bg-black py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 {portfolioData.name}. Built with ❤️ and lots of ☕
          </p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-500">•</span>
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-gray-500">•</span>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;