import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMatchDetails } from '../../services/matchService';
import MatchHeader from '../matches/MatchHeader';
import PlayerMatchup from '../players/PlayerMatchup';
import LoadingSpinner from '../ui/LoadingSpinner';
import MatchStats from './MatchStats';
import MatchTimeline from './MatchTimeline';

function ScorecardDetail() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('batting1');
  const [selectedBatsman, setSelectedBatsman] = useState(null);
  const [selectedBowler, setSelectedBowler] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const { matchId } = useParams();

  useEffect(() => {
    const getMatchDetails = async () => {
      try {
        // In a real app, this would be an actual API call
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
    
    // Set up polling for live updates at 5 second intervals for better real-time experience
    const interval = setInterval(() => {
      if (match && match.status === "Live") {
        getMatchDetails();
        console.log("Updated match data");
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [matchId]);

  // Handle keyboard navigation for selecting batsman and bowler
  const handleKeyDown = (e, action, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (action === 'batsman') {
        handleBatsmanClick(name);
      } else if (action === 'bowler') {
        handleBowlerClick(name);
      }
    }
  };

  const handleBatsmanClick = (name) => {
    setSelectedBatsman(name);
  };

  const handleBowlerClick = (name) => {
    setSelectedBowler(name);
  };

  const toggleStats = () => {
    setShowStats(!showStats);
  };

  // Auto show stats for live matches
  useEffect(() => {
    if (match && match.status === "Live") {
      setShowStats(true);
    }
  }, [match]);

  if (loading) {
    return <LoadingSpinner id="scorecard-loader" aria-label="Loading match details" />;
  }

  if (!match) {
    return (
      <div id="match-not-found" className="match-error bg-white rounded-lg shadow-md p-6" role="alert">
        <p className="text-center text-gray-600">Match not found</p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Get player ID for profile links (convert name to slug)
  const getPlayerId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Consistent player URL path
  const PLAYER_URL_PATH = '/players/';

  return (
    <div id="scorecard-detail" className="scorecard-container max-w-6xl mx-auto fade-in" role="main" aria-labelledby="scorecard-title">
      <h1 id="scorecard-title" className="sr-only">Match Scorecard: {match.team1} vs {match.team2}</h1>
      <MatchHeader match={match} />

      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleStats} 
          className={`inline-flex items-center px-4 py-2 ${showStats ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-300 btn-hover-effect`}
          aria-expanded={showStats}
          aria-controls="match-statistics"
        >
          {showStats ? "Hide Advanced Stats" : "Show Advanced Stats"}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ml-2 transform transition-transform ${showStats ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div 
        id="match-statistics" 
        className={`transition-all duration-500 overflow-hidden ${showStats ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <MatchStats match={match} />
        <MatchTimeline match={match} />
      </div>

      {selectedBatsman && selectedBowler && (
        <PlayerMatchup 
          batsman={selectedBatsman} 
          bowler={selectedBowler}
          id="player-matchup"
          className="matchup-section mb-6" 
        />
      )}
      
      <div className="scorecard-detail-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 transition-colors duration-300">
        <div className="scorecard-content p-4">
          <div className="match-summary flex justify-between items-center mb-4">
            <div className="team-score">
              <p className="team-name font-semibold text-lg dark:text-gray-200">{match.team1}</p>
              <p className="team-runs text-xl font-bold dark:text-white">{match.score1}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                RR: {(parseFloat(match.score1.match(/\((.*?) ov/)?.[1] || "0") > 0) ? 
                  (parseInt(match.score1.split('/')[0], 10) / parseFloat(match.score1.match(/\((.*?) ov/)[1])).toFixed(2) : 
                  "0.00"
                }
              </p>
            </div>
            <div className="team-score text-right">
              <p className="team-name font-semibold text-lg dark:text-gray-200">{match.team2}</p>
              <p className="team-runs text-xl font-bold dark:text-white">{match.score2}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                RR: {(parseFloat(match.score2.match(/\((.*?) ov/)?.[1] || "0") > 0) ? 
                  (parseInt(match.score2.split('/')[0], 10) / parseFloat(match.score2.match(/\((.*?) ov/)[1])).toFixed(2) : 
                  "0.00"
                }
              </p>
            </div>
          </div>

          <div className="scorecard-tabs border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto" role="tablist">
            <div className="flex whitespace-nowrap">
              <button 
                id="batting1-tab"
                onClick={() => setActiveTab('batting1')} 
                className={`tab-button px-4 py-2 font-medium ${activeTab === 'batting1' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                role="tab"
                aria-selected={activeTab === 'batting1'}
                aria-controls="batting1-content"
              >
                {match.batting[0].team} Batting
              </button>
              <button 
                id="bowling2-tab"
                onClick={() => setActiveTab('bowling2')} 
                className={`tab-button px-4 py-2 font-medium ${activeTab === 'bowling2' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                role="tab"
                aria-selected={activeTab === 'bowling2'}
                aria-controls="bowling2-content"
              >
                {match.bowling[1].team} Bowling
              </button>
              <button 
                id="batting2-tab"
                onClick={() => setActiveTab('batting2')} 
                className={`tab-button px-4 py-2 font-medium ${activeTab === 'batting2' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                role="tab"
                aria-selected={activeTab === 'batting2'}
                aria-controls="batting2-content"
              >
                {match.batting[1].team} Batting
              </button>
              <button 
                id="bowling1-tab"
                onClick={() => setActiveTab('bowling1')} 
                className={`tab-button px-4 py-2 font-medium ${activeTab === 'bowling1' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                role="tab"
                aria-selected={activeTab === 'bowling1'}
                aria-controls="bowling1-content"
              >
                {match.bowling[0].team} Bowling
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div id="tab-content" className="tab-content">
            {activeTab === 'batting1' && (
              <div id="batting1-content" className="batting-table" role="tabpanel" aria-labelledby="batting1-tab">
                <div className="overflow-x-auto">
                  <table className="min-w-full dark:bg-gray-800">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="py-2 px-3 text-left dark:text-gray-200" scope="col">Batsman</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200" scope="col">R</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200" scope="col">B</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200" scope="col">4s</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200" scope="col">6s</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200" scope="col">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.batting[0].players.map((player, index) => (
                        <tr 
                          key={index} 
                          id={`batsman-${getPlayerId(player.name)}`}
                          className="batsman-row border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-600/10 cursor-pointer transition-colors duration-200" 
                          onClick={() => handleBatsmanClick(player.name)}
                          onKeyDown={(e) => handleKeyDown(e, 'batsman', player.name)}
                          tabIndex="0"
                          role="button"
                          aria-pressed={selectedBatsman === player.name}
                          aria-label={`Select ${player.name} as batsman for matchup`}
                        >
                          <td className="py-2 px-3">
                            <div>
                              <Link 
                                to={`${PLAYER_URL_PATH}${getPlayerId(player.name)}`}
                                className="player-link text-blue-600 dark:text-blue-400 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {player.name}
                              </Link>
                            </div>
                            <div className="player-status text-xs text-gray-500 dark:text-gray-400">{player.status}</div>
                          </td>
                          <td className="player-runs py-2 px-3 text-right font-medium dark:text-gray-200">{player.runs}</td>
                          <td className="player-balls py-2 px-3 text-right dark:text-gray-300">{player.balls}</td>
                          <td className="player-fours py-2 px-3 text-right dark:text-gray-300">{player.fours}</td>
                          <td className="player-sixes py-2 px-3 text-right dark:text-gray-300">{player.sixes}</td>
                          <td className="player-sr py-2 px-3 text-right dark:text-gray-300">{player.strikeRate}</td>
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
                  <table className="min-w-full dark:bg-gray-800">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="py-2 px-3 text-left dark:text-gray-200">Bowler</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">O</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">M</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">R</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">W</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.bowling[1].players.map((player, index) => (
                        <tr 
                          key={index} 
                          className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-600/10 cursor-pointer transition-colors duration-200" 
                          onClick={() => handleBowlerClick(player.name)}
                          onKeyDown={(e) => handleKeyDown(e, 'bowler', player.name)}
                          tabIndex="0"
                          role="button"
                          aria-pressed={selectedBowler === player.name}
                          aria-label={`Select ${player.name} as bowler for matchup`}
                        >
                          <td className="py-2 px-3">
                            <Link 
                              to={`${PLAYER_URL_PATH}${getPlayerId(player.name)}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {player.name}
                            </Link>
                          </td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.overs}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.maidens}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.runs}</td>
                          <td className="py-2 px-3 text-right font-medium dark:text-gray-200">{player.wickets}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.economy}</td>
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
                  <table className="min-w-full dark:bg-gray-800">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="py-2 px-3 text-left dark:text-gray-200">Batsman</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">R</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">B</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">4s</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">6s</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.batting[1].players.map((player, index) => (
                        <tr 
                          key={index} 
                          className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-600/10 cursor-pointer transition-colors duration-200" 
                          onClick={() => handleBatsmanClick(player.name)}
                          onKeyDown={(e) => handleKeyDown(e, 'batsman', player.name)}
                          tabIndex="0"
                          role="button"
                          aria-pressed={selectedBatsman === player.name}
                          aria-label={`Select ${player.name} as batsman for matchup`}
                        >
                          <td className="py-2 px-3">
                            <div>
                              <Link 
                                to={`${PLAYER_URL_PATH}${getPlayerId(player.name)}`}
                                className="player-link text-blue-600 dark:text-blue-400 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {player.name}
                              </Link>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{player.status}</div>
                          </td>
                          <td className="py-2 px-3 text-right font-medium dark:text-gray-200">{player.runs}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.balls}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.fours}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.sixes}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.strikeRate}</td>
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
                  <table className="min-w-full dark:bg-gray-800">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="py-2 px-3 text-left dark:text-gray-200">Bowler</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">O</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">M</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">R</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">W</th>
                        <th className="py-2 px-3 text-right dark:text-gray-200">Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.bowling[0].players.map((player, index) => (
                        <tr 
                          key={index} 
                          className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-600/10 cursor-pointer transition-colors duration-200" 
                          onClick={() => handleBowlerClick(player.name)}
                          onKeyDown={(e) => handleKeyDown(e, 'bowler', player.name)}
                          tabIndex="0"
                          role="button"
                          aria-pressed={selectedBowler === player.name}
                          aria-label={`Select ${player.name} as bowler for matchup`}
                        >
                          <td className="py-2 px-3">
                            <Link 
                              to={`${PLAYER_URL_PATH}${getPlayerId(player.name)}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {player.name}
                            </Link>
                          </td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.overs}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.maidens}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.runs}</td>
                          <td className="py-2 px-3 text-right font-medium dark:text-gray-200">{player.wickets}</td>
                          <td className="py-2 px-3 text-right dark:text-gray-300">{player.economy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {match.recentOvers && (
            <div id="recent-overs" className="recent-overs mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="recent-overs-title font-medium text-lg mb-3 text-blue-700 dark:text-blue-400">Recent Overs</h3>
              <div className="recent-overs-list space-y-3">
                {match.recentOvers.map((over, index) => (
                  <div key={index} id={`over-${over.over}`} className="over-row flex items-center overflow-x-auto pb-2">
                    <div className="over-number bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full min-w-10 w-10 h-10 flex items-center justify-center font-medium mr-3">
                      {over.over}
                    </div>
                    <div className="over-runs flex space-x-2">
                      {over.runs.map((run, idx) => {
                        // Calculate dynamic classes for different runs
                        const isWicket = run === "W";
                        const isBoundary = run === 4 || run === 6;
                        const isDot = run === 0;
                        let bgColorClass = "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
                        
                        if (isWicket) {
                          bgColorClass = "bg-red-500 text-white animate-pulse";
                        } else if (run === 6) {
                          bgColorClass = "bg-purple-500 text-white";
                        } else if (run === 4) {
                          bgColorClass = "bg-blue-500 text-white";
                        } else if (isDot) {
                          bgColorClass = "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300";
                        } else if (run === 1) {
                          bgColorClass = "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
                        } else if (run === 2 || run === 3) {
                          bgColorClass = "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200";
                        }
                        
                        return (
                          <div 
                            key={idx} 
                            className={`run-ball min-w-8 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm shadow-sm transform hover:scale-110 transition-transform ${bgColorClass}`}
                            aria-label={isWicket ? "Wicket" : `${run} run${run !== 1 ? "s" : ""}`}
                          >
                            {run}
                          </div>
                        );
                      })}
                    </div>
                    <div className="over-summary ml-auto pl-3 text-sm text-gray-500 dark:text-gray-400">
                      {over.runs.reduce((sum, run) => sum + (run === "W" ? 0 : run), 0)} runs
                      {over.runs.includes("W") && ", 1 wicket"}
                    </div>
                  </div>
                ))}
              </div>
              {match.status === "Live" && (
                <div className="text-center mt-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Live updates every 5 seconds</span>
                </div>
              )}
            </div>
          )}

          <div id="matchup-info" className="matchup-info mt-6 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-center">
            <div>Select any batsman and bowler to see their matchup stats</div>
            <div className="selected-players mt-2 sm:mt-0">
              <span className="font-medium text-gray-700 dark:text-gray-300">Selected: </span>
              {selectedBatsman} vs {selectedBowler}
            </div>
          </div>
        </div>
      </div>
      
      {match.status === "Live" && (
        <div className="live-match-indicator fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center animate-pulse">
          <span className="inline-block w-3 h-3 bg-white rounded-full mr-2"></span>
          Live
        </div>
      )}
      
      <div className="back-link text-center mb-6">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ScorecardDetail; 