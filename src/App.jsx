import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ThemeProvider } from './context/ThemeContext';

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
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
