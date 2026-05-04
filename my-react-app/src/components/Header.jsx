import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import ThemeToggle from './ThemeToggle';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
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
      </nav>
    </header>
  );
}

export default Header;