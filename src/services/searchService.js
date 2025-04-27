import { fetchLiveMatches } from './matchService';

// Mock player data - in a real app, this would come from an API
const players = [
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Batsman',
    batting: {
      avg: 59.07,
      sr: 93.17,
      runs: 12898
    }
  },
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    country: 'India',
    role: 'Batsman / Captain',
    batting: {
      avg: 48.69,
      sr: 90.36,
      runs: 9837
    }
  },
  {
    id: 'joe-root',
    name: 'Joe Root',
    country: 'England',
    role: 'Batsman',
    batting: {
      avg: 50.15,
      sr: 86.59,
      runs: 6228
    }
  },
  {
    id: 'kane-williamson',
    name: 'Kane Williamson',
    country: 'New Zealand',
    role: 'Batsman / Captain',
    batting: {
      avg: 47.83,
      sr: 81.17,
      runs: 6555
    }
  },
  {
    id: 'steve-smith',
    name: 'Steve Smith',
    country: 'Australia',
    role: 'Batsman',
    batting: {
      avg: 43.15,
      sr: 86.41,
      runs: 4939
    }
  },
  {
    id: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    country: 'India',
    role: 'Bowler',
    bowling: {
      avg: 24.30,
      econ: 4.63,
      wkts: 121
    }
  },
  {
    id: 'mitchell-starc',
    name: 'Mitchell Starc',
    country: 'Australia',
    role: 'Bowler',
    bowling: {
      avg: 22.45,
      econ: 5.03,
      wkts: 211
    }
  },
  {
    id: 'trent-boult',
    name: 'Trent Boult',
    country: 'New Zealand',
    role: 'Bowler',
    bowling: {
      avg: 23.79,
      econ: 4.92,
      wkts: 187
    }
  },
  {
    id: 'ben-stokes',
    name: 'Ben Stokes',
    country: 'England',
    role: 'All-rounder',
    batting: {
      avg: 40.12,
      sr: 95.09,
      runs: 3159
    },
    bowling: {
      avg: 37.04,
      econ: 6.03,
      wkts: 74
    }
  },
  {
    id: 'rashid-khan',
    name: 'Rashid Khan',
    country: 'Afghanistan',
    role: 'Bowler',
    bowling: {
      avg: 18.57,
      econ: 4.16,
      wkts: 153
    }
  }
];

// Function to search matches and players
export const searchMatchesAndPlayers = (query) => {
  if (!query || query.trim() === '') {
    return { matches: [], players: [] };
  }

  // Normalize query for case-insensitive search
  const normalizedQuery = query.toLowerCase().trim();
  
  // Get all matches
  const allMatches = fetchLiveMatches();
  
  // Filter matches
  const matches = allMatches.filter(match => 
    match.team1.toLowerCase().includes(normalizedQuery) ||
    match.team2.toLowerCase().includes(normalizedQuery) ||
    match.venue.toLowerCase().includes(normalizedQuery) ||
    match.status.toLowerCase().includes(normalizedQuery)
  );
  
  // Filter players
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(normalizedQuery) ||
    player.country.toLowerCase().includes(normalizedQuery) ||
    player.role.toLowerCase().includes(normalizedQuery)
  );
  
  return {
    matches,
    players: filteredPlayers
  };
}; 