import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">NECTAR</Link>
      <nav className="nav-links">
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </header>
  );
}

export default Header;