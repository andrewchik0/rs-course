import React, { useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import Photos from '../../components/Photos/Photos';

function HomePage() {
  const [data, setData] = useState('');

  const handleInputResponse = (response: string) => {
    setData(response);
  };

  return (
    <>
      <SearchBar onInput={handleInputResponse} />
      <Photos photos={data} />
    </>
  );
}

export default HomePage;
