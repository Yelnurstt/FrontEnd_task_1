import { createSlice } from '@reduxjs/toolkit';

const savedMessages = JSON.parse(localStorage.getItem('user_messages')) || [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: savedMessages,
  },
  reducers: {
    addMessage: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('user_messages', JSON.stringify(state.items));
    },
    clearMessages: (state) => {
      state.items = [];
      localStorage.removeItem('user_messages');
    }
  },
});

export const { addMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;