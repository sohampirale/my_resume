"use client";

import React, { useState, useEffect } from "react";
import BasicInfoStep from "./CreatePortfolio/steps/BasicInfoStep";
import SocialLinksStep from "./CreatePortfolio/steps/SocialLinksStep";
import AboutStep from "./CreatePortfolio/steps/AboutStep";
import SkillsStep from "./CreatePortfolio/steps/SkillsStep";
import StatsStep from "./CreatePortfolio/steps/StatsStep";
import ProjectsStep from "./CreatePortfolio/steps/ProjectsStep";
import ExperienceStep from "./CreatePortfolio/steps/ExperienceStep";
import EducationStep from "./CreatePortfolio/steps/EducationStep";
import ContactStep from "./CreatePortfolio/steps/ContactStep";
import FormPreview from "./CreatePortfolio/steps/FormPreview";
import FormSubmission from "./CreatePortfolio/steps/FormSubmission";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertTriangle,
  User,
  Link,
  FileText,
  Target,
  BarChart3,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Phone,
  Eye,
  Rocket
} from "lucide-react";

// TypeScript interface for form data
interface FormData {
  name: string;
  slug: string;
  tagLine: string;
  description: string;
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

interface StepConfig {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  required: boolean;
}

export default function CreatePortfolio() {
  // Form steps configuration with icons
  const steps: StepConfig[] = [
    { id: 1, name: "Basic Info", icon: <User className="w-5 h-5" />, description: "Personal details", required: true },
    { id: 2, name: "Social Links", icon: <Link className="w-5 h-5" />, description: "Social profiles", required: false },
    { id: 3, name: "About", icon: <FileText className="w-5 h-5" />, description: "Your story", required: true },
    { id: 4, name: "Skills", icon: <Target className="w-5 h-5" />, description: "Technical skills", required: false },
    { id: 5, name: "Stats", icon: <BarChart3 className="w-5 h-5" />, description: "Achievements", required: false },
    { id: 6, name: "Projects", icon: <FolderOpen className="w-5 h-5" />, description: "Your work", required: false },
    { id: 7, name: "Experience", icon: <Briefcase className="w-5 h-5" />, description: "Work history", required: false },
    { id: 8, name: "Education", icon: <GraduationCap className="w-5 h-5" />, description: "Academic background", required: false },
    { id: 9, name: "Contact", icon: <Phone className="w-5 h-5" />, description: "Contact details", required: true },
    { id: 10, name: "Preview", icon: <Eye className="w-5 h-5" />, description: "Final review", required: false }
  ];

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  // Form data state matching the schema
  const [formData, setFormData] = useState<FormData>({
    name: "",
    slug: "",
    tagLine: "",
    description: "",
    location: "",
    social: {
      github: "",
      linkedIn: "",
      mail: ""
    },
    about: "",
    skills: [],
    stats: [],
    projects: [],
    experience: [],
    education: [],
    contact: {
      email: "",
      location: "",
      social: {
        github: "",
        linkedIn: "",
        mail: ""
      }
    }
  });

  // Step validation states
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({
    1: false, 2: true, 3: false, 4: true, 5: true,
    6: true, 7: true, 8: true, 9: false, 10: true
  });

  // Validation errors for each step
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});

  // Update form data
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Slug validation helper
  const isValidSlug = (slug: string): boolean => {
    const slugRegex = /^[a-z0-9-]+$/;
    return slug.length >= 3 && slugRegex.test(slug);
  };

  // Validate individual step
  const validateStep = (stepNumber: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    switch (stepNumber) {
      case 1: // Basic Info
        if (!formData.name.trim()) errors.push("Name is required");
        if (!formData.slug.trim()) errors.push("Slug is required");
        else if (!isValidSlug(formData.slug)) errors.push("Slug must be lowercase, 3+ characters, and contain only letters, numbers, and hyphens");
        if (!formData.location.trim()) errors.push("Location is required");
        break;

      case 3: // About
        if (!formData.about.trim()) errors.push("About section is required");
        else if (formData.about.trim().length < 50) errors.push("About section should be at least 50 characters");
        break;

      case 4: // Skills validation
        if (formData.skills.length > 0) {
          formData.skills.forEach((skill, index) => {
            if (!skill.name.trim()) errors.push(`Skill ${index + 1}: Name is required`);
            if (skill.level < 1 || skill.level > 100) errors.push(`Skill ${index + 1}: Level must be between 1-100`);
          });
        }
        break;

      case 5: // Stats validation
        if (formData.stats.length > 0) {
          formData.stats.forEach((stat, index) => {
            if (!stat.value.trim()) errors.push(`Stat ${index + 1}: Value is required`);
            if (!stat.label.trim()) errors.push(`Stat ${index + 1}: Label is required`);
          });
        }
        break;

      case 6: // Projects validation
        if (formData.projects.length > 0) {
          formData.projects.forEach((project, index) => {
            if (!project.title.trim()) errors.push(`Project ${index + 1}: Title is required`);
            if (!project.category.trim()) errors.push(`Project ${index + 1}: Category is required`);
            if (project.tech.length === 0) errors.push(`Project ${index + 1}: At least one technology is required`);
          });
        }
        break;

      case 7: // Experience validation
        if (formData.experience.length > 0) {
          formData.experience.forEach((exp, index) => {
            if (!exp.position.trim()) errors.push(`Experience ${index + 1}: Position is required`);
            if (!exp.company.trim()) errors.push(`Experience ${index + 1}: Company is required`);
            if (!exp.duration.trim()) errors.push(`Experience ${index + 1}: Duration is required`);
          });
        }
        break;

      case 8: // Education validation
        if (formData.education.length > 0) {
          formData.education.forEach((edu, index) => {
            if (!edu.degree.trim()) errors.push(`Education ${index + 1}: Degree is required`);
            if (!edu.school.trim()) errors.push(`Education ${index + 1}: School is required`);
            if (!edu.year.trim()) errors.push(`Education ${index + 1}: Year is required`);
          });
        }
        break;

      case 9: // Contact
        if (!formData.contact.email.trim()) errors.push("Email is required");
        else if (!isValidEmail(formData.contact.email)) errors.push("Valid email is required");
        if (!formData.contact.location.trim()) errors.push("Contact location is required");
        break;

      default:
        break;
    }

    return { isValid: errors.length === 0, errors };
  };

  // Update validation when form data changes
  useEffect(() => {
    const newValidation: Record<number, boolean> = {};
    const newErrors: Record<number, string[]> = {};

    steps.forEach(step => {
      const { isValid, errors } = validateStep(step.id);
      newValidation[step.id] = isValid || !step.required;
      newErrors[step.id] = errors;
    });

    setStepValidation(newValidation);
    setValidationErrors(newErrors);
  }, [formData]);

  // Check if current step is valid
  const isCurrentStepValid = (): boolean => {
    const { isValid } = validateStep(currentStep);
    const step = steps.find(s => s.id === currentStep);
    return isValid || !step?.required;
  };

  // Navigate to next step
  const nextStep = () => {
    if (isCurrentStepValid() && currentStep < steps.length) {
      if (currentStep === 10) {
        // If we're on preview step, show submission
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (showSubmission) {
      setShowSubmission(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Go to specific step
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= 10) {
      setShowSubmission(false);
      setCurrentStep(stepNumber);
    }
  };

  // Handle edit from preview
  const handleEditStep = (stepNumber: number) => {
    setShowSubmission(false);
    setCurrentStep(stepNumber);
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    setShowSubmission(true);
  };

  // Handle successful submission
  const handleSubmissionSuccess = () => {
    setIsSubmitting(false);
    console.log("Portfolio created successfully!");
  };

  // Handle submission retry
  const handleSubmissionRetry = () => {
    setIsSubmitting(false);
    setShowSubmission(false);
    setCurrentStep(10); // Go back to preview
  };

  // Handle go home
  const handleGoHome = () => {
    window.location.href = '/';
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Get step status
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) {
      return stepValidation[stepId] ? 'completed' : 'error';
    } else if (stepId === currentStep) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  // Render step content
  const renderStepContent = () => {
    const currentStepConfig = steps.find(s => s.id === currentStep);
    const hasErrors = validationErrors[currentStep]?.length > 0;

    const stepHeader = (
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4">
          {currentStepConfig?.icon}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{currentStepConfig?.name}</h2>
        <p className="text-gray-400">{currentStepConfig?.description}</p>
        
        {hasErrors && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-medium text-red-300">Please fix the following errors:</h3>
            </div>
            <ul className="text-red-200/80 text-sm space-y-1 text-left">
              {validationErrors[currentStep]?.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {stepHeader}
            <BasicInfoStep formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {stepHeader}
            <SocialLinksStep formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {stepHeader}
            <AboutStep formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            {stepHeader}
            <SkillsStep formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            {stepHeader}
            <StatsStep 
              stats={formData.stats}
              onStatsChange={(stats) => updateFormData({ stats })}
              errors={validationErrors[currentStep] ? 
                validationErrors[currentStep].reduce((acc, error, index) => {
                  acc[`stats.${index}.value`] = error.includes('Value') ? error : '';
                  acc[`stats.${index}.label`] = error.includes('Label') ? error : '';
                  return acc;
                }, {} as { [key: string]: string }) : {}
              }
            />
          </div>
        );
      case 6:
  return (
    <div className="space-y-6">
      {stepHeader}
      <ProjectsStep 
        projects={formData.projects}
        onProjectsChange={(projects) => updateFormData({ projects })}
        errors={validationErrors[currentStep] ? 
          validationErrors[currentStep].reduce((acc, error, index) => {
            // Parse project-specific errors
            const projectMatch = error.match(/Project (\d+): (.+)/);
            if (projectMatch) {
              const projectIndex = parseInt(projectMatch[1]) - 1;
              const errorType = projectMatch[2];
              if (errorType.includes('Title')) {
                acc[`projects.${projectIndex}.title`] = error;
              } else if (errorType.includes('Category')) {
                acc[`projects.${projectIndex}.category`] = error;
              } else if (errorType.includes('technology')) {
                acc[`projects.${projectIndex}.tech`] = error;
              }
            }
            return acc;
          }, {} as { [key: string]: string }) : {}
        }
      />
    </div>
  );
      case 7:
  return (
    <div className="space-y-6">
      {stepHeader}
      <ExperienceStep 
        experience={formData.experience}
        onExperienceChange={(experience) => updateFormData({ experience })}
        errors={validationErrors[currentStep] ? 
          validationErrors[currentStep].reduce((acc, error, index) => {
            // Parse experience-specific errors
            const experienceMatch = error.match(/Experience (\d+): (.+)/);
            if (experienceMatch) {
              const experienceIndex = parseInt(experienceMatch[1]) - 1;
              const errorType = experienceMatch[2];
              if (errorType.includes('Position')) {
                acc[`experience.${experienceIndex}.position`] = error;
              } else if (errorType.includes('Company')) {
                acc[`experience.${experienceIndex}.company`] = error;
              } else if (errorType.includes('Duration')) {
                acc[`experience.${experienceIndex}.duration`] = error;
              }
            }
            return acc;
          }, {} as { [key: string]: string }) : {}
        }
      />
    </div>
  );
      case 8: 
        return (
          <div className="space-y-6">
            {stepHeader}
            <EducationStep 
              education={formData.education}
              onEducationChange={(education) => updateFormData({ education })}
              errors={validationErrors[currentStep] ? 
                validationErrors[currentStep].reduce((acc, error, index) => {
                  // Parse education-specific errors
                  const educationMatch = error.match(/Education (\d+): (.+)/);
                  if (educationMatch) {
                    const educationIndex = parseInt(educationMatch[1]) - 1;
                    const errorType = educationMatch[2];
                    if (errorType.includes('Degree')) {
                      acc[`education.${educationIndex}.degree`] = error;
                    } else if (errorType.includes('School')) {
                      acc[`education.${educationIndex}.school`] = error;
                    } else if (errorType.includes('Year')) {
                      acc[`education.${educationIndex}.year`] = error;
                    }
                  }
                  return acc;
                }, {} as { [key: string]: string }) : {}
              }
            />
          </div>
        );

      case 9: 
        return (
          <div className="space-y-6">
            {stepHeader}
            <ContactStep 
              contact={formData.contact}
              onContactChange={(contact) => updateFormData({ contact })}
              errors={validationErrors[currentStep] ? 
                validationErrors[currentStep].reduce((acc, error, index) => {
                  // Parse contact-specific errors
                  if (error.includes('Email')) {
                    acc['contact.email'] = error;
                  } else if (error.includes('Contact location')) {
                    acc['contact.location'] = error;
                  } else if (error.includes('GitHub')) {
                    acc['contact.social.github'] = error;
                  } else if (error.includes('LinkedIn')) {
                    acc['contact.social.linkedIn'] = error;
                  }
                  return acc;
                }, {} as { [key: string]: string }) : {}
              }
            />
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <FormPreview 
              formData={formData} 
              onEdit={handleEditStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // If showing submission component
  if (showSubmission) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
            <FormSubmission 
              formData={formData}
              onSuccess={handleSubmissionSuccess}
              onRetry={handleSubmissionRetry}
              onGoHome={handleGoHome}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Create Your Portfolio
          </h1>
          <p className="text-gray-400 text-lg">Build your professional portfolio in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300">
                Step {currentStep} of {steps.length}
              </span>
              {steps.find(s => s.id === currentStep)?.required && (
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Required</span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-300">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Steps Navigation - Desktop */}
        <div className="mb-8 hidden lg:block">
          <div className="grid grid-cols-5 gap-3">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep + 1}
                  className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 border ${
                    status === 'current'
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/20'
                      : status === 'completed'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
                      : status === 'error'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-500 hover:bg-gray-700/50 hover:text-gray-400'
                  } ${step.id > currentStep + 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  {/* Status indicator */}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg mb-2 ${
                    status === 'completed'
                      ? 'bg-green-500/20'
                      : status === 'error'
                      ? 'bg-red-500/20'
                      : status === 'current'
                      ? 'bg-blue-500/20'
                      : 'bg-gray-700/50'
                  }`}>
                    {status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : status === 'error' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  
                  <span className="text-xs font-medium text-center leading-tight">{step.name}</span>
                  
                  {step.required && status !== 'completed' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Steps Navigation */}
        <div className="mb-8 lg:hidden">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                  getStepStatus(currentStep) === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : getStepStatus(currentStep) === 'error'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {steps.find(s => s.id === currentStep)?.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">{steps.find(s => s.id === currentStep)?.name}</h3>
                  <p className="text-gray-400 text-sm">Step {currentStep} of {steps.length}</p>
                </div>
              </div>
              <div className="text-blue-400 font-medium">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 && !showSubmission}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 1 && !showSubmission
                ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-700/50'
                : 'bg-gray-700/80 text-white hover:bg-gray-600 border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex space-x-4">
            {currentStep < 10 ? (
              <button
                onClick={nextStep}
                disabled={!isCurrentStepValid()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isCurrentStepValid()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Create Portfolio
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Debug Info (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <details className="text-white">
              <summary className="cursor-pointer font-medium mb-2">Debug Info</summary>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Current Step: {currentStep}</p>
                <p>Show Submission: {showSubmission.toString()}</p>
                <p>Step Valid: {isCurrentStepValid().toString()}</p>
                <p>Form Data Keys: {Object.keys(formData).join(', ')}</p>
                <p>Validation Errors: {JSON.stringify(validationErrors, null, 2)}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}