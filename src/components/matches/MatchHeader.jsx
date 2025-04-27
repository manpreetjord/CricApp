import { useState, useEffect } from 'react';

function MatchHeader({ match }) {
  const [timer, setTimer] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Calculate match duration in seconds (mock data)
  const startTimeOffset = Math.floor(Math.random() * 7200); // Random time between 0-2 hours
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Get current over (mock calculation)
  const getCurrentOver = () => {
    // For mock data, assume 1 over takes about 4 minutes (240 seconds)
    const totalSeconds = startTimeOffset + timer;
    const overs = Math.floor(totalSeconds / 240);
    const balls = Math.floor((totalSeconds % 240) / 40); // 40 seconds per ball
    
    return `${overs}.${balls}`;
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-1">{match.team1} vs {match.team2}</h2>
          <p className="text-blue-100">{match.venue}</p>
        </div>
        
        <div className="mt-3 md:mt-0 flex flex-col items-center md:items-end">
          <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold mb-1">
            {match.status}
          </div>
          <div className="text-sm md:text-base">
            Current Over: <span className="font-semibold">{getCurrentOver()}</span>
          </div>
          <div className="text-sm">
            Match Time: <span className="font-semibold">{formatTime(startTimeOffset + timer)}</span>
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 p-3 rounded">
          <div className="flex justify-between">
            <span className="text-blue-100">Batting</span>
            <span className="font-semibold">{match.score1}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-blue-100">Run Rate</span>
            <span className="font-semibold">{match.runRate1 || "-"}</span>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 p-3 rounded">
          <div className="flex justify-between">
            <span className="text-blue-100">Bowling</span>
            <span className="font-semibold">{match.score2}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-blue-100">Run Rate</span>
            <span className="font-semibold">{match.runRate2 || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchHeader; 