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

const Hero = ({ name, title, description, location, avatar, social }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Convert social object to array format for rendering
  const socialArray = [
    { url: social?.github, icon: <Github className="w-5 h-5" /> },
    { url: social?.linkedIn, icon: <Linkedin className="w-5 h-5" /> },
    { url: `mailto:${social?.mail}`, icon: <Mail className="w-5 h-5" /> }
  ].filter(item => item.url); // Filter out empty URLs

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className={`flex flex-col items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Avatar */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
              <img 
                src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&size=96&background=374151&color=ffffff`} 
                alt={name || 'User'}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            {name || 'John Doe'}
          </h1>

          {/* Title */}
          <div className="text-lg md:text-xl text-blue-400 mb-4 font-medium">
            {title || 'Full Stack Developer'}
          </div>

          {/* Description */}
          <p className="text-base text-gray-300 max-w-xl mb-6 leading-relaxed">
            {description || 'Passionate developer creating amazing digital experiences with modern technologies.'}
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-400 mb-8">
            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
            {location || 'New York, NY'}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4 inline mr-2" />
              Download Resume
            </button>
            <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300">
              <Mail className="w-4 h-4 inline mr-2" />
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialArray.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Skills & Technologies</h3>
            <div className="space-y-4">
              {skills && skills.map((skill, index) => (
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

const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  
  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              My <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-gray-400">Projects coming soon...</p>
          </div>
        </div>
      </section>
    );
  }
  
  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  
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
                  src={project.image || 'https://via.placeholder.com/400x200/374151/9CA3AF?text=Project+Image'} 
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
                  {project.tech && project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.github && (
                    <a 
                      href={project.github}
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo}
                      className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
              {experience && experience.length > 0 ? (
                experience.map((exp, index) => (
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
                ))
              ) : (
                <p className="text-gray-400">Experience details coming soon...</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <BookOpen className="mr-3 text-cyan-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
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
                ))
              ) : (
                <p className="text-gray-400">Education details coming soon...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ contact, social }) => {
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

  const socialArray = [
    { url: social?.github, icon: <Github className="w-5 h-5" /> },
    { url: social?.linkedIn, icon: <Linkedin className="w-5 h-5" /> },
    { url: `mailto:${social?.mail}`, icon: <Mail className="w-5 h-5" /> }
  ].filter(item => item.url);

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
                    <p className="text-white font-semibold">{contact?.email || social?.mail}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white font-semibold">{contact?.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-gray-400 mb-4">Follow me on social media</p>
                <div className="flex gap-4">
                  {socialArray.map((socialItem, index) => (
                    <a 
                      key={index}
                      href={socialItem.url}
                      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socialItem.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            
            <div className="space-y-6">
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
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Aurora = ({ portfolioData }) => {
  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Hero 
        name={portfolioData.name}
        title={portfolioData.tagLine || portfolioData.title}
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
        social={portfolioData.social}
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

export default Aurora;