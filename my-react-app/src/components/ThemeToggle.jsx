import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

function ThemeToggle() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <button 
      onClick={() => dispatch(toggleTheme())}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '20px'
      }}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default ThemeToggle;