import { createSlice } from '@reduxjs/toolkit';

// загрузка оку 
const savedCart = JSON.parse(localStorage.getItem('cart_items')) || [];

const initialState = {
  items: savedCart,
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('cart_items', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state.items); // сохр
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items); 
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToLocalStorage(state.items); м
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items); 
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;