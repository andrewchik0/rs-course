import React from 'react';

import cards from '../../assets/cards.json';
import Card from '../../components/Card/Card';

function Cards() {
  return (
    <div className="content">
      <div className="card-container">
        {cards.map((card, idx) => {
          const { ['birthday']: birthday, ...cardObject } = card;

          return (
            <Card key={idx} card={Object.assign(cardObject, { birthday: new Date(birthday) })} />
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
