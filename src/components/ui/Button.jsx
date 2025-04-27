import React from 'react';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md dark:bg-blue-700 dark:hover:bg-blue-800',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-md dark:bg-green-700 dark:hover:bg-green-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md dark:bg-red-700 dark:hover:bg-red-800',
  outline: 'bg-transparent hover:bg-blue-100 text-blue-700 border border-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30'
};

const sizes = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-2 px-6 text-lg',
  xl: 'py-3 px-8 text-xl'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  fullWidth = false,
  disabled = false,
  isLoading = false,
  withRipple = true,
  ...props 
}) => {
  const buttonRef = React.useRef(null);

  const createRipple = (event) => {
    if (!withRipple || disabled || isLoading) return;
    
    const button = buttonRef.current;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripples
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (circle) {
        circle.remove();
      }
    }, 600);
  };

  return (
    <button
      ref={buttonRef}
      onClick={createRipple}
      disabled={disabled || isLoading}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'btn-hover-effect'}
        rounded-md font-medium transition-all duration-300 relative overflow-hidden 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </button>
  );
};

export default Button; 