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
const Hero = ({ name, tagLine, description, location, social }) => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    const roles = [tagLine || 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
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
  }, [tagLine]);

  // Convert social object to array format for rendering
  const socialLinks = [];
  if (social?.github) {
    socialLinks.push({
      url: social.github,
      icon: <Github className="w-5 h-5" />
    });
  }
  if (social?.linkedIn) {
    socialLinks.push({
      url: social.linkedIn,
      icon: <Linkedin className="w-5 h-5" />
    });
  }
  if (social?.mail) {
    socialLinks.push({
      url: `mailto:${social.mail}`,
      icon: <Mail className="w-5 h-5" />
    });
  }

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
              {socialLinks.map((link, index) => (
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
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <User className="w-32 h-32 text-gray-600" />
                </div>
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
              {stats?.map((stat, index) => (
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
              {skills?.map((skill, index) => (
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
  
  const categories = ['all', ...new Set(projects?.map(p => p.category) || [])];
  
  const filteredProjects = filter === 'all' 
    ? (projects || [])
    : (projects || []).filter(p => p.category === filter);

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
                className={`font-mono text-sm transition-colors capitalize ${
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
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex space-x-3">
                      {project.github && (
                        <a 
                          href={project.github}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.descripiton || project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((tech, i) => (
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
              {experience?.map((exp, index) => (
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
              {education?.map((edu, index) => (
                <div key={index} className="space-y-3 pb-8 border-b border-gray-800 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-gray-500 text-sm font-mono">{edu.year}</span>
                  </div>
                  <p className="text-gray-400 font-medium">{edu.school}</p>
                  {edu.cgpa && (
                    <p className="text-gray-500 text-sm">CGPA: {edu.cgpa}</p>
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
const Contact = ({ contact, social }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  // Get contact info - now contact is an object, not an array
  const contactInfo = contact || {};
  const contactSocial = contactInfo.social || social || {};

  // Convert social object to array format for rendering
  const socialLinks = [];
  if (contactSocial?.github) {
    socialLinks.push({
      url: contactSocial.github,
      icon: <Github className="w-5 h-5" />
    });
  }
  if (contactSocial?.linkedIn) {
    socialLinks.push({
      url: contactSocial.linkedIn,
      icon: <Linkedin className="w-5 h-5" />
    });
  }
  if (contactSocial?.mail) {
    socialLinks.push({
      url: `mailto:${contactSocial.mail}`,
      icon: <Mail className="w-5 h-5" />
    });
  }

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
                <span className="font-mono">{contactInfo.email || contactSocial.mail || 'contact@example.com'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-mono">{contactInfo.location || 'Location not specified'}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((socialLink, index) => (
                <a 
                  key={index}
                  href={socialLink.url}
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors"
                >
                  {socialLink.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="space-y-6">
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
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white focus:border-white focus:outline-none transition-colors font-mono resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                onClick={handleSubmit}
                className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const Standard = ({portfolioData}) => {
  return (
    <div className="min-h-screen bg-black">
      <Hero 
        name={portfolioData.name}
        tagLine={portfolioData.tagLine}
        description={portfolioData.description}
        location={portfolioData.location}
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
        social={portfolioData.social}
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

export default Standard;