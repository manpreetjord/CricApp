import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLiveMatches } from '../../services/matchService';

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch matches
  const getMatches = () => {
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
    }
  };

  // Initial data fetch
  useEffect(() => {
    getMatches();
  }, []);
  
  // Set up polling for updates
  useEffect(() => {
    const interval = setInterval(() => {
      getMatches();
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Link 
            key={match.id} 
            to={`/scorecard/${match.id}`}
            className="block transition transform hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.venue}</span>
                  <span className="px-2 py-1 bg-red-500 text-xs font-bold rounded-full">{match.status}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-lg">{match.team1}</div>
                  <div className="font-bold text-lg">{match.score1}</div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-lg">{match.team2}</div>
                  <div className="font-bold text-lg">{match.score2}</div>
                </div>
                
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>CRR: {match.runRate1 || "-"}</span>
                    <span>CRR: {match.runRate2 || "-"}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
                Click for detailed scorecard
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {lastUpdated && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
          <button 
            onClick={getMatches}
            className="ml-3 text-blue-600 hover:text-blue-800 underline"
          >
            Refresh now
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveMatches; 