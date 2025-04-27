import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchLiveMatches } from '../../services/matchService';
import LoadingSpinner from '../ui/LoadingSpinner';

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to fetch matches - memoized with useCallback
  const getMatches = useCallback(() => {
    setIsRefreshing(true);
    try {
      // In a real app, this would be an API call
      const matchData = fetchLiveMatches();
      
      // Simulate subtle score changes to show updates
      const updatedMatches = matchData.map(match => {
        // Randomly update scores sometimes
        if (match.status === "Live" && Math.random() > 0.5) {
          // Parse current score
          const score1Parts = match.score1.split(" ")[0].split("/");
          const score2Parts = match.score2.split(" ")[0].split("/");
          
          // For first team (if batting)
          if (score1Parts.length === 2) {
            const runs = parseInt(score1Parts[0]);
            const wickets = parseInt(score1Parts[1]);
            
            // Add 1-6 runs sometimes
            if (Math.random() > 0.7) {
              const newRuns = runs + Math.floor(Math.random() * 6) + 1;
              match.score1 = match.score1.replace(`${runs}/`, `${newRuns}/`);
              // Update run rate
              match.runRate1 = parseFloat((newRuns / 42.3 * 6).toFixed(2));
            }
          }
          
          // For second team (if batting)
          if (score2Parts.length === 2 && match.score2 !== "--") {
            const runs = parseInt(score2Parts[0]);
            const wickets = parseInt(score2Parts[1]);
            
            // Add 1-6 runs sometimes
            if (Math.random() > 0.7) {
              const newRuns = runs + Math.floor(Math.random() * 6) + 1;
              match.score2 = match.score2.replace(`${runs}/`, `${newRuns}/`);
              // Update run rate
              match.runRate2 = parseFloat((newRuns / 21.4 * 6).toFixed(2));
            }
          }
        }
        
        return match;
      });
      
      setMatches(updatedMatches);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    getMatches();
  }, [getMatches]);
  
  // Set up polling for updates
  useEffect(() => {
    // Only poll if there are live matches
    const hasLiveMatches = matches.some(match => match.status === "Live");
    if (!hasLiveMatches) return;
    
    const interval = setInterval(() => {
      getMatches();
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [matches, getMatches]);

  // Manual refresh handler
  const handleRefresh = () => {
    getMatches();
  };

  if (loading) {
    return <LoadingSpinner id="live-matches-loader" />;
  }

  return (
    <div 
      id="live-matches-container" 
      className="live-matches-wrapper"
      aria-live="polite"
      aria-busy={isRefreshing}
    >
      <h2 className="sr-only">Live Cricket Matches</h2>
      <div className="live-matches-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Link 
            key={match.id} 
            to={`/scorecard/${match.id}`}
            className="match-card-link block transition transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id={`match-card-${match.id}`}
            aria-label={`Match between ${match.team1} and ${match.team2}`}
          >
            <div className="match-card bg-white rounded-lg shadow-md overflow-hidden">
              <div className="match-card-header bg-blue-600 text-white p-3">
                <div className="flex justify-between items-center">
                  <span className="match-venue font-medium">{match.venue}</span>
                  <span className="match-status px-2 py-1 bg-red-500 text-xs font-bold rounded-full">{match.status}</span>
                </div>
              </div>
              
              <div className="match-card-body p-4">
                <div className="team-row flex justify-between items-center mb-3">
                  <div className="team-name font-semibold text-lg">{match.team1}</div>
                  <div className="team-score font-bold text-lg">{match.score1}</div>
                </div>
                
                <div className="team-row flex justify-between items-center mb-3">
                  <div className="team-name font-semibold text-lg">{match.team2}</div>
                  <div className="team-score font-bold text-lg">{match.score2}</div>
                </div>
                
                <div className="run-rates-container mt-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="run-rate">CRR: {match.runRate1 || "-"}</span>
                    <span className="run-rate">CRR: {match.runRate2 || "-"}</span>
                  </div>
                </div>
              </div>
              
              <div className="match-card-footer bg-gray-100 px-4 py-2 text-sm text-gray-600">
                Click for detailed scorecard
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {matches.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No live matches currently in progress</p>
        </div>
      )}
      
      {lastUpdated && (
        <div id="last-updated-info" className="last-updated mt-4 text-center text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
          <button 
            id="refresh-button"
            onClick={handleRefresh}
            className="refresh-btn ml-3 text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1"
            aria-label="Refresh match data"
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh now'}
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveMatches; 