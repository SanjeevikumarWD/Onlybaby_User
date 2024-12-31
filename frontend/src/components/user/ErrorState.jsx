import React from 'react';

const ErrorState = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
    <div className="text-3xl text-red-500 animate-bounce-slow mb-6 font-medium">{error}</div>
    <button 
      onClick={() => window.location.reload()} 
      className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl hover:from-teal-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
    >
      <span className="relative z-10">Try Again</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  </div>
);


export default ErrorState;