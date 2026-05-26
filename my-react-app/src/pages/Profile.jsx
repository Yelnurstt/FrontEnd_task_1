import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addProductAsync, deleteProductAsync } from '../store/productsSlice';

const Profile = () => {
  const userMessages = useSelector(state => state.messages.items);
  const products = useSelector(state => state.products.items);
  const currentUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Овощи' });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(currentUser || {});
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || '');
  const [saving, setSaving] = useState(false);

  const getAvatarSrc = (avatar) => {
    if (!avatar) return 'https://via.placeholder.com/150?text=User';
    // data URL (base64)
    if (typeof avatar === 'string' && avatar.startsWith('data:')) return avatar;
    // absolute url
    if (typeof avatar === 'string' && (avatar.startsWith('http://') || avatar.startsWith('https://'))) return avatar;
    // local asset reference like 'local:IMG_9643.JPG' or filename
    if (typeof avatar === 'string') {
      const localPrefix = 'local:';
      const fname = avatar.startsWith(localPrefix) ? avatar.slice(localPrefix.length) : avatar;
      try {
        return new URL(`../assets/${fname}`, import.meta.url).href;
      } catch (e) {
        return 'https://via.placeholder.com/150?text=User';
      }
    }
    return 'https://via.placeholder.com/150?text=User';
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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedUser = {
        ...editData,
        avatar: avatarUrl || editData.avatar,
      };

      const response = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const savedUser = await response.json();
        dispatch(updateUser(savedUser));
        setIsEditing(false);
        alert('Профиль успешно обновлен!');
      }
    } catch (err) {
      alert('Ошибка при сохранении профиля');
      console.error(err);
    }
    setSaving(false);
  };

  const user = currentUser || {
    name: "Неизвестный пользователь",
    email: "unknown@email.com",
    phone: "Не указан",
    joinDate: "Январь 2026",
    avatar: 'https://via.placeholder.com/150?text=User',
    role: 'user'
  };

  if (isEditing) {
    return (
      <div className="profile-page" style={{ padding: '40px 0' }}>
        <div className="profile-card">
          <h2 style={{ marginTop: '0', marginBottom: '30px' }}>Редактирование профиля</h2>
          
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Имя</label>
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Телефон</label>
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>URL фото профиля</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg or local:IMG_9643.JPG"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />

              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Или загрузить файл</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setAvatarUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>

              {avatarUrl && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>Предпросмотр:</p>
                  <img src={getAvatarSrc(avatarUrl)} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button
                type="submit"
                className="cta-button"
                disabled={saving}
                style={{
                  padding: '12px 25px',
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '12px 25px',
                  background: 'none',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#6b7280'
                }}
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ padding: '40px 0' }}>
      <div className="profile-card">
        
        {/* Шапка профиля */}
        <div className="profile-header">
          <img src={getAvatarSrc(user.avatar)} alt="Avatar" className="profile-avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
          <div className="profile-main-info">
            <h2>{user.name}</h2>
            <p className="profile-status">Статус: {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
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
          <button 
            onClick={() => {
              setEditData(currentUser);
              setAvatarUrl(currentUser?.avatar || '');
              setIsEditing(true);
            }}
            className="cta-button" 
            style={{ padding: '10px 20px' }}
          >
            Редактировать
          </button>
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

        {user.role === 'admin' && (
          <>
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
          </>
        )}

      </div>
    </div>
  );
};

export default Profile;