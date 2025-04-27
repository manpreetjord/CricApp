import { Link } from 'react-router-dom';

function SearchResults({ matches, players, isVisible, onClose }) {
  if (!isVisible || (matches.length === 0 && players.length === 0)) {
    return null;
  }

  // Helper function to get player ID from name
  const getPlayerId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-30 max-h-96 overflow-y-auto">
      <div className="p-2">
        {matches.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
              Matches
            </h3>
            <ul className="mt-1">
              {matches.map((match) => (
                <li key={match.id}>
                  <Link
                    to={`/scorecard/${match.id}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md transition"
                    onClick={onClose}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{match.team1} vs {match.team2}</span>
                      <span className="text-sm text-gray-500">{match.venue}</span>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                      <span>{match.score1} - {match.score2}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${
                        match.status === 'Live' ? 'bg-red-500' : 'bg-blue-500'
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
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
              Players
            </h3>
            <ul className="mt-1">
              {players.map((player) => (
                <li key={player.id || player.name}>
                  <Link
                    to={`/player/${getPlayerId(player.name)}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md transition"
                    onClick={onClose}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-sm text-gray-500">{player.country}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {player.role}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {matches.length === 0 && players.length === 0 && (
          <div className="px-3 py-4 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults; 