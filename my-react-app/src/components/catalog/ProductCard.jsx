import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-info">
        <span>{product.icon} {product.name}</span>
        <span> - {product.price} тг/кг</span>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={() => onAddToCart(product)}
      >
        В корзину
      </button>
    </div>
  );
}

export default ProductCard;