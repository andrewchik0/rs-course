import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <NavLink className="header-button" to="/">
        <div className="header-text">Home</div>
      </NavLink>
      <NavLink className="header-button" to="/about">
        <div className="header-text">About</div>
      </NavLink>
      <NavLink className="new-card-button" to="/create-card">
        <div className="header-text">+ New Cat</div>
      </NavLink>
    </header>
  );
}

export default Header;
