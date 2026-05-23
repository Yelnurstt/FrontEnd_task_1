import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuth') === 'true',
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuth', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('isAuth', 'false');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;