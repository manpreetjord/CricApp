import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLiveMatches, fetchMatchDetails } from '../services/matchService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function LiveMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // If ID is provided, load specific match
        if (id) {
          const matchData = fetchMatchDetails(parseInt(id));
          setMatch(matchData);
        } else {
          // Otherwise load all matches
          const matchesData = fetchLiveMatches();
          setMatches(matchesData);
          
          // If matches are available, set the first one as active
          if (matchesData && matchesData.length > 0) {
            const firstMatch = fetchMatchDetails(matchesData[0].id);
            setMatch(firstMatch);
          }
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
    return <LoadingSpinner id="live-match-loader" aria-label="Loading match details" />;
  }

  if (!match) {
    return (
      <div id="match-not-found" className="match-error bg-white rounded-lg shadow-md p-6" role="alert">
        <p className="text-center text-gray-600">No live matches available at the moment</p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div id="live-match" className="live-match-container" role="main">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {match.team1} vs {match.team2} - Live Match
      </h1>
      
      {!id && matches.length > 1 && (
        <div className="match-selector mb-6">
          <h2 className="text-lg font-medium mb-2">Select Match:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((m) => (
              <Link 
                key={m.id}
                to={`/live-match/${m.id}`}
                className={`block p-3 rounded-md border ${m.id === match.id ? 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="font-medium">{m.team1} vs {m.team2}</div>
                <div className="text-sm text-gray-500">{m.venue}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">{match.venue}</div>
          <div className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            {match.status}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{match.team1}</h2>
            <p className="text-3xl font-bold text-blue-800">{match.score1}</p>
            <p className="text-sm text-gray-600">Run Rate: {match.runRate1 || "-"}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{match.team2}</h2>
            <p className="text-3xl font-bold text-green-800">{match.score2}</p>
            <p className="text-sm text-gray-600">Run Rate: {match.runRate2 || "-"}</p>
          </div>
        </div>
        
        <div className="text-center my-4">
          <Link to={`/scorecard/${match.id}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
            View Full Scorecard
          </Link>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default LiveMatch; 