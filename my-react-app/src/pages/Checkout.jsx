import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { addOrder } from '../store/ordersSlice'; // <-- Импортируем экшен добавления заказа
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Checkout() {
  const { cartItems, totalPrice, totalItemsCount } = useCart();
  const currentUser = useSelector((state) => state.auth.user); // <-- Получаем текущего юзера
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ address: '', cardNumber: '', expiry: '', cvv: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Ваша корзина пуста</h2>
        <button className="cta-button" onClick={() => navigate('/catalog')}>Вернуться в каталог</button>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.address || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      setError('Неверный номер карты (должно быть 16 цифр).');
      return;
    }

    setIsProcessing(true);

    try {
      // Имитация запроса к банку (2 секунды)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Сбор данных о заказе перед очисткой корзины
      const orderData = {
        id: Date.now(),
        userEmail: currentUser?.email || 'guest', // Привязываем к email текущего юзера
        date: new Date().toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalPrice
      };

      // Сохраняем в историю заказов Redux
      dispatch(addOrder(orderData));
      
      // Очищаем корзину
      dispatch(clearCart());
      
      alert('Оплата прошла успешно! Ваш заказ оформлен и добавлен в историю.');
      navigate('/profile');
    } catch (err) {
      setError('Ошибка при обработке платежа.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Оформление заказа</h2>
        <div className="order-summary">
          <h3>Сумма к оплате: <span style={{ color: '#10b981' }}>{totalPrice} тг</span></h3>
          <p>Товаров в заказе: {totalItemsCount} шт.</p>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

        <form onSubmit={handlePayment} className="checkout-form">
          <div className="form-group">
            <label>Адрес доставки</label>
            <input 
              type="text" 
              placeholder="г. Алматы, ул. Абая 123, кв. 45" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="payment-card-box">
            <h4>Данные карты</h4>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Номер карты (16 цифр)" 
                maxLength="16"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value.replace(/\D/g, '')})}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="ММ/ГГ" 
                  maxLength="5"
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <input 
                  type="password" 
                  placeholder="CVV" 
                  maxLength="3"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="cta-button" 
            disabled={isProcessing}
            style={{ width: '100%', marginTop: '20px', opacity: isProcessing ? 0.7 : 1 }}
          >
            {isProcessing ? 'Обработка платежа...' : `Оплатить ${totalPrice} тг`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;