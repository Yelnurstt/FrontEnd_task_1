import React from 'react';

function Cart({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h3>🛒 Корзина ({cartItems.length} товаров)</h3>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.icon} {item.name} - ${item.price}</li>
          ))}
        </ul>
      ) : (
        <p>Ваша корзина пуста.</p>
      )}
      <h4>Итого: ${total.toFixed(2)}</h4>
    </div>
  );
}

export default Cart;