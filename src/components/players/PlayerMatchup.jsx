import { useState } from 'react';

function PlayerMatchup({ batsman, bowler }) {
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
      }
    }
  };

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
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Player Matchup</h3>
        <p className="text-gray-500">No previous matchup data available for {batsman} vs {bowler}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Player Matchup: {batsman} vs {bowler}</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Innings</div>
          <div className="text-xl font-bold">{data.innings}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Runs</div>
          <div className="text-xl font-bold">{data.runs}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Balls</div>
          <div className="text-xl font-bold">{data.balls}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Dismissals</div>
          <div className="text-xl font-bold">{data.dismissals}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Average</div>
          <div className="text-xl font-bold">{data.average.toFixed(2)}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">Strike Rate</div>
          <div className="text-xl font-bold">{data.strikeRate.toFixed(2)}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">4s</div>
          <div className="text-xl font-bold">{data.fours}</div>
        </div>
        
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-sm text-gray-500">6s</div>
          <div className="text-xl font-bold">{data.sixes}</div>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-500">
        Based on {data.matches} matches between these players
      </div>
    </div>
  );
}

export default PlayerMatchup; 