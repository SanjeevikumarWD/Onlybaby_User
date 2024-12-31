import React from 'react';

const EmptyState = () => (
  <div className="text-center bg-white p-12 rounded-2xl shadow-xl animate-slide-up relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 transform group-hover:scale-105 transition-transform duration-500"></div>
    <p className="text-2xl text-gray-600 mb-8 relative z-10">You haven't made any purchases yet.</p>
    <button 
      onClick={() => window.location.href = '/shop'}
      className="group relative px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-lg rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
    >
      <span className="relative z-10">Start Shopping</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  </div>
);


export default EmptyState;