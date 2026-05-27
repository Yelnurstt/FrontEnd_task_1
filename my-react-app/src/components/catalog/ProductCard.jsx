import React from 'react';

function ProductCard({ product, onAddToCart }) {
  // Заглушка, если фермер не добавил фото
  const defaultImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=150&auto=format&fit=crop";

  return (
    <div 
      className="product-card" 
      style={{ 
        flexDirection: 'column', 
        alignItems: 'stretch', 
        padding: '16px', 
        gap: '15px' 
      }}
    >
      {/* Крупное фото на всю ширину */}
      <img 
        src={product.image || defaultImage} 
        alt={product.name} 
        style={{ 
          width: '100%', 
          height: '180px', 
          borderRadius: '12px', 
          objectFit: 'cover',
          border: '1px solid #f3f4f6'
        }} 
      />
      
      {/* Инфо продукта */}
      <div className="product-info" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontWeight: '700', fontSize: '1.15rem' }}>
          {product.name}
        </span>
        <span style={{ color: '#10b981', fontSize: '1.05rem', fontWeight: '700' }}>
          {product.price} тг/кг
        </span>
      </div>

      {/* Кнопка на всю ширину, прижатая к низу */}
      <button 
        className="add-to-cart-btn" 
        onClick={() => onAddToCart(product)}
        style={{ 
          width: '100%', 
          marginTop: 'auto', 
          padding: '12px',
          fontSize: '1rem'
        }}
      >
        В корзину
      </button>
    </div>
  );
}

export default ProductCard;