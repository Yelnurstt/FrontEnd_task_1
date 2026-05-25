import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))
      ) : (
        <p>В этой категории нет товаров.</p>
      )}
    </div>
  );
}

export default ProductList;