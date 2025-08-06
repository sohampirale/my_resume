"use client";

import React from 'react';
import { Mail, MapPin, Github, Linkedin, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactInfo {
  email: string;
  location: string;
  social: {
    github: string;
    linkedIn: string;
    mail: string;
  };
}

interface ContactStepProps {
  contact: ContactInfo;
  onContactChange: (contact: ContactInfo) => void;
  errors?: { [key: string]: string };
}

const ContactStep: React.FC<ContactStepProps> = ({ contact, onContactChange, errors }) => {
  const updateContact = (field: string, value: string) => {
    if (field.startsWith('social.')) {
      const socialField = field.split('.')[1];
      onContactChange({
        ...contact,
        social: {
          ...contact.social,
          [socialField]: value
        }
      });
    } else {
      onContactChange({
        ...contact,
        [field]: value
      });
    }
  };

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // URL validation for social links
  const isValidURL = (url: string) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // GitHub URL validation
  const isValidGitHub = (url: string) => {
    if (!url) return true;
    return url.includes('github.com') || url.startsWith('https://github.com/');
  };

  // LinkedIn URL validation
  const isValidLinkedIn = (url: string) => {
    if (!url) return true;
    return url.includes('linkedin.com') || url.startsWith('https://linkedin.com/');
  };

  const contactExamples = {
    email: [
      "john.doe@gmail.com",
      "sarah.dev@company.com",
      "alex.designer@outlook.com",
      "maria.tech@protonmail.com"
    ],
    location: [
      "San Francisco, CA",
      "New York, NY",
      "London, UK",
      "Remote",
      "Bangalore, India", 
      "Toronto, Canada"
    ],
    github: [
      "https://github.com/username",
      "https://github.com/johndoe",
      "github.com/developer123"
    ],
    linkedin: [
      "https://linkedin.com/in/username",
      "https://linkedin.com/in/john-doe",
      "linkedin.com/in/sarah-developer"
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-2xl mb-4">
          <Mail className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Contact Information</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Make it easy for potential employers and collaborators to reach you. 
          Add your professional contact details and social profiles.
        </p>
      </div>

      {/* Contact Form */}
      <div className="space-y-8">
        {/* Primary Contact Info */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            Primary Contact
          </h3>

          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    contact.email && isValidEmail(contact.email)
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : contact.email && !isValidEmail(contact.email)
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                />
                {contact.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidEmail(contact.email) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              {errors?.['contact.email'] && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors['contact.email']}
                </p>
              )}
              <div className="text-xs text-gray-500">
                Examples: {contactExamples.email.slice(0, 2).join(', ')}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Location <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={contact.location}
                  onChange={(e) => updateContact('location', e.target.value)}
                  placeholder="City, Country or Remote"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    contact.location.trim()
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors?.['contact.location'] && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors['contact.location']}
                </p>
              )}
              <div className="text-xs text-gray-500">
                Examples: {contactExamples.location.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-emerald-400" />
            Social Profiles
          </h3>

          <div className="space-y-6">
            {/* GitHub */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                GitHub Profile <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={contact.social.github}
                  onChange={(e) => updateContact('social.github', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    contact.social.github && isValidGitHub(contact.social.github)
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : contact.social.github && !isValidGitHub(contact.social.github)
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                />
                {contact.social.github && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidGitHub(contact.social.github) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              {errors?.['contact.social.github'] && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors['contact.social.github']}
                </p>
              )}
              <div className="text-xs text-gray-500">
                Examples: {contactExamples.github.slice(0, 2).join(', ')}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                LinkedIn Profile <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={contact.social.linkedIn}
                  onChange={(e) => updateContact('social.linkedIn', e.target.value)}
                  placeholder="https://linkedin.com/in/yourusername"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    contact.social.linkedIn && isValidLinkedIn(contact.social.linkedIn)
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : contact.social.linkedIn && !isValidLinkedIn(contact.social.linkedIn)
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                />
                {contact.social.linkedIn && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidLinkedIn(contact.social.linkedIn) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              {errors?.['contact.social.linkedIn'] && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors['contact.social.linkedIn']}
                </p>
              )}
              <div className="text-xs text-gray-500">
                Examples: {contactExamples.linkedin.slice(0, 2).join(', ')}
              </div>
            </div>

            {/* Additional Email (for contact.social.mail) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Additional Email 
                <span className="text-gray-500 text-xs ml-2">(Optional - if different from primary)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={contact.social.mail}
                  onChange={(e) => updateContact('social.mail', e.target.value)}
                  placeholder="business@yourname.com (optional)"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                    contact.social.mail && isValidEmail(contact.social.mail)
                      ? 'border-emerald-500/50 focus:border-emerald-500'
                      : contact.social.mail && !isValidEmail(contact.social.mail)
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-gray-600 focus:border-emerald-500'
                  }`}
                />
                {contact.social.mail && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidEmail(contact.social.mail) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Use for business inquiries or alternative contact method
              </div>
            </div>
          </div>
        </div>

        {/* Contact Preview */}
        {(contact.email || contact.location || contact.social.github || contact.social.linkedIn) && (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Contact Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contact.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Primary Email</p>
                    <p className="text-white font-medium">{contact.email}</p>
                  </div>
                </div>
              )}
              
              {contact.location && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-white font-medium">{contact.location}</p>
                  </div>
                </div>
              )}
              
              {contact.social.github && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <Github className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">GitHub</p>
                    <p className="text-white font-medium break-all">{contact.social.github}</p>
                  </div>
                </div>
              )}
              
              {contact.social.linkedIn && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <Linkedin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">LinkedIn</p>
                    <p className="text-white font-medium break-all">{contact.social.linkedIn}</p>
                  </div>
                </div>
              )}
              
              {contact.social.mail && (
                <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Additional Email</p>
                    <p className="text-white font-medium">{contact.social.mail}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-emerald-300">Contact Information Tips</h4>
              <ul className="text-sm text-emerald-200/80 space-y-1">
                <li>• Use a professional email address for your primary contact</li>
                <li>• Include your current location or "Remote" if you work remotely</li>
                <li>• GitHub and LinkedIn profiles are essential for tech professionals</li>
                <li>• Make sure your social profiles are up-to-date and professional</li>
                <li>• Use consistent usernames across platforms when possible</li>
                <li>• Double-check all URLs to ensure they're working correctly</li>
                <li>• Consider using a professional domain email if you have one</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Requirements Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            All fields marked with <span className="text-red-400">*</span> are required. 
            Make sure your contact information is accurate and professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;