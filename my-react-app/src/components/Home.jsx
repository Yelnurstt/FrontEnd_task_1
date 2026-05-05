import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-bg.png'; 
import farmerPhoto from '../assets/Фотка.svg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Свежие продукты напрямую от фермеров</h1>
          <p>Мы связываем честных производителей с вашим столом. Качество, проверенное природой.</p>
          <button className="cta-button" onClick={() => navigate('/catalog')}>
            Смотреть каталог
          </button>
        </div>
        <div className="hero-image-card">
          <img src={heroImage} alt="Экологически чистый продукт" className="hero-img" />
        </div>
      </section>

      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">🌱</span>
            <h3>100% Эко</h3>
            <p>Никаких пестицидов и ГМО. Только натуральные удобрения и любовь к земле.</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🚜</span>
            <h3>Поддержка местных</h3>
            <p>Покупая у нас, вы помогаете локальным семейным фермам развиваться.</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🚚</span>
            <h3>Быстрая доставка</h3>
            <p>Продукты попадают к вам в руки в течение 24 часов после сбора урожая.</p>
          </div>
        </div>
      </section>

      <section className="farmers-world">
        <div className="farmers-world-wrapper">
          
          <div className="farmers-text-block">
            <h2>Мир глазами фермера</h2>
            <p>
              Быть фермером — это не просто работа, это жизнь в ритме природы. 
              Каждое утро наши партнеры выходят в поле, чтобы вырастить то, что станет 
              частью вашего здорового завтрака. Мы верим в прозрачность, поэтому вы всегда 
              знаете, кто именно вырастил ваш продукт.
            </p>
            <p style={{marginTop: '15px', color: 'var(--text-muted)'}}>
              «Для нас AgroMarket — это не просто платформа сбыта, это способ 
              показать городским жителям, сколько труда и любви мы вкладываем в каждый 
              помидор или литр молока.»
            </p>
          </div>

          <div className="farmers-image-block">
            <img 
              src={farmerPhoto} 
              alt="Наш фермер-партнер за работой" 
              className="farmer-side-img" 
            />
          </div>

        </div>
      </section>

      <section className="final-cta">
        <h2>Готовы попробовать настоящее?</h2>
        <p>Переходите в каталог и соберите свою первую корзину свежих продуктов.</p>
        <button className="cta-button" onClick={() => navigate('/catalog')}>
          Перейти к покупкам
        </button>
      </section>
    </div>
  );
}

export default Home;