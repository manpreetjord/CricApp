import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import MatchPage from './pages/MatchPage'
import Scorecard from './pages/Scorecard'
import PlayerStats from './pages/PlayerStats'
import LiveMatch from './pages/LiveMatch'
import Header from './components/layout/Header'
import ScorecardDetail from './components/scorecard/ScorecardDetail'
import PlayerProfile from './components/players/PlayerProfile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <ul className="flex space-x-8 overflow-x-auto pb-1">
              <li><Link to="/" className="text-blue-700 hover:text-blue-900 font-medium">Home</Link></li>
              <li><Link to="/match" className="text-blue-700 hover:text-blue-900 font-medium">Match Details</Link></li>
              <li><Link to="/scorecard" className="text-blue-700 hover:text-blue-900 font-medium">Scorecard</Link></li>
              <li><Link to="/player-stats" className="text-blue-700 hover:text-blue-900 font-medium">Player Stats</Link></li>
              <li><Link to="/live-match" className="text-blue-700 hover:text-blue-900 font-medium">Live Match</Link></li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/scorecard" element={<Scorecard />} />
            <Route path="/scorecard/:matchId" element={<ScorecardDetail />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/player/:playerId" element={<PlayerProfile />} />
            <Route path="/live-match" element={<LiveMatch />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
