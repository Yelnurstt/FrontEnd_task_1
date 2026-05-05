import { createSlice } from '@reduxjs/toolkit';

const initialReviews = [
  {
    id: 1,
    author: 'Анна С.',
    rating: 5,
    text: 'Заказывала свежую морковь и яблоки. Всё привезли очень быстро, продукты пахнут настоящей деревней! Буду заказывать еще.',
    date: '10.05.2026, 14:30',
    replies: [
      { id: 101, author: 'AgroMarket (Админ)', text: 'Анна, спасибо большое за ваш теплый отзыв! Стараемся для вас.', date: '10.05.2026, 15:00' }
    ]
  },
  {
    id: 2,
    author: 'Ерлан',
    rating: 4,
    text: 'Молоко отличное, но доставку задержали на полчаса. В остальном всё супер.',
    date: '11.05.2026, 09:15',
    replies: []
  }
];

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: initialReviews,
  },
  reducers: {
    addReview: (state, action) => {
      state.items.unshift(action.payload); 
    },
    addReply: (state, action) => {
      const { reviewId, reply } = action.payload;
      const review = state.items.find(r => r.id === reviewId);
      if (review) {
        review.replies.push(reply);
      }
    }
  },
});

export const { addReview, addReply } = reviewsSlice.actions;
export default reviewsSlice.reducer;