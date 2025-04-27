import { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { searchMatchesAndPlayers } from '../../services/searchService';

function Search() {
  const [searchResults, setSearchResults] = useState({ matches: [], players: [] });
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults({ matches: [], players: [] });
      setIsResultsVisible(false);
      return;
    }

    // Debounce search (in a real app) to avoid excessive API calls
    const results = searchMatchesAndPlayers(query);
    setSearchResults(results);
    setIsResultsVisible(true);
  };

  const closeResults = () => {
    setIsResultsVisible(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <SearchBar onSearch={handleSearch} />
      <SearchResults 
        matches={searchResults.matches}
        players={searchResults.players}
        isVisible={isResultsVisible}
        onClose={closeResults}
      />
    </div>
  );
}

export default Search; 