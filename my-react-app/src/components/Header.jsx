import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; 

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>NECTAR</Link>
      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/about">О нас</Link> 
        <Link to="/profile">Профиль</Link>
        <ThemeToggle /> {/* Вставляем переключатель */}
      </nav>
    </header>
  );
}

export default Header;