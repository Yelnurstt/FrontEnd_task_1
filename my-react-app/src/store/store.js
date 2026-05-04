import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice'; 
import cartReducer from './cartSlice';
import productsReducer from './productsSlice'; 
import messagesReducer from './messagesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer, 
    cart: cartReducer,
    products: productsReducer,
    messages: messagesReducer,
  },
});