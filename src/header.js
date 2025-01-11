import React from 'react';
import { Link } from 'react-router-dom';
import './aboutme.css'; // Reuse the same styles for the header

function Header() {
  return (
    <header className="aboutme-header">
      <div className="aboutme-brand">radioseshn</div>
      <nav className="aboutme-nav">
        {/* Use Link instead of a */}
        <Link to="/readinglist">Reading List</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/notebook">Notebook</Link>
        <Link to="/">Profile</Link>
        {/* <a href="#readinglist">Reading List</a>
        <a href="#projects">Projects</a>
        <a href="#notebook">Notebook</a>
        <a href="#myprofile">My profile</a> */}
      </nav>
    </header>
  );
}

export default Header;
