import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  ComposedChart,
  Scatter
} from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a349a4', '#ED6663'];

const MatchStats = ({ match }) => {
  if (!match) return null;

  // Calculate run rate per over based on recent overs
  const calculateRunRate = (recentOvers) => {
    if (!recentOvers || recentOvers.length === 0) return 0;
    
    const totalRuns = recentOvers.reduce((sum, over) => {
      const overRuns = over.runs.reduce((s, r) => s + (r === "W" ? 0 : r), 0);
      return sum + overRuns;
    }, 0);
    
    return (totalRuns / recentOvers.length).toFixed(2);
  };

  // Generate data for runs progression chart
  const generateRunsProgressionData = () => {
    if (!match.recentOvers) return [];
    
    let team1Runs = 0;
    const team1Wickets = 0;
    
    return match.recentOvers.map((over, index) => {
      const overRuns = over.runs.reduce((sum, run) => sum + (run === "W" ? 0 : run), 0);
      const wickets = over.runs.filter(run => run === "W").length;
      team1Runs += overRuns;
      
      return {
        over: over.over,
        runs: team1Runs,
        overRuns,
        wickets
      };
    }).reverse();
  };

  // Find top performers
  const findTopScorer = (battingData) => {
    if (!battingData || battingData.length === 0) return null;
    
    let topScorer = null;
    let maxRuns = -1;
    
    battingData.forEach(team => {
      team.players.forEach(player => {
        if (player.runs > maxRuns) {
          maxRuns = player.runs;
          topScorer = {
            name: player.name,
            runs: player.runs,
            balls: player.balls,
            team: team.team,
            strikeRate: player.strikeRate
          };
        }
      });
    });
    
    return topScorer;
  };

  // Find top wicket taker
  const findTopWicketTaker = (bowlingData) => {
    if (!bowlingData || bowlingData.length === 0) return null;
    
    let topWicketTaker = null;
    let maxWickets = -1;
    
    bowlingData.forEach(team => {
      team.players.forEach(player => {
        if (player.wickets > maxWickets) {
          maxWickets = player.wickets;
          topWicketTaker = {
            name: player.name,
            wickets: player.wickets,
            overs: player.overs,
            team: team.team,
            economy: player.economy
          };
        }
      });
    });
    
    return topWicketTaker;
  };

  // Generate data for team comparison
  const generateTeamComparisonData = () => {
    const team1Score = match.score1.split(' ')[0];
    const team2Score = match.score2.split(' ')[0];
    
    const team1Runs = parseInt(team1Score.split('/')[0], 10);
    const team1Wickets = parseInt(team1Score.split('/')[1], 10) || 0;
    
    const team2Runs = parseInt(team2Score.split('/')[0], 10);
    const team2Wickets = parseInt(team2Score.split('/')[1], 10) || 0;

    // Extract overs
    const team1Overs = match.score1.match(/\((.*?)\)/) ? 
                       parseFloat(match.score1.match(/\((.*?) ov/)[1]) : 0;
    const team2Overs = match.score2.match(/\((.*?)\)/) ? 
                       parseFloat(match.score2.match(/\((.*?) ov/)[1]) : 0;
    
    // Calculate run rates
    const team1RunRate = team1Overs > 0 ? (team1Runs / team1Overs).toFixed(2) : 0;
    const team2RunRate = team2Overs > 0 ? (team2Runs / team2Overs).toFixed(2) : 0;
    
    return [
      {
        name: match.team1,
        runs: team1Runs,
        wickets: team1Wickets,
        runRate: parseFloat(team1RunRate),
        overs: team1Overs
      },
      {
        name: match.team2,
        runs: team2Runs,
        wickets: team2Wickets,
        runRate: parseFloat(team2RunRate),
        overs: team2Overs
      }
    ];
  };

  // Generate boundary data
  const generateBoundaryData = () => {
    const boundaryData = [];
    
    match.batting.forEach(team => {
      let fours = 0;
      let sixes = 0;
      
      team.players.forEach(player => {
        fours += player.fours;
        sixes += player.sixes;
      });
      
      boundaryData.push({
        name: team.team,
        fours,
        sixes,
        total: fours * 4 + sixes * 6
      });
    });
    
    return boundaryData;
  };

  // Calculate bowler stats
  const calculateBowlerStats = () => {
    const bowlerData = [];
    
    match.bowling.forEach(team => {
      team.players.forEach(player => {
        // Parse overs to get complete and partial overs
        const oversStr = player.overs;
        const [fullOvers, balls] = oversStr.split('.');
        const totalBalls = parseInt(fullOvers, 10) * 6 + (parseInt(balls, 10) || 0);
        
        // Calculate average runs per over
        const runsPerOver = totalBalls > 0 ? (player.runs / (totalBalls / 6)).toFixed(2) : 0;
        
        bowlerData.push({
          name: player.name,
          team: team.team,
          overs: parseFloat(oversStr),
          wickets: player.wickets,
          economy: parseFloat(player.economy),
          maidens: player.maidens,
          runs: player.runs
        });
      });
    });
    
    return bowlerData.sort((a, b) => b.wickets - a.wickets);
  };

  // Generate the runs distribution data
  const generateRunsDistributionData = () => {
    const data = [];
    
    match.batting.forEach((team, index) => {
      let ones = 0, twos = 0, threes = 0, fours = 0, sixes = 0;
      
      team.players.forEach(player => {
        // Calculate how many 1s, 2s, 3s based on total runs and boundaries
        const boundaryruns = (player.fours * 4) + (player.sixes * 6);
        const remainingRuns = player.runs - boundaryruns;
        
        // Approximate distribution (we don't have exact count in the mock data)
        ones += Math.round(remainingRuns * 0.6); // 60% of non-boundary runs are 1s
        twos += Math.round(remainingRuns * 0.3); // 30% are 2s
        threes += Math.round(remainingRuns * 0.1); // 10% are 3s
        fours += player.fours;
        sixes += player.sixes;
      });
      
      data.push({
        name: team.team,
        '1s': ones,
        '2s': twos * 2,
        '3s': threes * 3,
        '4s': fours * 4,
        '6s': sixes * 6
      });
    });
    
    return data;
  };

  const runsProgressionData = generateRunsProgressionData();
  const teamComparisonData = generateTeamComparisonData();
  const boundaryData = generateBoundaryData();
  const bowlerData = calculateBowlerStats();
  const runsDistributionData = generateRunsDistributionData();
  const topScorer = findTopScorer(match.batting);
  const topWicketTaker = findTopWicketTaker(match.bowling);
  const currentRunRate = calculateRunRate(match.recentOvers);

  return (
    <div className="match-stats-container">
      <Card className="mb-6">
        <Card.Header className="bg-blue-50 dark:bg-gray-700">
          <h2 className="text-xl font-semibold">Match Statistics</h2>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="stats-card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Top Performers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topScorer && (
                  <div className="top-scorer p-3 bg-blue-50 dark:bg-gray-700 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Top Scorer</div>
                    <div className="text-lg font-semibold">{topScorer.name}</div>
                    <div className="flex justify-between mt-1">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{topScorer.runs}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {topScorer.balls} balls<br/>
                        SR: {topScorer.strikeRate}
                      </div>
                    </div>
                    <div className="text-xs mt-1">{topScorer.team}</div>
                  </div>
                )}
                {topWicketTaker && (
                  <div className="top-wicket-taker p-3 bg-green-50 dark:bg-gray-700 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Top Wicket Taker</div>
                    <div className="text-lg font-semibold">{topWicketTaker.name}</div>
                    <div className="flex justify-between mt-1">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{topWicketTaker.wickets}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {topWicketTaker.overs} overs<br/>
                        Econ: {topWicketTaker.economy}
                      </div>
                    </div>
                    <div className="text-xs mt-1">{topWicketTaker.team}</div>
                  </div>
                )}
              </div>
              
              <div className="match-summary mt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="stat-item p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Current RR</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{currentRunRate}</div>
                  </div>
                  <div className="stat-item p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Boundaries</div>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {boundaryData.reduce((sum, team) => sum + team.fours + team.sixes, 0)}
                    </div>
                  </div>
                  <div className="stat-item p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Wickets</div>
                    <div className="text-xl font-bold text-red-600 dark:text-red-400">
                      {teamComparisonData.reduce((sum, team) => sum + team.wickets, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="run-rate-chart bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Team Comparison</h3>
              <div className="h-52 sm:h-56 md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamComparisonData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="runs" name="Runs" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="runRate" name="Run Rate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {runsProgressionData.length > 0 && (
            <div className="runs-progression bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Runs Progression</h3>
              <div className="h-56 sm:h-64 md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={runsProgressionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="over" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="runs" 
                      name="Total Runs" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.2} 
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="overRuns" 
                      name="Over Runs" 
                      fill="#82ca9d" 
                      barSize={20} 
                    />
                    <Scatter 
                      yAxisId="left" 
                      dataKey="wickets" 
                      name="Wickets" 
                      fill="red" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="boundary-stats bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Boundary Analysis</h3>
              <div className="h-52 sm:h-56 md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={boundaryData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fours" name="4s" fill="#3182ce" />
                    <Bar dataKey="sixes" name="6s" fill="#805ad5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="runs-distribution bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Runs Distribution</h3>
              <div className="h-52 sm:h-56 md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={runsDistributionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="1s" name="1s" stackId="a" fill="#cbd5e0" />
                    <Bar dataKey="2s" name="2s" stackId="a" fill="#a0aec0" />
                    <Bar dataKey="3s" name="3s" stackId="a" fill="#718096" />
                    <Bar dataKey="4s" name="4s" stackId="a" fill="#4299e1" />
                    <Bar dataKey="6s" name="6s" stackId="a" fill="#805ad5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {bowlerData.length > 0 && (
            <div className="bowler-analysis bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 mt-6">
              <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Bowler Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-4 py-2 text-left">Bowler</th>
                      <th className="px-4 py-2 text-center">Team</th>
                      <th className="px-4 py-2 text-center">Overs</th>
                      <th className="px-4 py-2 text-center">Wickets</th>
                      <th className="px-4 py-2 text-center">Runs</th>
                      <th className="px-4 py-2 text-center">Economy</th>
                      <th className="px-4 py-2 text-center">Maidens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bowlerData.slice(0, 5).map((bowler, index) => (
                      <tr key={index} className="border-b dark:border-gray-600">
                        <td className="px-4 py-2 font-medium">{bowler.name}</td>
                        <td className="px-4 py-2 text-center">{bowler.team}</td>
                        <td className="px-4 py-2 text-center">{bowler.overs}</td>
                        <td className="px-4 py-2 text-center font-bold">{bowler.wickets}</td>
                        <td className="px-4 py-2 text-center">{bowler.runs}</td>
                        <td className="px-4 py-2 text-center">{bowler.economy}</td>
                        <td className="px-4 py-2 text-center">{bowler.maidens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MatchStats; 