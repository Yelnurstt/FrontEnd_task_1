import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice'; 
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';


import ProductList from '../components/catalog/ProductList';
import CategoryFilter from '../components/catalog/CategoryFilter';
import Cart from '../components/Cart';
import ContactForm from '../components/ContactForm';

const CATEGORIES = ['Все', 'Овощи', 'Молочные продукты', 'Фрукты'];

function MainContent() {
  const dispatch = useDispatch();
  
  // гет состояние товаров из Redux
  const { items: products, status, error } = useSelector(state => state.products);
  const cartItems = useSelector(state => state.cart.items);
  
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="main-content">
      <div className="store-section">
        <h2>Наши свежие продукты</h2>
        
        <CategoryFilter 
          categories={CATEGORIES} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        {status === 'loading' && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Загружаем свежие товары с сервера...</p>
          </div>
        )}

        {status === 'failed' && (
          <div style={{ color: '#ef4444', padding: '20px', textAlign: 'center' }}>
            <h3>Ошибка: {error}</h3>
            <button className="filter-btn" onClick={() => dispatch(fetchProducts())}>Попробовать снова</button>
          </div>
        )}

        {status === 'succeeded' && (
          <ProductList 
            products={filteredProducts} 
            onAddToCart={(product) => dispatch(addToCart(product))} 
          />
        )}
      </div>

      <div className="sidebar-section">
        <Cart 
          onRemove={(id) => dispatch(removeFromCart(id))} 
          onIncrease={(id) => dispatch(increaseQuantity(id))}
          onDecrease={(id) => dispatch(decreaseQuantity(id))}
        />
        <ContactForm />
      </div>
    </main>
  );
}

export default MainContent;