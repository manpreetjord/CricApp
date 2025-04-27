import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search players or matches..."
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar; 