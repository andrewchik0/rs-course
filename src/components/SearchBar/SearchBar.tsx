import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function SearchBar() {
  const [value, setValue] = useState(localStorage.getItem('search-value') || '');
  const refValue = useRef('');

  refValue.current = value;

  const saveState = useCallback(() => localStorage.setItem('search-value', refValue.current), []);

  useEffect(() => {
    window.addEventListener('beforeunload', saveState);
  }, [saveState]);

  useEffect(
    () => () => {
      localStorage.setItem('search-value', refValue.current);
      window.removeEventListener('beforeunload', saveState);
    },
    [saveState]
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="search-button">
        <img src="./search.svg" alt="Search" height="40px" />
      </button>
    </div>
  );
}
