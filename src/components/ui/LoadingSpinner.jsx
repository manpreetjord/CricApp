import React from 'react';

function LoadingSpinner({ id, size = 'md', color = 'blue' }) {
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-b-2',
    lg: 'h-16 w-16 border-b-3'
  };
  
  // Color classes
  const colorClasses = {
    blue: 'border-blue-700',
    green: 'border-green-600',
    red: 'border-red-600',
    gray: 'border-gray-600'
  };
  
  return (
    <div 
      id={id} 
      className="flex justify-center items-center py-8" 
      role="status"
      aria-live="polite"
    >
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`} 
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}

export default LoadingSpinner; 