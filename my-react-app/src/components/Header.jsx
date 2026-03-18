import React from 'react';

function Header({ onNavigate }) {
  return (
    <header className="header">
      <div 
        className="logo" 
        onClick={() => onNavigate('home')} 
        style={{cursor: 'pointer'}}
      >
        NECTAR
      </div>
      <nav className="nav-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Главная</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }}>Каталог</a>
      </nav>
    </header>
  );
}

export default Header;