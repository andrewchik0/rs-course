import Roller from '../../components/Roller/Roller';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function SearchBar(props: { onInput: (response: string) => void }) {
  const [value, setValue] = useState(localStorage.getItem('search-value') || '');
  const [isLoading, setIsLoading] = useState(false);
  const refValue = useRef('');

  refValue.current = value;

  const saveState = useCallback(() => localStorage.setItem('search-value', refValue.current), []);

  const search = useCallback(() => {
    fetch(
      'https://api.unsplash.com/' +
        (value ? 'search/photos?page=1&query=' + value : 'search/photos?page=1&query=photos'),
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: 'Client-ID oEs-sd2oWIy5g8sGMuh8Dp52cQTkggVZg7fIIkIyhrc',
          'Accept-Version': 'v1',
          'X-Per-Page': '10',
          'X-Total': '1',
        }),
      }
    ).then(async (response) => {
      setIsLoading(false);
      props.onInput(JSON.stringify(await response.json()));
    });
    setIsLoading(true);
  }, [props, value]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveState);
    search();
  }, [saveState]); // eslint-disable-line react-hooks/exhaustive-deps

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
        onKeyDown={(e) => {
          if (e.key === 'Enter') search();
        }}
      />
      <button className="search-button" onClick={search}>
        {isLoading ? (
          <Roller scale={0.5} x={-10} y={-10} />
        ) : (
          <img src="./search.svg" alt="Search" height="40px" />
        )}
      </button>
    </div>
  );
}
