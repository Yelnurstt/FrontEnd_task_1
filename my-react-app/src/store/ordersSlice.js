import { createSlice } from '@reduxjs/toolkit';

// Загружаем сохраненные заказы из localStorage
const savedOrders = JSON.parse(localStorage.getItem('user_orders')) || [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: savedOrders,
  },
  reducers: {
    addOrder: (state, action) => {
      // Добавляем новый заказ в начало списка (чтобы свежие были сверху)
      state.items.unshift(action.payload);
      // Сохраняем обновленный массив в localStorage
      localStorage.setItem('user_orders', JSON.stringify(state.items));
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;