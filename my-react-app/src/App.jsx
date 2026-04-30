import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/About'; 
import Profile from './components/Profile'; 

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
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;