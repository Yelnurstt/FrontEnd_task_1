import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice'; 
import cartReducer from './cartSlice';
import productsReducer from './productsSlice'; 
import messagesReducer from './messagesSlice';
import reviewsReducer from './reviewsSlice'; 
import ordersReducer from './ordersSlice'; 

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer, 
    cart: cartReducer,
    products: productsReducer,
    messages: messagesReducer,
    reviews: reviewsReducer, 
    orders: ordersReducer, 
  },
});