import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../hooks/useCart';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { totalItemsCount } = useCart(); // castom
  
  const dispatch = useDispatch();

  const getLinkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#10b981' : '', 
    fontWeight: isActive ? '700' : '600'
  });

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>AgroMarket</Link>
      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/" style={getLinkStyle}>Главная</NavLink>
        <NavLink to="/catalog" style={getLinkStyle}>
          Каталог {totalItemsCount > 0 && `(${totalItemsCount})`}
        </NavLink>
        <NavLink to="/about" style={getLinkStyle}>О нас</NavLink> 
        <NavLink to="/profile" style={getLinkStyle}>Профиль</NavLink>
        <ThemeToggle />
        
      </nav>
    </header>
  );
}

export default Header;