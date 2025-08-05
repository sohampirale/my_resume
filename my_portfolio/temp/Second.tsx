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
  ArrowUpRight
} from 'lucide-react';

// Hero Component - Clean & Minimal
const Hero = ({ name, title, description, location, avatar, social }) => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
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
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/portfolio/home</p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {name}
              </h1>
              <div className="h-8 flex items-center">
                <span className="text-xl text-gray-300 font-mono">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              {description}
            </p>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="font-mono text-sm">{location}</span>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors">
                Download CV
              </button>
              <button className="border border-gray-600 px-6 py-3 font-medium hover:border-gray-400 transition-colors">
                Contact Me
              </button>
            </div>
            
            <div className="flex space-x-4 pt-4">
              {social.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Content - Avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gray-900 border border-gray-800">
                <img 
                  src={avatar} 
                  alt={name}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 w-4 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component - Grid Layout
const About = ({ about, skills, stats }) => {
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* About Text */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/about</p>
              <h2 className="text-3xl font-bold">About Me</h2>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              {about}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/skills</p>
              <h3 className="text-xl font-bold">Tech Stack</h3>
            </div>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-800">
                    <div 
                      className="h-1 bg-white transition-all duration-1000"
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

// Projects Component - Clean Grid
const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-gray-400 font-mono text-sm">~/projects</p>
            <h2 className="text-3xl font-bold">Selected Work</h2>
          </div>
          
          {/* Filter */}
          <div className="flex space-x-4 border-b border-gray-800 pb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`font-mono text-sm transition-colors ${
                  filter === category
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="group space-y-4">
                <div className="aspect-video bg-gray-900 border border-gray-800 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex space-x-3">
                      <a 
                        href={project.github}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href={project.demo}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-900 text-gray-300 text-xs font-mono border border-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Component - Timeline
const Experience = ({ experience, education }) => {
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/experience</p>
              <h2 className="text-2xl font-bold">Work History</h2>
            </div>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-3 pb-8 border-b border-gray-800 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{exp.position}</h3>
                    <span className="text-gray-500 text-sm font-mono">{exp.duration}</span>
                  </div>
                  <p className="text-gray-400 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/education</p>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="space-y-3 pb-8 border-b border-gray-800 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-gray-500 text-sm font-mono">{edu.year}</span>
                  </div>
                  <p className="text-gray-400 font-medium">{edu.school}</p>
                  {edu.gpa && (
                    <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component - Minimal Form
const Contact = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-gray-400 font-mono text-sm">~/contact</p>
              <h2 className="text-3xl font-bold">Get In Touch</h2>
            </div>
            
            <p className="text-gray-400 text-lg">
              Have a project in mind? Let's work together to create something amazing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="font-mono">{contact.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-mono">{contact.location}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              {contact.social.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-400 font-mono text-sm">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-400 font-mono text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white focus:border-white focus:outline-none transition-colors font-mono"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-400 font-mono text-sm">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white focus:border-white focus:outline-none transition-colors font-mono resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
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
  // Same test data as before
  const portfolioData = {
    name: "Alex Chen",
    title: "Full Stack Developer & UI/UX Designer",
    description: "I craft digital experiences that combine beautiful design with robust functionality. Currently focused on modern web technologies and user-centered development.",
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

    about: "I'm a passionate Computer Science student at Stanford University with a focus on creating meaningful digital experiences. My journey spans full-stack development, user interface design, and problem-solving through code. I believe in writing clean, maintainable code and designing interfaces that users actually enjoy using.",
    
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "React/Next.js", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "UI/UX Design", level: 75 }
    ],

    stats: [
      { value: "3+", label: "Years Experience" },
      { value: "50+", label: "Projects" },
      { value: "15+", label: "Technologies" },
      { value: "98%", label: "Client Satisfaction" }
    ],

    projects: [
      {
        title: "EcoTracker",
        description: "A comprehensive web application that helps users track their carbon footprint with real-time analytics and personalized recommendations.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
        tech: ["React", "Node.js", "MongoDB", "Chart.js"],
        category: "web",
        github: "https://github.com/alexchen/ecotracker",
        demo: "https://ecotracker.demo.com",
        featured: true
      },
      {
        title: "StudyBuddy AI",
        description: "AI-powered study companion that creates personalized study plans and tracks learning progress using machine learning algorithms.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
        tech: ["React Native", "TensorFlow", "Firebase", "Python"],
        category: "mobile",
        github: "https://github.com/alexchen/studybuddy",
        demo: "https://studybuddy.demo.com",
        featured: true
      },
      {
        title: "Portfolio Dashboard",
        description: "A clean, responsive dashboard for managing personal portfolios with real-time data visualization and analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
        category: "web",
        github: "https://github.com/alexchen/portfolio-dashboard",
        demo: "https://portfolio-dashboard.demo.com",
        featured: false
      },
      {
        title: "GameHub Social",
        description: "Social gaming platform where users can discover, rate, and share their favorite games with gaming communities.",
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
        description: "Developed responsive web components using React and TypeScript, improving user engagement by 30%. Collaborated with senior developers on performance optimization."
      },
      {
        position: "Freelance Developer",
        company: "Self-Employed",
        duration: "Jan 2023 - Present",
        description: "Built custom websites for local businesses and startups, focusing on modern design principles and user experience."
      },
      {
        position: "Teaching Assistant",
        company: "Stanford University",
        duration: "Sep 2023 - May 2024",
        description: "Assisted in teaching CS106A (Programming Methodology), helping 50+ students learn Java programming fundamentals."
      }
    ],

    education: [
      {
        degree: "BS Computer Science",
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
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 font-mono text-sm">
            © 2024 {portfolioData.name} • Built with passion and code
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;