import Search from '../search/Search';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    // Track if page is scrolled for header styling
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Header component isDarkMode:", isDarkMode);
  }, [isDarkMode]);

  return (
    <header 
      className={`bg-blue-700 dark:bg-gray-800 text-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* For debugging, show current theme */}
      <div className="hidden">
        Current theme: {isDarkMode ? 'dark' : 'light'}
      </div>
      
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold hover:text-blue-200 dark:hover:text-blue-300 focus:outline-none focus:text-blue-200 transition-all duration-300 transform hover:scale-105"
          >
            CricApp
          </Link>
          
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-auto md:flex-1 max-w-xl px-2">
          <Search />
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-200 dark:hover:text-blue-300 font-medium focus:outline-none focus:text-blue-200 py-1 px-2 transition-all duration-300 border-b-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400"
              >
                Matches
              </Link>
            </li>
            <li>
              <Link 
                to="/scorecard" 
                className="hover:text-blue-200 dark:hover:text-blue-300 font-medium focus:outline-none focus:text-blue-200 py-1 px-2 transition-all duration-300 border-b-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400"
              >
                Scorecard
              </Link>
            </li>
            <li>
              <Link 
                to="/player-stats" 
                className="hover:text-blue-200 dark:hover:text-blue-300 font-medium focus:outline-none focus:text-blue-200 py-1 px-2 transition-all duration-300 border-b-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400"
              >
                Players
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden dark:bg-gray-900 bg-blue-800 shadow-inner transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className={`space-y-3 py-2 px-4 ${mobileMenuOpen ? 'fade-in-up' : ''}`}>
          <li>
            <Link 
              to="/" 
              className="block py-2 px-2 hover:bg-blue-700 dark:hover:bg-gray-700 rounded font-medium transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Matches
            </Link>
          </li>
          <li>
            <Link 
              to="/scorecard" 
              className="block py-2 px-2 hover:bg-blue-700 dark:hover:bg-gray-700 rounded font-medium transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Scorecard
            </Link>
          </li>
          <li>
            <Link 
              to="/player-stats" 
              className="block py-2 px-2 hover:bg-blue-700 dark:hover:bg-gray-700 rounded font-medium transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Players
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header; 