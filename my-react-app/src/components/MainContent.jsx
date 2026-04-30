import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import Cart from './Cart';
import ContactForm from './ContactForm';

// фейк база
const PRODUCTS_DATA = [
  { id: 1, name: 'Органические помидоры', price: 3000, category: 'Овощи },
  { id: 2, name: 'Картофель', price: 1500, category: 'Овощи'},
  { id: 3, name: 'Фермерское молоко', price: 2000, category: 'Молочные продукты },
  { id: 4, name: 'Сладкие яблоки', price: 2500, category: 'Фрукты},
];

const CATEGORIES = ['Все', 'Овощи', 'Молочные продукты', 'Фрукты'];

function MainContent() {
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); //загрузкa
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    setIsLoading(true);
    
    // спинер
    const timer = setTimeout(() => {
      setProducts(PRODUCTS_DATA); 
      setIsLoading(false); 
    }, 1500);

    return () => clearTimeout(timer); // таймер сброс
  }, []); 

  // Фильтр
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  //КОРЗИНА
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
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
        
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Загружаем свежие товары с грядки...</p>
          </div>
        ) : (
          <ProductList 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </div>

      <div className="sidebar-section">
        <Cart 
          cartItems={cartItems} 
          onRemove={handleRemoveFromCart} 
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
        />
        <ContactForm />
      </div>
    </main>
  );
}

export default MainContent;