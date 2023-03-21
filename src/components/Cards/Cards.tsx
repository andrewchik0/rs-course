import React from 'react';

import cards from '../../assets/cards.json';
import Card from '../../components/Card/Card';

function Cards() {
  const cardComponents = cards.cards.map((card, idx) => <Card key={idx} card={card} />);

  return (
    <div className="content">
      <div className="card-container">{cardComponents}</div>
    </div>
  );
}

export default Cards;
