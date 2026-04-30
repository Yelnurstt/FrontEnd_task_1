import React from 'react';

function Cart({ cartItems, onRemove, onIncrease, onDecrease }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <h3>🛒 Корзина ({totalItemsCount})</h3>
      {cartItems.length > 0 ? (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item" style={{ alignItems: 'center' }}>
              
              <span>{item.icon} {item.name} - {item.price * item.quantity} тг</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => onDecrease(item.id)} 
                  disabled={item.quantity <= 1}
                  style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    border: '1px solid #d1d5db', 
                    background: item.quantity <= 1 ? '#f3f4f6' : '#fff',
                    cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  -
                </button>
                
                <strong style={{ color: '#10b981', minWidth: '15px', textAlign: 'center' }}>
                  {item.quantity}
                </strong>
                
                <button 
                  onClick={() => onIncrease(item.id)}
                  style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    border: '1px solid #d1d5db', 
                    background: '#fff',
                    cursor: 'pointer' 
                  }}
                >
                  +
                </button>

                <button className="remove-btn" onClick={() => onRemove(item.id)} style={{ marginLeft: '4px' }}>
                  ❌
                </button>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cart">Ваша корзина пуста.</p>
      )}
      <h4>Итого: {total} тг</h4>
    </div>
  );
}

export default Cart;