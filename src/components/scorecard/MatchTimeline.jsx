import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine,
  Scatter
} from 'recharts';

const MatchTimeline = ({ match }) => {
  if (!match || !match.batting || !match.recentOvers) return null;
  
  // Generate timeline data based on match data
  const generateTimelineData = () => {
    if (!match.recentOvers || match.recentOvers.length === 0) return [];
    
    // Sort overs in ascending order for timeline
    const sortedOvers = [...match.recentOvers].sort((a, b) => a.over - b.over);
    
    let events = [];
    let cumulativeRuns = 0;
    let wickets = 0;
    
    // Process each over to create events
    sortedOvers.forEach(over => {
      let overRuns = 0;
      
      over.runs.forEach((run, ballIndex) => {
        // Calculate actual ball number (e.g., 10.3 for 3rd ball of 10th over)
        const ballNumber = over.over + (ballIndex + 1) / 10;
        
        if (run === "W") {
          wickets++;
          events.push({
            ball: ballNumber,
            type: 'wicket',
            runs: cumulativeRuns,
            wickets,
            description: `Wicket at ${over.over}.${ballIndex + 1}`
          });
        } else {
          overRuns += run;
          
          if (run === 4) {
            events.push({
              ball: ballNumber,
              type: 'four',
              runs: cumulativeRuns + overRuns,
              wickets,
              description: `Four hit at ${over.over}.${ballIndex + 1}`
            });
          } else if (run === 6) {
            events.push({
              ball: ballNumber,
              type: 'six',
              runs: cumulativeRuns + overRuns,
              wickets,
              description: `Six hit at ${over.over}.${ballIndex + 1}`
            });
          }
        }
      });
      
      cumulativeRuns += overRuns;
      
      // Add a data point for each over
      events.push({
        ball: over.over,
        type: 'over',
        runs: cumulativeRuns,
        wickets,
        description: `End of over ${over.over}: ${cumulativeRuns} runs, ${wickets} wickets`
      });
      
      // Check for milestones (50s, 100s)
      if (Math.floor(cumulativeRuns / 50) > Math.floor((cumulativeRuns - overRuns) / 50)) {
        events.push({
          ball: over.over,
          type: 'milestone',
          runs: cumulativeRuns,
          wickets,
          description: `Team reached ${Math.floor(cumulativeRuns / 50) * 50} runs`
        });
      }
    });
    
    return events;
  };
  
  const timelineData = generateTimelineData();
  
  // Custom tooltip formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const event = payload[0].payload;
      
      return (
        <div className="custom-tooltip bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-medium">{event.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Score: {event.runs}/{event.wickets}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Different scatter points for different event types
  const renderScatterPoint = (entry) => {
    switch (entry.type) {
      case 'wicket':
        return (
          <circle r={6} fill="#EF4444" stroke="#991B1B" strokeWidth={1} />
        );
      case 'four':
        return (
          <circle r={5} fill="#3B82F6" stroke="#1E40AF" strokeWidth={1} />
        );
      case 'six':
        return (
          <circle r={5} fill="#8B5CF6" stroke="#5B21B6" strokeWidth={1} />
        );
      case 'milestone':
        return (
          <circle r={6} fill="#F59E0B" stroke="#B45309" strokeWidth={1} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="match-timeline bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 mb-6">
      <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Match Timeline</h3>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timelineData.filter(event => event.type === 'over')}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="ball" 
              label={{ value: 'Overs', position: 'insideBottomRight', offset: -5 }} 
            />
            <YAxis 
              label={{ value: 'Runs', angle: -90, position: 'insideLeft' }} 
              domain={[0, 'dataMax + 20']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Line 
              type="monotone" 
              dataKey="runs" 
              name="Runs" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false} 
              activeDot={{ r: 6 }} 
            />
            
            {/* Scatter plots for different events */}
            <Scatter 
              name="Wickets" 
              data={timelineData.filter(event => event.type === 'wicket')} 
              fill="red" 
              line={false} 
              shape={renderScatterPoint} 
            />
            
            <Scatter 
              name="Boundaries" 
              data={timelineData.filter(event => event.type === 'four' || event.type === 'six')} 
              fill="blue" 
              line={false} 
              shape={renderScatterPoint} 
            />
            
            <Scatter 
              name="Milestones" 
              data={timelineData.filter(event => event.type === 'milestone')} 
              fill="orange" 
              line={false} 
              shape={renderScatterPoint} 
            />
            
            {/* Reference lines for wickets */}
            {timelineData
              .filter(event => event.type === 'wicket')
              .map((event, index) => (
                <ReferenceLine 
                  key={index} 
                  x={event.ball} 
                  stroke="red" 
                  strokeDasharray="3 3" 
                  opacity={0.5} 
                />
              ))
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Wicket</span>
        </div>
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Four</span>
        </div>
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Six</span>
        </div>
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Milestone</span>
        </div>
      </div>
    </div>
  );
};

export default MatchTimeline; 