import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  // Состояние для отслеживания текущей страницы
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app-container">
      {/* Передаем функцию смены страницы в шапку */}
      <Header onNavigate={setCurrentPage} />
      
      {/* Условный рендеринг: если 'home', показываем Home, иначе MainContent */}
      {currentPage === 'home' ? (
        <Home onGoToCatalog={() => setCurrentPage('catalog')} />
      ) : (
        <MainContent />
      )}

      <Footer />
    </div>
  );
}

export default App;