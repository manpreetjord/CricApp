import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function SearchResults({ matches, players, isVisible, onClose }) {
  const resultsRef = useRef(null);

  useEffect(() => {
    if (isVisible && resultsRef.current) {
      resultsRef.current.classList.add('scale-in');
    }
  }, [isVisible]);

  if (!isVisible || (matches.length === 0 && players.length === 0)) {
    return null;
  }

  // Helper function to get player ID from name
  const getPlayerId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div 
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-30 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="p-2">
        {matches.length > 0 && (
          <div className="mb-4 fade-in">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider px-3 py-1 bg-gray-50 dark:bg-gray-700">
              Matches
            </h3>
            <ul className="mt-1">
              {matches.map((match, index) => (
                <li key={match.id} style={{ animationDelay: `${index * 50}ms` }} className="fade-in">
                  <Link
                    to={`/scorecard/${match.id}`}
                    className="block px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-all duration-300 text-gray-800 dark:text-gray-200 transform hover:-translate-y-1 hover:shadow-md"
                    onClick={onClose}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-600 dark:text-blue-400">{match.team1} vs {match.team2}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{match.venue}</span>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{match.score1} - {match.score2}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white font-medium ${
                        match.status === 'Live' ? 'bg-red-600 dark:bg-red-500 pulse' : 'bg-blue-600 dark:bg-blue-500'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {players.length > 0 && (
          <div className="fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider px-3 py-1 bg-gray-50 dark:bg-gray-700">
              Players
            </h3>
            <ul className="mt-1">
              {players.map((player, index) => (
                <li key={player.id || player.name} style={{ animationDelay: `${(index + matches.length) * 50}ms` }} className="fade-in">
                  <Link
                    to={`/player/${getPlayerId(player.name)}`}
                    className="block px-3 py-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-md transition-all duration-300 text-gray-800 dark:text-gray-200 transform hover:-translate-y-1 hover:shadow-md"
                    onClick={onClose}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-green-600 dark:text-green-400">{player.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{player.country}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {player.role}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {matches.length === 0 && players.length === 0 && (
          <div className="px-3 py-4 text-center text-gray-600 dark:text-gray-400 fade-in">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults; 