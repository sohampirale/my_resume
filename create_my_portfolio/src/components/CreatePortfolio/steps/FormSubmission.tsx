"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  Home, 
  Eye, 
  Share2,
  Copy,
  Loader2,
  Zap,
  Sparkles,
  ArrowRight
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

interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
  portfolioUrl?: string;
  errorCode?: number;
}

interface FormSubmissionProps {
  formData: FormData;
  onSuccess: () => void;
  onRetry: () => void;
  onGoHome: () => void;
}

const FormSubmission: React.FC<FormSubmissionProps> = ({ 
  formData, 
  onSuccess, 
  onRetry, 
  onGoHome 
}) => {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    message: ''
  });
  const [progress, setProgress] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Simulate progress during submission
  useEffect(() => {
    if (submission.status === 'submitting') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [submission.status]);

  const submitPortfolio = async () => {
    setSubmission({ status: 'submitting', message: 'Creating your portfolio...' });
    setProgress(0);

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setProgress(100);
        setSubmission({
          status: 'success',
          message: 'Portfolio created successfully!',
          portfolioUrl: `${window.location.origin}/${formData.slug}`
        });
        onSuccess();
      } else {
        // Handle different error types
        let errorMessage = 'Failed to create portfolio';
        
        switch (response.status) {
          case 400:
            errorMessage = 'Invalid data provided. Please check your entries and try again.';
            break;
          case 401:
            errorMessage = 'Authentication required. Please sign in and try again.';
            break;
          case 409:
            errorMessage = 'A portfolio with this URL already exists. Please choose a different slug.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again in a moment.';
            break;
          default:
            errorMessage = data.message || 'An unexpected error occurred';
        }

        setSubmission({
          status: 'error',
          message: errorMessage,
          errorCode: response.status
        });
      }
    } catch (error) {
      setSubmission({
        status: 'error',
        message: 'Network error. Please check your connection and try again.',
        errorCode: 0
      });
    }
  };

  const copyPortfolioUrl = async () => {
    if (submission.portfolioUrl) {
      try {
        await navigator.clipboard.writeText(submission.portfolioUrl);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = submission.portfolioUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    }
  };

  const getSubmissionSteps = () => [
    { label: 'Validating data', completed: progress > 10 },
    { label: 'Processing content', completed: progress > 30 },
    { label: 'Generating portfolio', completed: progress > 60 },
    { label: 'Finalizing setup', completed: progress > 90 }
  ];

  // Render different states
  if (submission.status === 'idle') {
    return (
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
          <Zap className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Ready to Create Your Portfolio?</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Click the button below to generate your professional portfolio website.
        </p>
        <button
          onClick={submitPortfolio}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Create Portfolio
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    );
  }

  if (submission.status === 'submitting') {
    return (
      <div className="text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white">Creating Your Portfolio</h2>
          <p className="text-gray-400">Please wait while we build your professional website...</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-blue-400 font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Submission Steps */}
        <div className="max-w-sm mx-auto space-y-3">
          {getSubmissionSteps().map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                step.completed 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : 'bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-600 text-gray-400'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                )}
              </div>
              <span className={`text-sm transition-all duration-300 ${
                step.completed ? 'text-green-400' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  if (submission.status === 'success') {
    return (
      <div className="text-center space-y-8">
        {/* Success Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-2xl animate-pulse">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Portfolio Created Successfully! 🎉</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Your professional portfolio is now live and ready to share with the world.
          </p>
        </div>

        {/* Portfolio URL */}
        {submission.portfolioUrl && (
          <div className="max-w-lg mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-green-400" />
                Your Portfolio URL
              </h3>
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <code className="flex-1 text-green-400 font-mono text-sm break-all">
                  {submission.portfolioUrl}
                </code>
                <button
                  onClick={copyPortfolioUrl}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    copiedUrl 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-600/50 text-gray-400 hover:bg-gray-600 hover:text-white'
                  }`}
                  title="Copy URL"
                >
                  {copiedUrl ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedUrl && (
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  URL copied to clipboard!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={submission.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
          >
            <Eye className="w-5 h-5" />
            View Portfolio
          </a>
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
        </div>

        {/* Share Options */}
        <div className="max-w-md mx-auto">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              <h4 className="font-medium text-blue-300">Share Your Portfolio</h4>
            </div>
            <p className="text-blue-200/80 text-sm">
              Share your new portfolio with potential employers, clients, and your network to showcase your skills and experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submission.status === 'error') {
    return (
      <div className="text-center space-y-8">
        {/* Error Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Submission Failed</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            {submission.message}
          </p>
        </div>

        {/* Error Details */}
        <div className="max-w-md mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium text-red-300 mb-2">What happened?</h4>
                <p className="text-red-200/80 text-sm mb-4">{submission.message}</p>
                
                {submission.errorCode && (
                  <div className="text-xs text-red-300/60">
                    Error Code: {submission.errorCode}
                  </div>
                )}

                {/* Specific error guidance */}
                {submission.errorCode === 409 && (
                  <div className="bg-red-500/10 rounded-lg p-3 mt-3">
                    <p className="text-red-200/80 text-xs">
                      💡 Try changing your portfolio slug to something unique, like adding numbers or your name.
                    </p>
                  </div>
                )}

                {submission.errorCode === 401 && (
                  <div className="bg-red-500/10 rounded-lg p-3 mt-3">
                    <p className="text-red-200/80 text-xs">
                      💡 Please make sure you're signed in to your account and try again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={submitPortfolio}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 justify-center"
          >
            Edit Portfolio
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            If the problem persists, please contact support or try again later.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default FormSubmission;