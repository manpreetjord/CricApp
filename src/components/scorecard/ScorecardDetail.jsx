import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMatchDetails } from '../../services/matchService';
import MatchHeader from '../matches/MatchHeader';
import PlayerMatchup from '../players/PlayerMatchup';

function ScorecardDetail() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('batting1');
  const [selectedBatsman, setSelectedBatsman] = useState(null);
  const [selectedBowler, setSelectedBowler] = useState(null);
  const { matchId } = useParams();

  useEffect(() => {
    const getMatchDetails = () => {
      try {
        const matchData = fetchMatchDetails(parseInt(matchId));
        setMatch(matchData);
        
        // Set default batsman and bowler for matchup
        if (matchData) {
          setSelectedBatsman(matchData.batting[0].players[0]?.name || null);
          setSelectedBowler(matchData.bowling[0].players[0]?.name || null);
        }
      } catch (error) {
        console.error("Error fetching match details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMatchDetails();
    
    // Set up polling for live updates
    const interval = setInterval(() => {
      if (match && match.status === "Live") {
        getMatchDetails();
      }
    }, 30000); // Update every 30 seconds for live matches
    
    return () => clearInterval(interval);
  }, [matchId]);

  const handleBatsmanClick = (name) => {
    setSelectedBatsman(name);
  };

  const handleBowlerClick = (name) => {
    setSelectedBowler(name);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-600">Match not found</p>
      </div>
    );
  }

  // Get player ID for profile links (convert name to slug)
  const getPlayerId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <MatchHeader match={match} />

      {selectedBatsman && selectedBowler && (
        <PlayerMatchup batsman={selectedBatsman} bowler={selectedBowler} />
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold text-lg">{match.team1}</p>
              <p className="text-xl font-bold">{match.score1}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{match.team2}</p>
              <p className="text-xl font-bold">{match.score2}</p>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-4 overflow-x-auto">
            <div className="flex whitespace-nowrap">
              <button 
                onClick={() => setActiveTab('batting1')} 
                className={`px-4 py-2 font-medium ${activeTab === 'batting1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                {match.batting[0].team} Batting
              </button>
              <button 
                onClick={() => setActiveTab('bowling2')} 
                className={`px-4 py-2 font-medium ${activeTab === 'bowling2' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                {match.bowling[1].team} Bowling
              </button>
              <button 
                onClick={() => setActiveTab('batting2')} 
                className={`px-4 py-2 font-medium ${activeTab === 'batting2' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                {match.batting[1].team} Batting
              </button>
              <button 
                onClick={() => setActiveTab('bowling1')} 
                className={`px-4 py-2 font-medium ${activeTab === 'bowling1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                {match.bowling[0].team} Bowling
              </button>
            </div>
          </div>

          {activeTab === 'batting1' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Batsman</th>
                      <th className="py-2 px-3 text-right">R</th>
                      <th className="py-2 px-3 text-right">B</th>
                      <th className="py-2 px-3 text-right">4s</th>
                      <th className="py-2 px-3 text-right">6s</th>
                      <th className="py-2 px-3 text-right">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.batting[0].players.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50 cursor-pointer" onClick={() => handleBatsmanClick(player.name)}>
                        <td className="py-2 px-3">
                          <div>
                            <Link 
                              to={`/player/${getPlayerId(player.name)}`}
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {player.name}
                            </Link>
                          </div>
                          <div className="text-xs text-gray-500">{player.status}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-medium">{player.runs}</td>
                        <td className="py-2 px-3 text-right">{player.balls}</td>
                        <td className="py-2 px-3 text-right">{player.fours}</td>
                        <td className="py-2 px-3 text-right">{player.sixes}</td>
                        <td className="py-2 px-3 text-right">{player.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bowling2' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Bowler</th>
                      <th className="py-2 px-3 text-right">O</th>
                      <th className="py-2 px-3 text-right">M</th>
                      <th className="py-2 px-3 text-right">R</th>
                      <th className="py-2 px-3 text-right">W</th>
                      <th className="py-2 px-3 text-right">Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.bowling[1].players.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50 cursor-pointer" onClick={() => handleBowlerClick(player.name)}>
                        <td className="py-2 px-3">
                          <Link 
                            to={`/player/${getPlayerId(player.name)}`}
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-2 px-3 text-right">{player.overs}</td>
                        <td className="py-2 px-3 text-right">{player.maidens}</td>
                        <td className="py-2 px-3 text-right">{player.runs}</td>
                        <td className="py-2 px-3 text-right font-medium">{player.wickets}</td>
                        <td className="py-2 px-3 text-right">{player.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'batting2' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Batsman</th>
                      <th className="py-2 px-3 text-right">R</th>
                      <th className="py-2 px-3 text-right">B</th>
                      <th className="py-2 px-3 text-right">4s</th>
                      <th className="py-2 px-3 text-right">6s</th>
                      <th className="py-2 px-3 text-right">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.batting[1].players.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50 cursor-pointer" onClick={() => handleBatsmanClick(player.name)}>
                        <td className="py-2 px-3">
                          <div>
                            <Link 
                              to={`/player/${getPlayerId(player.name)}`}
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {player.name}
                            </Link>
                          </div>
                          <div className="text-xs text-gray-500">{player.status}</div>
                        </td>
                        <td className="py-2 px-3 text-right font-medium">{player.runs}</td>
                        <td className="py-2 px-3 text-right">{player.balls}</td>
                        <td className="py-2 px-3 text-right">{player.fours}</td>
                        <td className="py-2 px-3 text-right">{player.sixes}</td>
                        <td className="py-2 px-3 text-right">{player.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bowling1' && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Bowler</th>
                      <th className="py-2 px-3 text-right">O</th>
                      <th className="py-2 px-3 text-right">M</th>
                      <th className="py-2 px-3 text-right">R</th>
                      <th className="py-2 px-3 text-right">W</th>
                      <th className="py-2 px-3 text-right">Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.bowling[0].players.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50 cursor-pointer" onClick={() => handleBowlerClick(player.name)}>
                        <td className="py-2 px-3">
                          <Link 
                            to={`/player/${getPlayerId(player.name)}`}
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-2 px-3 text-right">{player.overs}</td>
                        <td className="py-2 px-3 text-right">{player.maidens}</td>
                        <td className="py-2 px-3 text-right">{player.runs}</td>
                        <td className="py-2 px-3 text-right font-medium">{player.wickets}</td>
                        <td className="py-2 px-3 text-right">{player.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {match.recentOvers && (
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-2">Recent Overs</h3>
              <div className="space-y-2 md:space-y-3">
                {match.recentOvers.map((over, index) => (
                  <div key={index} className="flex items-center overflow-x-auto pb-2">
                    <div className="bg-gray-200 rounded-full min-w-8 w-8 h-8 flex items-center justify-center font-medium mr-3">
                      {over.over}
                    </div>
                    <div className="flex space-x-2">
                      {over.runs.map((run, idx) => (
                        <div key={idx} className={`min-w-7 w-7 h-7 rounded-full flex items-center justify-center font-medium text-sm ${
                          run === "W" ? "bg-red-500 text-white" : 
                          run === 4 ? "bg-blue-500 text-white" :
                          run === 6 ? "bg-purple-500 text-white" :
                          "bg-gray-100"
                        }`}>
                          {run}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center">
            <div>Select any batsman and bowler to see their matchup stats</div>
            <div className="mt-2 sm:mt-0">
              <span className="font-medium text-gray-700">Selected: </span>
              {selectedBatsman} vs {selectedBowler}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScorecardDetail; 