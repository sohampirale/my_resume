"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Standard from '@/components/Portfolios/Standard';
import Aurora from "./Portfolios/Aurora";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-slate-300 text-lg">Loading portfolio...</p>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

// Theme components mapping
const THEME_COMPONENTS = {
  Standard: Standard,
  Aurora: Aurora,
  // Add more themes here as they're created
};

export function Portfolio({ slug }: { slug: string }) {
  const [portfolio, setPortfolio] = useState(null);
  const [userSelectedTheme, setUserSelectedTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPortfolio = useCallback(async () => {
    if (!slug) {
      setError("No portfolio identifier provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching portfolio for slug: ${slug}`);
      
      const { data: response } = await axios.get(`/api/data/${slug}`, {
        timeout: 10000, // 10 second timeout
      });
      
      console.log("Response received:", response);
      
      // Validate response structure
      if (!response?.data) {
        throw new Error("Invalid response format from server");
      }
      
      if (!response.data.owner?.portfolioCategory) {
        throw new Error("Portfolio theme not specified");
      }
      
      const theme = response.data.owner.portfolioCategory;
      
      // Validate theme exists
      if (!THEME_COMPONENTS[theme]) {
        throw new Error(`Unsupported portfolio theme: ${theme}`);
      }
      
      setPortfolio(response.data);
      setUserSelectedTheme(theme);
      
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("Portfolio not found. Please check the URL and try again.");
        } else if (error.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else if (error.code === 'ECONNABORTED') {
          setError("Request timeout. Please check your connection and try again.");
        } else {
          setError(error.response?.data?.message || "Failed to load portfolio. Please try again.");
        }
      } else {
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    console.log('Portfolio component mounted, slug:', slug);
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <ErrorDisplay 
        message={error} 
        onRetry={fetchPortfolio}
      />
    );
  }

  // No theme selected (shouldn't happen if error handling is correct)
  if (!userSelectedTheme || !portfolio) {
    return (
      <ErrorDisplay 
        message="Portfolio data is incomplete" 
        onRetry={fetchPortfolio}
      />
    );
  }

  // Render the appropriate theme component
  const ThemeComponent = THEME_COMPONENTS[userSelectedTheme];
  
  return (
    <div className="portfolio-container">
      <ThemeComponent portfolioData={portfolio} />
    </div>
  );
}