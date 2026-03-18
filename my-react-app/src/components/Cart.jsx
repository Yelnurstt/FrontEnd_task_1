import React from 'react';

function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h3>🛒 Корзина ({cartItems.length})</h3>
      {cartItems.length > 0 ? (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.icon} {item.name} - ${item.price}</span>
              <button className="remove-btn" onClick={() => onRemove(index)}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cart">Ваша корзина пуста.</p>
      )}
      <h4>Итого: ${total.toFixed(2)}</h4>
    </div>
  );
}

export default Cart;