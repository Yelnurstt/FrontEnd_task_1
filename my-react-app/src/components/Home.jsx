
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук
import heroImage from '../assets/hero-bg.png'; 

function Home() { // Убираем onGoToCatalog
  const navigate = useNavigate(); // Инициализируем хук

  return (
    <div className="home-page">
      <div className="hero-content">
        <h1>Свежие продукты напрямую от фермеров</h1>
        <p>Мы связываем честных фермеров...</p>
        {/* Используем хук для перехода */}
        <button className="cta-button" onClick={() => navigate('/catalog')}>
          Смотреть каталог
        </button>
      </div>
      <div className="hero-image-card">
        <img src={heroImage} alt="Экологически чистый продукт" className="hero-img" />
      </div>
    </div>
  );
}

export default Home;