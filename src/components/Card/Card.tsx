import React from 'react';

import CardModel from 'models/CardModel';

function Card(props: { card: CardModel }) {
  return (
    <div className="card">
      <img className="card-image" src={props.card.img} alt={props.card.name} />
      <h3 className="card-name">{props.card.name}</h3>
      <h4 className="card-price">
        {props.card.price}
        {props.card.currency}
      </h4>
      <p className="card-description">{props.card.description}</p>
    </div>
  );
}

export default Card;
