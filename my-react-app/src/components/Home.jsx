import React from 'react';
import heroImage from '../assets/hero-bg.png'; 

function Home({ onGoToCatalog }) {
  return (
    <div className="home-page">
      <div className="hero-content">
        <h1>Свежие продукты напрямую от фермеров</h1>
        <p>
          Мы связываем честных фермеров с людьми, которые ценят натуральное качество. 
          Без посредников - только свежесть и польза.
        </p>
        <button className="cta-button" onClick={onGoToCatalog}>
          Смотреть каталог
        </button>
      </div>
      
      {/* 2. Заменяем текст на тег <img> */}
      <div className="hero-image-card">
        <img src={heroImage} alt="Экологически чистый продукт" className="hero-img" />
      </div>
      
    </div>
  );
}

export default Home;