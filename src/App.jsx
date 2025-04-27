import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
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

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames={{
          enter: 'page-enter',
          enterActive: 'page-enter-active',
          exit: 'page-exit',
          exitActive: 'page-exit-active',
        }}
        unmountOnExit
      >
        <div className="container mx-auto px-4 py-6 dark:text-gray-100">
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
      </CSSTransition>
    </SwitchTransition>
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
