import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import Dropdown from './Dropdown';
import Loader from './Loader';

const API_URL = 'https://dummyjson.com/products/search';

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skip, setSkip] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setLoading(true);
      axios
        .get(API_URL, {
          params: {
            q: debouncedQuery,
            limit: 10,
            skip: skip,
          },
        })
        .then((res) => {
          setResults(res.data.products);
          setError('');
        })
        .catch(() => setError('Failed to fetch data'))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedQuery, skip]);

  const handleSelect = (value) => {
    setQuery(value);        
    setResults([]);         
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSkip(0);
        }}
        style={{ width: '100%', padding: '8px' }}
      />
      {loading && <Loader />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Dropdown items={results} onSelect={handleSelect} />
    </div>
  );
}

export default Autocomplete;
