import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Добавляем импорт
import Header from './components/Header';
import Home from './components/Home';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

const Profile = () => (
  <div style={{ padding: '20px' }}>
    <h2>Личный кабинет</h2>
    <Outlet /> 
  </div>
);

const ProfileSettings = () => <h3>Настройки аккаунта</h3>;

function App() {
  // Достаем текущую тему
  const theme = useSelector((state) => state.theme.value);

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<MainContent />} />
        <Route path="/about" element={<div style={{padding: '40px'}}><h2>О нас</h2><p>AgroMarket — платформа...</p></div>} />
        
        <Route path="/profile" element={<Profile />}>
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;