import React from 'react';

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
    <div className="relative">
      <div className="shimmer w-72 h-10 rounded-lg mb-6"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-overlay"></div>
    </div>
    <div className="relative">
      <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-6"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 blur-xl animate-pulse"></div>
    </div>
    <div className="text-2xl font-medium bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
      Loading your purchase history...
    </div>
  </div>
);


export default LoadingState;