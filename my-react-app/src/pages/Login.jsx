import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      const user = users.find(u => u.email === email);
      
      if (!user) {
        setError('Пользователь не найден');
        setLoading(false);
        return;
      }
      
      if (user.password !== password) {
        setError('Неверный пароль');
        setLoading(false);
        return;
      }

      // Успешный логин
      dispatch(login(user));
      navigate('/profile');
    } catch (err) {
      setError('Ошибка при входе. Попробуйте позже.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || !name) {
      setError('Заполните все поля');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      if (users.find(u => u.email === email)) {
        setError('Этот email уже зарегистрирован');
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        phone: phone || 'Не указан',
        joinDate: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' }),
        role: 'user',
        avatar: 'https://via.placeholder.com/150?text=' + encodeURIComponent(name.charAt(0)),
      };

      const registerResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (registerResponse.ok) {
        const createdUser = await registerResponse.json();
        dispatch(login(createdUser));
        navigate('/profile');
      }
    } catch (err) {
      setError('Ошибка при регистрации. Попробуйте позже.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      {!isRegistering ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Вход в систему</h2>
          {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{error}</p>}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

            <button
              type="submit"
              className="cta-button"
              disabled={loading}
              style={{
                padding: '12px 20px',
                marginTop: '10px',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
            Нет аккаунта?{' '}
            <button
              onClick={() => setIsRegistering(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#10b981',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline'
              }}
            >
              Зарегистрируйтесь
            </button>
          </p>

          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0' }}>
              <strong>Для входа как администратор:</strong><br/>
              Email: yelnur@narxoz.kz<br/>
              Пароль: admin123
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Регистрация</h2>
          {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>{error}</p>}
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Телефон (опционально)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (700) 000-00-00"
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

            <button
              type="submit"
              className="cta-button"
              disabled={loading}
              style={{
                padding: '12px 20px',
                marginTop: '10px',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
            Уже есть аккаунт?{' '}
            <button
              onClick={() => setIsRegistering(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#10b981',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline'
              }}
            >
              Войдите
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;