import React, { useState } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import Cart from './Cart';
import ContactForm from './ContactForm';

const PRODUCTS_DATA = [
  { id: 1, name: 'Органические помидоры', price: 3, category: 'Овощи' },
  { id: 2, name: 'Картофель', price: 1.5, category: 'Овощи' },
  { id: 3, name: 'Фермерское молоко', price: 2, category: 'Молочные продукты' },
  { id: 4, name: 'Сладкие яблоки', price: 2.5, category: 'Фрукты' },
];

const CATEGORIES = ['Все', 'Овощи', 'Молочные продукты', 'Фрукты'];

function MainContent() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  
  const filteredProducts = selectedCategory === 'Все' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // НОВАЯ ФУНКЦИЯ: удаление из корзины по индексу
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((item, index) => index !== indexToRemove));
  };

  return (
    <main className="main-content">
      <div className="store-section">
        <h2>Наши свежие продукты</h2>
        
        <CategoryFilter 
          categories={CATEGORIES} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <ProductList 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
        />
      </div>

      <div className="sidebar-section">
        {/* Передаем функцию удаления в корзину */}
        <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />
        <ContactForm />
      </div>
    </main>
  );
}

export default MainContent;