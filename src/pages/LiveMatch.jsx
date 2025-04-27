function LiveMatch() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Live Match</h1>
      <p className="text-gray-600">Live match details will be displayed here...</p>
      <div className="mt-4 flex gap-4">
        <div className="bg-blue-100 p-4 rounded-md flex-1">
          <h2 className="text-xl font-semibold">Team 1</h2>
          <p className="text-3xl font-bold">235/6</p>
          <p className="text-sm text-gray-500">50 overs</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md flex-1">
          <h2 className="text-xl font-semibold">Team 2</h2>
          <p className="text-3xl font-bold">180/4</p>
          <p className="text-sm text-gray-500">38.2 overs</p>
        </div>
      </div>
    </div>
  )
}

export default LiveMatch 