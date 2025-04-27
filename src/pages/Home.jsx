import { Link } from 'react-router-dom'
import MatchCard from '../components/matches/MatchCard'
import LiveMatches from '../components/matches/LiveMatches'

function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Live Matches</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
          Refresh
        </button>
      </div>
      
      <LiveMatches />
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/live-match" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md py-3 px-4 text-center font-medium hover:from-blue-600 hover:to-blue-700 transition duration-200">
            Live Match
          </Link>
          <Link to="/scorecard" className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md py-3 px-4 text-center font-medium hover:from-green-600 hover:to-green-700 transition duration-200">
            Scorecard
          </Link>
          <Link to="/player-stats" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md py-3 px-4 text-center font-medium hover:from-purple-600 hover:to-purple-700 transition duration-200">
            Player Stats
          </Link>
          <Link to="/match" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-md py-3 px-4 text-center font-medium hover:from-yellow-600 hover:to-yellow-700 transition duration-200">
            Match Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 