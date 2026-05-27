import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addProductAsync, deleteProductAsync, editProductAsync } from '../store/productsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Безопасное извлечение данных
  const userMessages = useSelector(state => state.messages?.items || []);
  const products = useSelector(state => state.products?.items || []);
  const currentUser = useSelector(state => state.auth?.user || null);
  const allOrders = useSelector(state => state.orders?.items || []);

  const user = currentUser || {
    name: "Неизвестный пользователь",
    email: "unknown@email.com",
    phone: "Не указан",
    joinDate: "Январь 2026",
    avatar: 'https://via.placeholder.com/150?text=User',
    role: 'user'
  };

  // Стейты профиля пользователя
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(currentUser || {});
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || '');
  const [saving, setSaving] = useState(false);

  // Стейты управления товарами (Админ)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Овощи', image: '' });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductForm, setEditProductForm] = useState({ name: '', price: '', category: '', image: '' });

  // Функции профиля
  const getAvatarSrc = (avatar) => {
    if (!avatar) return 'https://via.placeholder.com/150?text=User';
    if (typeof avatar === 'string' && avatar.startsWith('data:')) return avatar;
    if (typeof avatar === 'string' && (avatar.startsWith('http://') || avatar.startsWith('https://'))) return avatar;
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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedUser = { ...editData, avatar: avatarUrl || editData.avatar };
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

  // Функции управления товарами
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const productData = {
      ...newProduct,
      id: Date.now().toString(),
      price: Number(newProduct.price)
    };
    dispatch(addProductAsync(productData)); 
    setNewProduct({ name: '', price: '', category: 'Овощи', image: '' }); // Сброс с учетом картинки
    alert('Продукт успешно добавлен в каталог!');
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditProductForm({ 
      name: product.name, 
      price: product.price, 
      category: product.category,
      image: product.image || '' // Добавили картинку
    });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  const handleSaveEdit = (id) => {
    if (!editProductForm.name || !editProductForm.price) return;
    dispatch(editProductAsync({ ...editProductForm, id, price: Number(editProductForm.price) }));
    setEditingProductId(null);
  };

  // Оптимизированный расчет статистики
  const salesData = React.useMemo(() => {
    const stats = {};
    let totalRevenue = 0;
    let totalItemsSold = 0;

    allOrders.forEach(order => {
      totalRevenue += order.totalPrice || 0;
      order.items.forEach(item => {
        totalItemsSold += item.quantity;
        if (!stats[item.name]) {
          const catalogProduct = products.find(p => p.name === item.name);
          stats[item.name] = {
            name: item.name,
            category: catalogProduct ? catalogProduct.category : 'Разное',
            quantitySold: 0,
            totalRevenue: 0
          };
        }
        stats[item.name].quantitySold += item.quantity;
        stats[item.name].totalRevenue += item.quantity * item.price;
      });
    });

    return {
      productsSales: Object.values(stats),
      totalRevenue,
      totalOrdersCount: allOrders.length,
      totalItemsSold
    };
  }, [allOrders, products]);

  // Рендер режима редактирования профиля
  if (isEditing) {
    return (
      <div className="profile-page" style={{ padding: '40px 0' }}>
        <div className="profile-card">
          <h2 style={{ marginTop: '0', marginBottom: '30px' }}>Редактирование профиля</h2>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Имя</label>
              <input type="text" value={editData.name || ''} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
              <input type="email" value={editData.email || ''} onChange={(e) => setEditData({...editData, email: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Телефон</label>
              <input type="tel" value={editData.phone || ''} onChange={(e) => setEditData({...editData, phone: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>URL фото профиля</label>
              <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Или загрузить файл</label>
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setAvatarUrl(reader.result);
                  reader.readAsDataURL(file);
                }} />
              </div>
              {avatarUrl && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>Предпросмотр:</p>
                  <img src={getAvatarSrc(avatarUrl)} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button type="submit" className="cta-button" disabled={saving} style={{ padding: '12px 25px', opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '12px 25px', background: 'none', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#6b7280' }}>
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Основной рендер профиля
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
          <div className="detail-item"><strong>Email:</strong> <span>{user.email}</span></div>
          <div className="detail-item"><strong>Телефон:</strong> <span>{user.phone}</span></div>
          <div className="detail-item"><strong>На сайте с:</strong> <span>{user.joinDate}</span></div>
        </div>

        <div className="profile-actions" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button onClick={() => { setEditData(currentUser); setAvatarUrl(currentUser?.avatar || ''); setIsEditing(true); }} className="cta-button" style={{ padding: '10px 20px' }}>
            Редактировать
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Выйти из аккаунта
          </button>
        </div>

        {/* ИСТОРИЯ ЗАКАЗОВ ЮЗЕРА */}
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>📦 История ваших заказов</h3>
          {(() => {
            const userOrders = allOrders.filter(order => order.userEmail === user.email);
            return userOrders.length === 0 ? (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>У вас пока нет совершенных покупок.</p>
            ) : (
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr><th>Дата и время</th><th>Купленные товары</th><th>Итоговая сумма</th></tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: '600', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{order.date}</td>
                        <td>
                          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {order.items.map((item, idx) => (
                              <li key={idx}><strong style={{ color: 'var(--color-primary)' }}>{item.name}</strong> — {item.quantity} шт. x {item.price} тг</li>
                            ))}
                          </ul>
                        </td>
                        <td style={{ fontWeight: '700', color: '#10b981', fontSize: '1.1rem' }}>{order.totalPrice} тг</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>

        {/* ПАНЕЛЬ АДМИНИСТРАТОРА */}
        {user.role === 'admin' && (
          <>
            <div style={{ marginTop: '50px', padding: '30px', border: '1px solid #10b981', borderRadius: '20px', backgroundColor: 'var(--bg-secondary)' }}>
              <h2 style={{ color: '#10b981', marginTop: '0', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>📊 Аналитика и статистика продаж</h2>
              
              <div className="admin-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>💰</span><h4 style={{ margin: '10px 0 5px 0', color: '#6b7280' }}>Общая выручка</h4><strong style={{ fontSize: '1.4rem', color: '#10b981' }}>{salesData.totalRevenue} тг</strong>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>📈</span><h4 style={{ margin: '10px 0 5px 0', color: '#6b7280' }}>Всего заказов</h4><strong style={{ fontSize: '1.4rem', color: '#111827' }}>{salesData.totalOrdersCount} шт.</strong>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>🧺</span><h4 style={{ margin: '10px 0 5px 0', color: '#6b7280' }}>Продано продуктов</h4><strong style={{ fontSize: '1.4rem', color: '#10b981' }}>{salesData.totalItemsSold} кг/шт</strong>
                </div>
              </div>

              <h3>Продажи по категориям и продуктам</h3>
              {salesData.productsSales.length === 0 ? (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Продаж пока не зафиксировано.</p>
              ) : (
                <div className="orders-table-container" style={{ background: 'white' }}>
                  <table className="orders-table">
                    <thead><tr><th>Название товара</th><th>Категория</th><th>Количество продано</th><th>Суммарная выручка</th></tr></thead>
                    <tbody>
                      {salesData.productsSales.map((stat, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: '600', color: '#111827' }}>{stat.name}</td>
                          <td><span style={{ padding: '4px 12px', borderRadius: '20px', backgroundColor: '#f3f4f6', fontSize: '0.85rem', fontWeight: '600', color: '#4b5563' }}>{stat.category}</span></td>
                          <td style={{ fontWeight: '600', color: '#374151' }}>{stat.quantitySold} шт.</td>
                          <td style={{ fontWeight: '700', color: '#10b981' }}>{stat.totalRevenue} тг</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={{ marginTop: '50px', padding: '30px', border: '2px dashed #10b981', borderRadius: '20px', backgroundColor: '#f0fdf4' }}>
              <h2 style={{ color: '#10b981', marginTop: '0', display: 'flex', alignItems: 'center', gap: '10px' }}>🛠 Панель управления каталогом</h2>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Добавить новый товар</h3>
                <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input placeholder="Название продукта" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} style={{ flex: 1, padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <input type="number" placeholder="Цена (тг)" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} style={{ width: '120px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                    <option>Овощи</option><option>Молочные продукты</option><option>Фрукты</option>
                  </select>
                  <input 
                    placeholder="URL фото (ссылка)" 
                    value={newProduct.image} 
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    style={{ flex: 1, minWidth: '150px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} 
                  />
                  <button type="submit" className="cta-button" style={{ padding: '12px 25px' }}>Добавить</button>
                </form>
              </div>

              <div>
                <h3>Управление товарами ({products.length})</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  {products.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                      {editingProductId === p.id ? (
                        <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
                          <input value={editProductForm.name} onChange={(e) => setEditProductForm({...editProductForm, name: e.target.value})} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                          <select value={editProductForm.category} onChange={(e) => setEditProductForm({...editProductForm, category: e.target.value})} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                            <option>Овощи</option><option>Молочные продукты</option><option>Фрукты</option>
                          </select>
                          <input type="number" value={editProductForm.price} onChange={(e) => setEditProductForm({...editProductForm, price: e.target.value})} style={{ width: '90px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                          <input 
                            placeholder="URL фото" 
                            value={editProductForm.image} 
                            onChange={(e) => setEditProductForm({...editProductForm, image: e.target.value})}
                            style={{ width: '120px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} 
                          />
                          <button onClick={() => handleSaveEdit(p.id)} style={{ background: '#d1fae5', border: 'none', color: '#059669', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Сохранить</button>
                          <button onClick={handleCancelEdit} style={{ background: '#f3f4f6', border: 'none', color: '#4b5563', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Отмена</button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{p.name}</span>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem', marginLeft: '10px' }}>({p.category})</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <strong style={{ color: '#10b981', marginRight: '10px' }}>{p.price} тг</strong>
                            <button onClick={() => handleEditClick(p)} style={{ background: '#e0f2fe', border: 'none', color: '#0284c7', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Редактировать</button>
                            <button onClick={() => dispatch(deleteProductAsync(p.id))} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Удалить</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {products.length === 0 && <p style={{ textAlign: 'center', color: '#9ca3af', margin: '20px 0' }}>Каталог пуст</p>}
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