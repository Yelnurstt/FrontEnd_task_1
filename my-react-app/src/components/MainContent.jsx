import React from 'react';

function MainContent() {
  return (
    <main className="main-content">
      <h2>Our Fresh Products</h2>
      <div className="product-list">
        <div className="product-card">🍅 Organic Tomatoes - $3/kg</div>
        <div className="product-card">🥔 Fresh Potatoes - $1.5/kg</div>
        <div className="product-card">🥛 Farm Milk - $2/L</div>
      </div>
    </main>
  );
}

export default MainContent;