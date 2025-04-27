import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PlayerProfile() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch player data
    const fetchPlayerData = () => {
      // Mock player data
      const playerData = {
        "virat-kohli": {
          id: "virat-kohli",
          name: "Virat Kohli",
          country: "India",
          role: "Batsman",
          birthDate: "November 5, 1988",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm medium",
          stats: {
            matches: 269,
            innings: 261,
            runs: 12883,
            average: 57.50,
            strikeRate: 93.62,
            hundreds: 45,
            fifties: 66,
            highestScore: 183,
            wickets: 4,
            bowlingAverage: 166.25,
            economy: 6.22,
          },
          recentForm: [82, 51, 63, 0, 116],
          currentMatchStats: {
            innings: 1,
            runs: 82,
            balls: 78,
            fours: 7,
            sixes: 3,
            strikeRate: 105.13,
          }
        },
        "rohit-sharma": {
          id: "rohit-sharma",
          name: "Rohit Sharma",
          country: "India",
          role: "Batsman / Captain",
          birthDate: "April 30, 1987",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm off break",
          stats: {
            matches: 241,
            innings: 239,
            runs: 9825,
            average: 48.64,
            strikeRate: 90.02,
            hundreds: 30,
            fifties: 48,
            highestScore: 264,
            wickets: 9,
            bowlingAverage: 120.33,
            economy: 5.34,
          },
          recentForm: [78, 34, 101, 42, 12],
          currentMatchStats: {
            innings: 1,
            runs: 78,
            balls: 64,
            fours: 8,
            sixes: 2,
            strikeRate: 121.88,
          }
        },
        "jasprit-bumrah": {
          id: "jasprit-bumrah",
          name: "Jasprit Bumrah",
          country: "India",
          role: "Bowler",
          birthDate: "December 6, 1993",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
          stats: {
            matches: 72,
            innings: 38,
            runs: 195,
            average: 6.50,
            strikeRate: 52.70,
            highestScore: 28,
            wickets: 121,
            bowlingAverage: 24.30,
            economy: 4.63,
            fiveWickets: 2,
          },
          recentForm: [2, 3, 1, 4, 3], // wickets in last 5 matches
          currentMatchStats: {
            overs: 10,
            maidens: 1,
            runs: 42,
            wickets: 3,
            economy: 4.20,
          }
        }
      };
      
      setTimeout(() => {
        setPlayer(playerData[playerId] || null);
        setLoading(false);
      }, 500); // Simulated delay
    };
    
    fetchPlayerData();
  }, [playerId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (!player) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-600">Player not found</p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{player.name}</h1>
              <div className="flex items-center mt-2">
                <span className="bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full text-sm">{player.country}</span>
                <span className="ml-2 bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full text-sm">{player.role}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-blue-100">Born: {player.birthDate}</p>
              <p className="text-blue-100">Batting: {player.battingStyle}</p>
              <p className="text-blue-100">Bowling: {player.bowlingStyle}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Career Statistics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Matches</div>
              <div className="text-xl font-bold">{player.stats.matches}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Runs</div>
              <div className="text-xl font-bold">{player.stats.runs}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Average</div>
              <div className="text-xl font-bold">{player.stats.average}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Strike Rate</div>
              <div className="text-xl font-bold">{player.stats.strikeRate}</div>
            </div>
          </div>
          
          {player.stats.hundreds !== undefined && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">100s</div>
                <div className="text-xl font-bold">{player.stats.hundreds || 0}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">50s</div>
                <div className="text-xl font-bold">{player.stats.fifties || 0}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Highest Score</div>
                <div className="text-xl font-bold">{player.stats.highestScore || 0}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Wickets</div>
                <div className="text-xl font-bold">{player.stats.wickets || 0}</div>
              </div>
            </div>
          )}
          
          {player.role === "Bowler" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Wickets</div>
                <div className="text-xl font-bold">{player.stats.wickets}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Bowling Avg</div>
                <div className="text-xl font-bold">{player.stats.bowlingAverage}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Economy</div>
                <div className="text-xl font-bold">{player.stats.economy}</div>
              </div>
            </div>
          )}
          
          <h2 className="text-xl font-semibold mb-4">Current Match Performance</h2>
          
          {player.role !== "Bowler" ? (
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Runs</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.runs}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Balls</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.balls}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">4s</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.fours}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">6s</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.sixes}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">SR</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.strikeRate}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Overs</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.overs}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Maidens</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.maidens}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Runs</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.runs}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Wickets</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.wickets}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Economy</div>
                  <div className="text-xl font-bold">{player.currentMatchStats.economy}</div>
                </div>
              </div>
            </div>
          )}
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Recent Form</h2>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {player.recentForm.map((score, index) => (
              <div 
                key={index} 
                className={`flex-none w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${
                  score >= 100 ? 'bg-purple-600' :
                  score >= 50 ? 'bg-green-600' :
                  score > 0 ? 'bg-blue-600' :
                  'bg-red-600'
                }`}
              >
                {score}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <Link to="/scorecard/1" className="text-blue-600 hover:text-blue-800">
          Back to Scorecard
        </Link>
      </div>
    </div>
  );
}

export default PlayerProfile; 