function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CricApp</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li className="hover:text-blue-200 font-medium">Matches</li>
            <li className="hover:text-blue-200 font-medium">Teams</li>
            <li className="hover:text-blue-200 font-medium">Players</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 