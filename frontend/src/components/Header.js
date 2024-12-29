import React, { useState } from 'react';
import './Header.css';
import profile from './../assets/profile.png';
import logo from './../assets/logo.png';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="header-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="header-logo">
     <img src={logo}/>
     <h1>𝐸𝓁𝒾𝓉𝑒𝑀𝒶𝓇𝓉</h1>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Search..."
        />
        <button>Search</button>
      </div>

      <div className="header-profile">
        <img src={profile} alt="Profile" />
        <span>Admin</span>
      </div>
    </header>
  );
};

export default Header;
