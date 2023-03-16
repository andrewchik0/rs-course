import React from 'react';

import SearchBar from '../components/SearchBar';
import cards from '../assets/cards.json';
import Card from '../components/Card';

function HomePage() {
  let cardComponents = cards.cards.map((card) => <Card key={card.id} card={card} />);

  return (
    <>
      <SearchBar />
      <div className="content">
        <div className="card-container">{cardComponents}</div>
      </div>
    </>
  );
}

export default HomePage;
