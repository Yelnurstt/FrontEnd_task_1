import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

// Компоненты-заглушки для демонстрации новых маршрутов
const Profile = () => (
  <div style={{ padding: '20px' }}>
    <h2>Личный кабинет</h2>
    <Outlet /> 
  </div>
);

const ProfileSettings = () => <h3>Настройки аккаунта</h3>;

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <Routes>
        {/*Главная страница */}
        <Route path="/" element={<Home />} />
        
        {/*Каталог */}
        <Route path="/catalog" element={<MainContent />} />
        
        {/* Корзина */}
        <Route path="/cart" element={<div style={{padding: '20px'}}><h2>Корзина</h2></div>} />
        
        {/*Профиль (Родительский маршрут) */}
        <Route path="/profile" element={<Profile />}>
          {/*Настройки (Вложенный маршрут: /profile/settings) */}
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;