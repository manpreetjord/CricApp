import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  fadeIn = false,
  animationDelay = 0,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700
        ${hoverEffect ? 'card-hover' : 'transition-all duration-300'}
        ${fadeIn ? 'fade-in' : ''}
        ${className}
      `}
      style={fadeIn && animationDelay ? { animationDelay: `${animationDelay}ms` } : {}}
      {...props}
    >
      {children}
    </div>
  );
};

// Card subcomponents for semantic structure
Card.Header = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Body = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Footer = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 