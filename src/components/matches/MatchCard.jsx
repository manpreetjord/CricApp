function MatchCard({ team1, team2, score1, score2, status }) {
  const isLive = status === 'Live'
  
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      <div className={`p-2 text-white text-center text-sm font-medium ${isLive ? 'bg-red-500' : 'bg-blue-500'}`}>
        {status}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">{team1}</span>
          <span className="font-bold">{score1}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{team2}</span>
          <span className="font-bold">{score2}</span>
        </div>
      </div>
    </div>
  )
}

export default MatchCard 