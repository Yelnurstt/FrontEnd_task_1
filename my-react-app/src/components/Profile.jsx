import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userMessages = useSelector(state => state.messages.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    name: "Yelnur Saialubekov",
    email: "yelnur@narxoz.kz",
    phone: "+7 (747) 752-80-83",
    joinDate: "Январь 2026",
    avatar: "hero-avatar.png" 
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile-page" style={{ padding: '40px 0' }}>
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-main-info">
            <h2>{user.name}</h2>
            <p className="profile-status">Статус: Постоянный покупатель</p>
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

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <h3>Мои обращения ({userMessages.length})</h3>
          {userMessages.length === 0 ? (
            <p>Вы еще не отправляли сообщений.</p>
          ) : (
            <ul>
              {userMessages.map((msg) => (
                <li key={msg.id} style={{ marginBottom: '10px' }}>
                  <strong>{msg.date}</strong> - {msg.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;