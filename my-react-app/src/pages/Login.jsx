import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login()); 
    navigate('/profile'); 
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Вход в систему</h2>
      <p>Для доступа к профилю необходимо авторизоваться.</p>
      <button className="cta-button" onClick={handleLogin}>
        Войти (Мок-авторизация)
      </button>
    </div>
  );
}

export default Login;