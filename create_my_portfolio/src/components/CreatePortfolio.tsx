"use client";

import { useState } from "react";

export default function CreatePortfolio() {
  // Form steps configuration
  const steps = [
    { id: 1, name: "Basic Info", icon: "👤" },
    { id: 2, name: "Social Links", icon: "🔗" },
    { id: 3, name: "About", icon: "📝" },
    { id: 4, name: "Skills", icon: "🎯" },
    { id: 5, name: "Stats", icon: "📊" },
    { id: 6, name: "Projects", icon: "💼" },
    { id: 7, name: "Experience", icon: "🏢" },
    { id: 8, name: "Education", icon: "🎓" },
    { id: 9, name: "Contact", icon: "📞" },
    { id: 10, name: "Preview", icon: "👁️" }
  ];

  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state matching the schema
  const [formData, setFormData] = useState({
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
  const [stepValidation, setStepValidation] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false,
    6: false, 7: false, 8: false, 9: false
  });

  // Update form data
  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  // Validate current step
  const validateCurrentStep = () => {
    // This will be implemented when we create individual step components
    switch (currentStep) {
      case 1: // Basic Info
        return formData.name && formData.slug && formData.location;
      case 2: // Social Links
        return true; // Optional step
      case 3: // About
        return formData.about.trim().length > 0;
      case 9: // Contact
        return formData.contact.email && formData.contact.location;
      default:
        return true; // Other steps are optional or will be validated later
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      setStepValidation(prev => ({ ...prev, [currentStep]: true }));
      setCurrentStep(prev => prev + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Go to specific step
  const goToStep = (stepNumber) => {
    if (stepNumber <= currentStep || stepValidation[stepNumber - 1]) {
      setCurrentStep(stepNumber);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
            <p className="text-gray-400 mb-8">Let's start with your basic details</p>
            {/* BasicInfoStep component will go here */}
            <div className="text-center text-gray-400 py-8">
              BasicInfoStep component will be implemented next
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Social Links</h2>
            <p className="text-gray-400 mb-8">Add your social media profiles</p>
            <div className="text-center text-gray-400 py-8">
              SocialLinksStep component will be implemented next
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Preview & Submit</h2>
            <p className="text-gray-400 mb-8">Review your portfolio data before submitting</p>
            <div className="text-center text-gray-400 py-8">
              FormPreview component will be implemented
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">{steps[currentStep - 1]?.name}</h2>
            <div className="text-center text-gray-400 py-8">
              {steps[currentStep - 1]?.name} component will be implemented
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Create Your Portfolio</h1>
          <p className="text-gray-400 text-lg">Build your professional portfolio in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-300">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-300">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="mb-8 hidden lg:block">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep && !stepValidation[step.id - 1]}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : stepValidation[step.id] || step.id < currentStep
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="text-2xl mb-1">{step.icon}</span>
                <span className="text-xs font-medium text-center">{step.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Steps Navigation */}
        <div className="mb-8 lg:hidden">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{steps[currentStep - 1]?.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{steps[currentStep - 1]?.name}</h3>
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
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            ← Previous
          </button>

          <div className="flex space-x-4">
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  validateCurrentStep()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => {/* Submit logic will be implemented */}}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Portfolio'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-white font-medium mb-2">Debug Info:</h4>
          <p className="text-gray-400 text-sm">Current Step: {currentStep}</p>
          <p className="text-gray-400 text-sm">Form Data Keys: {Object.keys(formData).join(', ')}</p>
          <p className="text-gray-400 text-sm">Validation: {JSON.stringify(stepValidation)}</p>
        </div>
      </div>
    </div>
  );
}