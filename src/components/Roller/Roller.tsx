import React from 'react';

import './Roller.css';

export default function Roller(props: { scale: number; x: number; y: number; style?: object }) {
  return (
    <div
      className="lds-roller"
      style={{
        ...props.style,
        transform: `translate(${props.x}px, ${props.y}px) scale(${props.scale})`,
      }}
      data-testid="roller"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
