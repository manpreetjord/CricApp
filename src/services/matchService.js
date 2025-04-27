// Mock data for cricket matches and statistics

export const fetchLiveMatches = () => {
  // Simulating API call with mock data
  return [
    {
      id: 1,
      team1: "India",
      team2: "Australia",
      score1: "275/4 (42.3 ov)",
      score2: "230/8 (50 ov)",
      status: "Live",
      venue: "Melbourne Cricket Ground",
      runRate1: 6.47,
      runRate2: 4.60,
    },
    {
      id: 2,
      team1: "England",
      team2: "New Zealand",
      score1: "310/6 (50 ov)",
      score2: "120/2 (21.4 ov)",
      status: "Live",
      venue: "Lord's Cricket Ground",
      runRate1: 6.20,
      runRate2: 5.54,
    },
    {
      id: 3,
      team1: "South Africa",
      team2: "Pakistan",
      score1: "189/10 (45.2 ov)",
      score2: "156/7 (38.4 ov)",
      status: "Live",
      venue: "Wanderers Stadium",
      runRate1: 4.17,
      runRate2: 4.03,
    }
  ];
};

export const fetchMatchDetails = (matchId) => {
  // Simulating API call with mock data based on matchId
  const matches = {
    1: {
      id: 1,
      team1: "India",
      team2: "Australia",
      score1: "275/4 (42.3 ov)",
      score2: "230/8 (50 ov)",
      status: "Live",
      venue: "Melbourne Cricket Ground",
      date: "June 15, 2023",
      batting: [
        {
          team: "India",
          players: [
            { name: "Rohit Sharma", runs: 78, balls: 64, fours: 8, sixes: 2, strikeRate: 121.88, status: "c Smith b Cummins" },
            { name: "Shubman Gill", runs: 65, balls: 70, fours: 6, sixes: 1, strikeRate: 92.86, status: "c Carey b Starc" },
            { name: "Virat Kohli", runs: 82, balls: 78, fours: 7, sixes: 3, strikeRate: 105.13, status: "not out" },
            { name: "KL Rahul", runs: 25, balls: 28, fours: 2, sixes: 0, strikeRate: 89.29, status: "lbw b Hazlewood" },
            { name: "Hardik Pandya", runs: 18, balls: 15, fours: 1, sixes: 1, strikeRate: 120.00, status: "not out" },
          ]
        },
        {
          team: "Australia",
          players: [
            { name: "David Warner", runs: 45, balls: 52, fours: 5, sixes: 0, strikeRate: 86.54, status: "c Rahul b Bumrah" },
            { name: "Travis Head", runs: 32, balls: 40, fours: 3, sixes: 1, strikeRate: 80.00, status: "b Shami" },
            { name: "Steve Smith", runs: 68, balls: 75, fours: 7, sixes: 0, strikeRate: 90.67, status: "c Jadeja b Kuldeep" },
            { name: "Marnus Labuschagne", runs: 35, balls: 42, fours: 3, sixes: 0, strikeRate: 83.33, status: "c Gill b Jadeja" },
            { name: "Glenn Maxwell", runs: 24, balls: 18, fours: 2, sixes: 1, strikeRate: 133.33, status: "b Bumrah" },
            { name: "Marcus Stoinis", runs: 15, balls: 20, fours: 1, sixes: 0, strikeRate: 75.00, status: "c Kohli b Shami" },
            { name: "Alex Carey", runs: 5, balls: 8, fours: 0, sixes: 0, strikeRate: 62.50, status: "run out" },
            { name: "Pat Cummins", runs: 2, balls: 8, fours: 0, sixes: 0, strikeRate: 25.00, status: "not out" },
            { name: "Mitchell Starc", runs: 0, balls: 2, fours: 0, sixes: 0, strikeRate: 0.00, status: "b Bumrah" },
          ]
        }
      ],
      bowling: [
        {
          team: "Australia",
          players: [
            { name: "Mitchell Starc", overs: "9.0", maidens: 0, runs: 62, wickets: 1, economy: 6.89 },
            { name: "Josh Hazlewood", overs: "10.0", maidens: 1, runs: 45, wickets: 1, economy: 4.50 },
            { name: "Pat Cummins", overs: "8.3", maidens: 0, runs: 51, wickets: 1, economy: 6.00 },
            { name: "Adam Zampa", overs: "10.0", maidens: 0, runs: 58, wickets: 0, economy: 5.80 },
            { name: "Glenn Maxwell", overs: "5.0", maidens: 0, runs: 35, wickets: 0, economy: 7.00 },
          ]
        },
        {
          team: "India",
          players: [
            { name: "Jasprit Bumrah", overs: "10.0", maidens: 1, runs: 42, wickets: 3, economy: 4.20 },
            { name: "Mohammed Shami", overs: "10.0", maidens: 0, runs: 48, wickets: 2, economy: 4.80 },
            { name: "Kuldeep Yadav", overs: "10.0", maidens: 0, runs: 55, wickets: 1, economy: 5.50 },
            { name: "Ravindra Jadeja", overs: "10.0", maidens: 0, runs: 40, wickets: 1, economy: 4.00 },
            { name: "Hardik Pandya", overs: "10.0", maidens: 0, runs: 45, wickets: 0, economy: 4.50 },
          ]
        }
      ],
      recentOvers: [
        { over: 42, runs: [1, 4, 0, 2, 1, 6] },
        { over: 41, runs: [0, 1, 0, 1, 4, 1] },
        { over: 40, runs: [1, 0, 2, 0, 0, 1] },
      ]
    },
    2: {
      id: 2,
      team1: "England",
      team2: "New Zealand",
      score1: "310/6 (50 ov)",
      score2: "120/2 (21.4 ov)",
      status: "Live",
      venue: "Lord's Cricket Ground",
      date: "June 14, 2023",
      batting: [
        {
          team: "England",
          players: [
            { name: "Jonny Bairstow", runs: 124, balls: 112, fours: 12, sixes: 4, strikeRate: 110.71, status: "c Conway b Southee" },
            { name: "Jason Roy", runs: 42, balls: 50, fours: 5, sixes: 0, strikeRate: 84.00, status: "c Latham b Boult" },
            { name: "Joe Root", runs: 85, balls: 90, fours: 7, sixes: 1, strikeRate: 94.44, status: "not out" },
            { name: "Eoin Morgan", runs: 35, balls: 38, fours: 3, sixes: 1, strikeRate: 92.11, status: "c Williamson b Henry" },
            { name: "Ben Stokes", runs: 15, balls: 10, fours: 2, sixes: 0, strikeRate: 150.00, status: "b Santner" },
          ]
        },
        {
          team: "New Zealand",
          players: [
            { name: "Martin Guptill", runs: 32, balls: 38, fours: 4, sixes: 0, strikeRate: 84.21, status: "c Buttler b Archer" },
            { name: "Devon Conway", runs: 45, balls: 55, fours: 5, sixes: 0, strikeRate: 81.82, status: "not out" },
            { name: "Kane Williamson", runs: 38, balls: 42, fours: 3, sixes: 1, strikeRate: 90.48, status: "not out" },
          ]
        }
      ],
      bowling: [
        {
          team: "New Zealand",
          players: [
            { name: "Trent Boult", overs: "10.0", maidens: 0, runs: 65, wickets: 1, economy: 6.50 },
            { name: "Tim Southee", overs: "10.0", maidens: 0, runs: 70, wickets: 1, economy: 7.00 },
            { name: "Matt Henry", overs: "10.0", maidens: 0, runs: 58, wickets: 1, economy: 5.80 },
            { name: "Mitchell Santner", overs: "10.0", maidens: 0, runs: 54, wickets: 1, economy: 5.40 },
            { name: "James Neesham", overs: "10.0", maidens: 0, runs: 63, wickets: 0, economy: 6.30 },
          ]
        },
        {
          team: "England",
          players: [
            { name: "Jofra Archer", overs: "5.0", maidens: 0, runs: 25, wickets: 1, economy: 5.00 },
            { name: "Stuart Broad", overs: "6.0", maidens: 0, runs: 32, wickets: 0, economy: 5.33 },
            { name: "Adil Rashid", overs: "6.0", maidens: 0, runs: 28, wickets: 0, economy: 4.67 },
            { name: "Chris Woakes", overs: "4.4", maidens: 0, runs: 35, wickets: 0, economy: 7.50 },
          ]
        }
      ],
      recentOvers: [
        { over: 21, runs: [1, 0, 4, 1, "W", 0] },
        { over: 20, runs: [0, 1, 0, 1, 1, 0] },
        { over: 19, runs: [2, 1, 0, 0, 1, 4] },
      ]
    },
    3: {
      id: 3,
      team1: "South Africa",
      team2: "Pakistan",
      score1: "189/10 (45.2 ov)",
      score2: "156/7 (38.4 ov)",
      status: "Live",
      venue: "Wanderers Stadium",
      date: "June 16, 2023",
      batting: [
        {
          team: "South Africa",
          players: [
            { name: "Quinton de Kock", runs: 42, balls: 53, fours: 5, sixes: 1, strikeRate: 79.25, status: "c Rizwan b Shaheen" },
            { name: "Temba Bavuma", runs: 36, balls: 52, fours: 3, sixes: 0, strikeRate: 69.23, status: "lbw b Shadab" },
            { name: "Aiden Markram", runs: 24, balls: 32, fours: 2, sixes: 0, strikeRate: 75.00, status: "b Shaheen" },
            { name: "Rassie van der Dussen", runs: 38, balls: 45, fours: 3, sixes: 0, strikeRate: 84.44, status: "c Babar b Haris" },
            { name: "Heinrich Klaasen", runs: 28, balls: 25, fours: 2, sixes: 1, strikeRate: 112.00, status: "c Fakhar b Shadab" },
            { name: "David Miller", runs: 18, balls: 20, fours: 1, sixes: 1, strikeRate: 90.00, status: "run out" },
            { name: "Marco Jansen", runs: 0, balls: 4, fours: 0, sixes: 0, strikeRate: 0.00, status: "b Shaheen" },
            { name: "Kagiso Rabada", runs: 2, balls: 12, fours: 0, sixes: 0, strikeRate: 16.67, status: "c Rizwan b Haris" },
            { name: "Anrich Nortje", runs: 0, balls: 1, fours: 0, sixes: 0, strikeRate: 0.00, status: "run out" },
            { name: "Tabraiz Shamsi", runs: 1, balls: 8, fours: 0, sixes: 0, strikeRate: 12.50, status: "not out" },
            { name: "Lungi Ngidi", runs: 0, balls: 3, fours: 0, sixes: 0, strikeRate: 0.00, status: "b Haris" }
          ]
        },
        {
          team: "Pakistan",
          players: [
            { name: "Fakhar Zaman", runs: 25, balls: 32, fours: 3, sixes: 0, strikeRate: 78.13, status: "c Klaasen b Rabada" },
            { name: "Imam-ul-Haq", runs: 34, balls: 48, fours: 4, sixes: 0, strikeRate: 70.83, status: "c Bavuma b Nortje" },
            { name: "Babar Azam", runs: 42, balls: 56, fours: 5, sixes: 0, strikeRate: 75.00, status: "b Shamsi" },
            { name: "Mohammad Rizwan", runs: 28, balls: 35, fours: 3, sixes: 0, strikeRate: 80.00, status: "not out" },
            { name: "Shadab Khan", runs: 12, balls: 15, fours: 1, sixes: 0, strikeRate: 80.00, status: "c Miller b Jansen" },
            { name: "Iftikhar Ahmed", runs: 5, balls: 12, fours: 0, sixes: 0, strikeRate: 41.67, status: "lbw b Rabada" },
            { name: "Mohammad Nawaz", runs: 8, balls: 14, fours: 1, sixes: 0, strikeRate: 57.14, status: "c de Kock b Nortje" },
            { name: "Shaheen Afridi", runs: 2, balls: 10, fours: 0, sixes: 0, strikeRate: 20.00, status: "not out" }
          ]
        }
      ],
      bowling: [
        {
          team: "Pakistan",
          players: [
            { name: "Shaheen Afridi", overs: "10.0", maidens: 1, runs: 38, wickets: 3, economy: 3.80 },
            { name: "Haris Rauf", overs: "9.2", maidens: 0, runs: 42, wickets: 3, economy: 4.50 },
            { name: "Mohammad Nawaz", overs: "10.0", maidens: 0, runs: 36, wickets: 0, economy: 3.60 },
            { name: "Shadab Khan", overs: "10.0", maidens: 0, runs: 41, wickets: 2, economy: 4.10 },
            { name: "Iftikhar Ahmed", overs: "6.0", maidens: 0, runs: 32, wickets: 0, economy: 5.33 }
          ]
        },
        {
          team: "South Africa",
          players: [
            { name: "Kagiso Rabada", overs: "10.0", maidens: 1, runs: 32, wickets: 2, economy: 3.20 },
            { name: "Lungi Ngidi", overs: "8.0", maidens: 0, runs: 36, wickets: 0, economy: 4.50 },
            { name: "Anrich Nortje", overs: "8.0", maidens: 0, runs: 38, wickets: 2, economy: 4.75 },
            { name: "Marco Jansen", overs: "8.0", maidens: 1, runs: 28, wickets: 1, economy: 3.50 },
            { name: "Tabraiz Shamsi", overs: "4.4", maidens: 0, runs: 22, wickets: 1, economy: 4.71 }
          ]
        }
      ],
      recentOvers: [
        { over: 38, runs: [0, 1, 1, 0, 0, "W"] },
        { over: 37, runs: [1, 1, 0, 0, 2, 0] },
        { over: 36, runs: [1, 0, 0, 2, 0, 1] }
      ]
    }
  };

  return matches[matchId] || null;
}; 