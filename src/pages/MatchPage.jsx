import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLiveMatches, fetchMatchDetails } from '../services/matchService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function MatchPage() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableMatches, setAvailableMatches] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Get all available matches
        const allMatches = fetchLiveMatches();
        setAvailableMatches(allMatches);
        
        // If ID is provided, load specific match
        if (id) {
          const matchData = fetchMatchDetails(parseInt(id));
          setMatch(matchData);
        } else if (allMatches.length > 0) {
          // If no ID but matches are available, show the first match
          const firstMatchData = fetchMatchDetails(allMatches[0].id);
          setMatch(firstMatchData);
        }
      } catch (error) {
        console.error("Error loading match data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner id="match-page-loader" aria-label="Loading match details" />;
  }

  if (!match) {
    return (
      <div id="no-matches" className="bg-white rounded-lg shadow-md p-6" role="alert">
        <p className="text-center text-gray-600">No matches available</p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div id="match-page" className="match-container">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Match Details</h1>
      
      {/* Match selector if no specific ID was provided */}
      {!id && availableMatches.length > 1 && (
        <div className="match-selector mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-3">Select a Match:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableMatches.map((m) => (
              <Link 
                key={m.id}
                to={`/match/${m.id}`}
                className={`block p-3 rounded-md border transition ${
                  match.id === m.id 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{m.team1} vs {m.team2}</div>
                <div className="text-sm text-gray-500">{m.venue}</div>
                <div className="mt-1 text-xs">
                  <span 
                    className={`px-2 py-0.5 rounded-full ${
                      m.status === 'Live' ? 'bg-red-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Match details */}
      <div className="match-details bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{match.team1} vs {match.team2}</h2>
          <div 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              match.status === 'Live' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            {match.status}
          </div>
        </div>
        
        <div className="match-info mb-6">
          <p className="text-gray-600"><strong>Venue:</strong> {match.venue}</p>
          <p className="text-gray-600"><strong>Date:</strong> {match.date}</p>
        </div>
        
        <div className="scores grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="team-score p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{match.team1}</h3>
            <p className="text-2xl font-bold">{match.score1}</p>
            <p className="text-sm text-gray-500">Run Rate: {match.runRate1 || "-"}</p>
          </div>
          
          <div className="team-score p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{match.team2}</h3>
            <p className="text-2xl font-bold">{match.score2}</p>
            <p className="text-sm text-gray-500">Run Rate: {match.runRate2 || "-"}</p>
          </div>
        </div>
        
        <div className="actions flex justify-center space-x-4">
          <Link 
            to={`/scorecard/${match.id}`} 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            View Scorecard
          </Link>
          
          <Link 
            to={`/live-match/${match.id}`} 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Live Updates
          </Link>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default MatchPage; 