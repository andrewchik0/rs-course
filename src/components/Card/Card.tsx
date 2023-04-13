import React from 'react';

import ICard from 'models/ICard';

function Card(props: { card: ICard }) {
  const getAge = (time: number) => {
    function format(x: number) {
      return x.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    }
    const birthday = new Date(time);
    const days = Math.floor((Date.now() - birthday.getTime()) / 1000 / 3600 / 24);
    const months =
      new Date().getMonth() -
      birthday.getMonth() +
      12 * (new Date().getFullYear() - birthday.getFullYear());
    const years = Math.abs(new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970);
    const birthdayString = `${format(birthday.getDate())}.${format(
      birthday.getMonth() + 1
    )}.${birthday.getFullYear()}`;

    if (years > 0) {
      return `${birthdayString} (${years} ${years == 1 ? 'Year' : 'Years'})`;
    }
    if (months > 0) {
      return `${birthdayString} (${months} ${months == 1 ? 'Month' : 'Months'})`;
    }
    return `${birthdayString} (${days} ${days == 1 ? 'Day' : 'Days'})`;
  };

  return (
    <div className="card">
      <img className="card-image" src={props.card.img} alt={props.card.name} />
      <h3 className="card-name">{props.card.name}</h3>
      <h4>{getAge(props.card.birthday)}</h4>
      <h4>{props.card.breed}</h4>
      <h4>{props.card.gender.charAt(0).toUpperCase() + props.card.gender.slice(1)}</h4>
      <h4>{props.card.microchipped ? 'Microchipped' : 'Not microchipped'}</h4>
    </div>
  );
}

export default Card;
