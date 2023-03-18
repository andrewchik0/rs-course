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
    </header>
  );
}

export default Header;
