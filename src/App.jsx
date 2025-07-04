import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ThemeProvider } from './context/ThemeContext';

// Import TestSuite for development only
const TestSuite = lazy(() => import('./components/testing/TestSuite'));

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const MatchPage = lazy(() => import('./pages/MatchPage'));
const Scorecard = lazy(() => import('./pages/Scorecard'));
const PlayerStats = lazy(() => import('./pages/PlayerStats'));
const LiveMatch = lazy(() => import('./pages/LiveMatch'));
const ScorecardDetail = lazy(() => import('./components/scorecard/ScorecardDetail'));
const PlayerProfile = lazy(() => import('./components/players/PlayerProfile'));

// Loading fallback
const LoadingFallback = () => <LoadingSpinner size="lg" />;

// Custom hook for page transitions
function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (currentLocation !== location.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentLocation(location.pathname);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, currentLocation]);

  return {
    className: isTransitioning ? 'page-exit-active' : 'page-enter-active',
    style: { 
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
      transition: 'opacity 300ms, transform 300ms'
    }
  };
}

// Animated routes wrapper
const AnimatedRoutes = () => {
  const pageTransition = usePageTransition();
  const location = useLocation();
  
  return (
    <div className="container mx-auto px-4 py-6 dark:text-gray-100 fade-in" {...pageTransition}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/scorecard" element={<Scorecard />} />
        <Route path="/scorecard/:matchId" element={<ScorecardDetail />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/live-match" element={<LiveMatch />} />
        <Route path="/live-match/:id" element={<LiveMatch />} />
        <Route path="/players/:playerId" element={<PlayerProfile />} />
      </Routes>
    </div>
  );
};

function App() {
  // Environment flags
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Ensure dark mode is properly initialized on load
  useEffect(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme class based on preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      console.log("App.jsx: Set dark mode on load");
    } else {
      document.documentElement.classList.remove('dark');
      console.log("App.jsx: Set light mode on load");
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
          
          {/* Test suite for development only */}
          {isDevelopment && (
            <Suspense fallback={null}>
              <TestSuite isEnabled={isDevelopment} />
            </Suspense>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
