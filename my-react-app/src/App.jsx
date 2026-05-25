import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import MainContent from './pages/MainContent'; 
import About from './pages/About'; 
import Login from './pages/Login';
import Profile from './pages/Profile'; 
import Checkout from './pages/Checkout';
import Reviews from './pages/Reviews';

function App() {
  const theme = useSelector((state) => state.theme.value);

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<MainContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;