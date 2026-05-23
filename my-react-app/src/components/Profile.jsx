import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addProductAsync, deleteProductAsync } from '../store/productsSlice';
import myAvatar from '../assets/IMG_9643.JPG';

const Profile = () => {
  const userMessages = useSelector(state => state.messages.items);
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Овощи' });

  const user = {
    name: "Yelnur Saialubekov",
    email: "yelnur@narxoz.kz",
    phone: "+7 (747) 752-80-83",
    joinDate: "Январь 2026",
    avatar: myAvatar 
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    const productData = {
      ...newProduct,
      id: Date.now(), 
      price: Number(newProduct.price)
    };
    
    dispatch(addProductAsync(productData)); 
    setNewProduct({ name: '', price: '', category: 'Овощи' }); 
    alert('Продукт успешно добавлен в каталог!');
  };

  return (
    <div className="profile-page" style={{ padding: '40px 0' }}>
      <div className="profile-card">
        
        {/* Шапка профиля */}
        <div className="profile-header">
          <img src={user.avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-main-info">
            <h2>{user.name}</h2>
            <p className="profile-status">Статус: Администратор</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div className="detail-item">
            <strong>Телефон:</strong> <span>{user.phone}</span>
          </div>
          <div className="detail-item">
            <strong>На сайте с:</strong> <span>{user.joinDate}</span>
          </div>
        </div>

        <div className="profile-actions" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button className="cta-button" style={{ padding: '10px 20px' }}>Редактировать</button>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '10px 20px', 
              background: 'none', 
              border: '1px solid #ef4444', 
              color: '#ef4444', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Выйти из аккаунта
          </button>
        </div>

        <div style={{ marginTop: '50px', padding: '30px', border: '2px dashed #10b981', borderRadius: '20px', backgroundColor: '#f0fdf4' }}>
          <h2 style={{ color: '#10b981', marginTop: '0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🛠 Панель администратора
          </h2>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Добавить новый товар</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                placeholder="Название продукта" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                style={{ flex: 1, padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
              <input 
                type="number" 
                placeholder="Цена (тг)" 
                value={newProduct.price} 
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                style={{ width: '120px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
              <select 
                value={newProduct.category} 
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              >
                <option>Овощи</option>
                <option>Молочные продукты</option>
                <option>Фрукты</option>
              </select>
              <button type="submit" className="cta-button" style={{ padding: '12px 25px' }}>
                Добавить
              </button>
            </form>
          </div>

          <div>
            <h3>Управление товарами ({products.length})</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <span style={{ fontWeight: '600', color: '#111827' }}>{p.name}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.9rem', marginLeft: '10px' }}>({p.category})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <strong style={{ color: '#10b981' }}>{p.price} тг</strong>
                    <button 
                      onClick={() => dispatch(deleteProductAsync(p.id))}
                      style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p style={{ textAlign: 'center', color: '#9ca3af', margin: '20px 0' }}>Каталог пуст</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <h3>Входящие обращения ({userMessages.length})</h3>
          {userMessages.length === 0 ? (
            <p style={{ color: '#6b7280' }}>Новых сообщений нет.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {userMessages.map((msg) => (
                <div key={msg.id} style={{ padding: '15px', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>От: {msg.name} ({msg.email})</strong>
                    <small style={{ color: '#9ca3af' }}>{msg.date}</small>
                  </div>
                  <p style={{ margin: 0, color: '#4b5563' }}>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;