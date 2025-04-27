import { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';

function PlayerMatchup({ batsman, bowler, id, className }) {
  const [chartType, setChartType] = useState('scoring');
  
  // Mock data for player matchups
  const matchupData = {
    "Virat Kohli": {
      "Mitchell Starc": {
        matches: 12,
        innings: 10,
        runs: 134,
        balls: 98,
        dismissals: 3,
        fours: 15,
        sixes: 4,
        strikeRate: 136.73,
        average: 44.67,
        scoringZones: [
          { name: 'Fine Leg', percentage: 18 },
          { name: 'Square Leg', percentage: 15 },
          { name: 'Mid Wicket', percentage: 22 },
          { name: 'Mid On', percentage: 8 },
          { name: 'Cover', percentage: 20 },
          { name: 'Point', percentage: 12 },
          { name: 'Third Man', percentage: 5 }
        ],
        runTypes: [
          { name: '1s', runs: 43 },
          { name: '2s', runs: 22 },
          { name: '3s', runs: 3 },
          { name: '4s', runs: 60 },
          { name: '6s', runs: 24 }
        ]
      },
      "Pat Cummins": {
        matches: 8,
        innings: 8,
        runs: 85,
        balls: 78,
        dismissals: 2,
        fours: 9,
        sixes: 2,
        strikeRate: 108.97,
        average: 42.50,
        scoringZones: [
          { name: 'Fine Leg', percentage: 12 },
          { name: 'Square Leg', percentage: 18 },
          { name: 'Mid Wicket', percentage: 25 },
          { name: 'Mid On', percentage: 10 },
          { name: 'Cover', percentage: 15 },
          { name: 'Point', percentage: 15 },
          { name: 'Third Man', percentage: 5 }
        ],
        runTypes: [
          { name: '1s', runs: 35 },
          { name: '2s', runs: 16 },
          { name: '3s', runs: 3 },
          { name: '4s', runs: 36 },
          { name: '6s', runs: 12 }
        ]
      }
    },
    "Rohit Sharma": {
      "Mitchell Starc": {
        matches: 10,
        innings: 10,
        runs: 112,
        balls: 89,
        dismissals: 4,
        fours: 14,
        sixes: 5,
        strikeRate: 125.84,
        average: 28.00,
        scoringZones: [
          { name: 'Fine Leg', percentage: 15 },
          { name: 'Square Leg', percentage: 20 },
          { name: 'Mid Wicket', percentage: 18 },
          { name: 'Mid On', percentage: 5 },
          { name: 'Cover', percentage: 15 },
          { name: 'Point', percentage: 17 },
          { name: 'Third Man', percentage: 10 }
        ],
        runTypes: [
          { name: '1s', runs: 38 },
          { name: '2s', runs: 14 },
          { name: '3s', runs: 0 },
          { name: '4s', runs: 56 },
          { name: '6s', runs: 30 }
        ]
      },
      "Pat Cummins": {
        matches: 7,
        innings: 7,
        runs: 67,
        balls: 60,
        dismissals: 3,
        fours: 8,
        sixes: 2,
        strikeRate: 111.67,
        average: 22.33,
        scoringZones: [
          { name: 'Fine Leg', percentage: 15 },
          { name: 'Square Leg', percentage: 22 },
          { name: 'Mid Wicket', percentage: 20 },
          { name: 'Mid On', percentage: 8 },
          { name: 'Cover', percentage: 12 },
          { name: 'Point', percentage: 18 },
          { name: 'Third Man', percentage: 5 }
        ],
        runTypes: [
          { name: '1s', runs: 27 },
          { name: '2s', runs: 12 },
          { name: '3s', runs: 0 },
          { name: '4s', runs: 32 },
          { name: '6s', runs: 12 }
        ]
      }
    },
    "Kane Williamson": {
      "Jofra Archer": {
        matches: 6,
        innings: 6,
        runs: 89,
        balls: 82,
        dismissals: 2,
        fours: 10,
        sixes: 1,
        strikeRate: 108.54,
        average: 44.50,
        scoringZones: [
          { name: 'Fine Leg', percentage: 10 },
          { name: 'Square Leg', percentage: 12 },
          { name: 'Mid Wicket', percentage: 18 },
          { name: 'Mid On', percentage: 15 },
          { name: 'Cover', percentage: 25 },
          { name: 'Point', percentage: 15 },
          { name: 'Third Man', percentage: 5 }
        ],
        runTypes: [
          { name: '1s', runs: 39 },
          { name: '2s', runs: 20 },
          { name: '3s', runs: 0 },
          { name: '4s', runs: 40 },
          { name: '6s', runs: 6 }
        ]
      }
    }
  };

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  // Get matchup data for the current batsman-bowler pair
  const getMatchupData = () => {
    if (matchupData[batsman] && matchupData[batsman][bowler]) {
      return matchupData[batsman][bowler];
    }
    return null;
  };

  const data = getMatchupData();

  if (!data) {
    return (
      <div 
        id={id} 
        className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4 ${className || ''}`}
        role="region" 
        aria-label="Player Matchup Information"
      >
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Player Matchup</h3>
        <p className="text-gray-500 dark:text-gray-400">No previous matchup data available for {batsman} vs {bowler}</p>
      </div>
    );
  }

  return (
    <div 
      id={id} 
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4 ${className || ''}`}
      role="region" 
      aria-label="Player Matchup Statistics"
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Player Matchup: {batsman} vs {bowler}</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Innings</div>
          <div className="text-xl font-bold dark:text-white">{data.innings}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Runs</div>
          <div className="text-xl font-bold dark:text-white">{data.runs}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Balls</div>
          <div className="text-xl font-bold dark:text-white">{data.balls}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Dismissals</div>
          <div className="text-xl font-bold dark:text-white">{data.dismissals}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Average</div>
          <div className="text-xl font-bold dark:text-white">{data.average.toFixed(2)}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Strike Rate</div>
          <div className="text-xl font-bold dark:text-white">{data.strikeRate.toFixed(2)}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">4s</div>
          <div className="text-xl font-bold dark:text-white">{data.fours}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">6s</div>
          <div className="text-xl font-bold dark:text-white">{data.sixes}</div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        <button 
          onClick={() => setChartType('scoring')}
          className={`px-3 py-1 rounded text-sm ${
            chartType === 'scoring' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
          }`}
        >
          Scoring Zones
        </button>
        <button 
          onClick={() => setChartType('runs')}
          className={`px-3 py-1 rounded text-sm ${
            chartType === 'runs' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
          }`}
        >
          Run Types
        </button>
      </div>
      
      <div className="mt-4 h-64">
        {chartType === 'scoring' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.scoringZones}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.scoringZones.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.runTypes}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="runs" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Based on {data.matches} matches between these players
      </div>
    </div>
  );
}

export default PlayerMatchup; 