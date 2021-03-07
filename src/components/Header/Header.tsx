import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';

const Header = () => {
  return (
    <div>
      <Nav />
      <header className="header-title">
        <h1>splitbill</h1>
        <h2>Bill-splitting made easy</h2>
      </header>
    </div>
  );
};

export default Header;