// Helper functions for the cricket app

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateRunRate = (runs, overs) => {
  if (!overs) return 0;
  return (runs / overs).toFixed(2);
};

export const parseOvers = (oversString) => {
  // Convert overs like "34.2" to a number (34 overs and 2 balls)
  if (!oversString) return 0;
  
  const parts = oversString.split('.');
  const fullOvers = parseInt(parts[0]) || 0;
  const balls = parts.length > 1 ? parseInt(parts[1]) || 0 : 0;
  
  return fullOvers + (balls / 6);
}; 