import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview, addReply } from '../store/reviewsSlice';

function Reviews() {
  const reviews = useSelector(state => state.reviews.items);
  const dispatch = useDispatch();

  const [newReview, setNewReview] = useState({ author: '', text: '', rating: 5 });
  
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    const review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleString(),
      replies: []
    };

    dispatch(addReview(review));
    setNewReview({ author: '', text: '', rating: 5 });
    alert('Спасибо! Ваш отзыв опубликован.');
  };

  const handleAddReply = (reviewId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      author: 'Администратор', 
      text: replyText,
      date: new Date().toLocaleString()
    };

    dispatch(addReply({ reviewId, reply }));
    setReplyingTo(null);
    setReplyText('');
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2>Отзывы наших покупателей</h2>
          <p>Почитайте, что пишут люди, которые уже попробовали наши свежие продукты.</p>
        </div>

        <div className="add-review-section">
          <h3>Оставить свой отзыв</h3>
          <form onSubmit={handleAddReview} className="add-review-form">
            <div style={{ display: 'flex', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Ваше имя" 
                value={newReview.author}
                onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                style={{ flex: 1 }}
              />
              <select 
                value={newReview.rating} 
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                style={{ width: '150px' }}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="1">⭐ (1)</option>
              </select>
            </div>
            <textarea 
              placeholder="Поделитесь вашими впечатлениями..." 
              value={newReview.text}
              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              rows="4"
            />
            <button type="submit" className="cta-button" style={{ alignSelf: 'flex-start', padding: '12px 25px' }}>
              Опубликовать отзыв
            </button>
          </form>
        </div>

        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <div className="avatar">{review.author.charAt(0)}</div>
                  <div>
                    <strong>{review.author}</strong>
                    <div className="stars">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              
              <p className="review-text">{review.text}</p>

              {review.replies && review.replies.length > 0 && (
                <div className="replies-section">
                  {review.replies.map(reply => (
                    <div key={reply.id} className="reply-card">
                      <div className="reply-header">
                        <strong>{reply.author}</strong>
                        <span className="review-date">{reply.date}</span>
                      </div>
                      <p>{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="reply-action">
                {replyingTo === review.id ? (
                  <div className="reply-input-box">
                    <textarea 
                      placeholder="Напишите ваш ответ..." 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="cta-button" onClick={() => handleAddReply(review.id)}>Отправить</button>
                      <button className="cancel-btn" onClick={() => setReplyingTo(null)}>Отмена</button>
                    </div>
                  </div>
                ) : (
                  <button className="reply-btn" onClick={() => setReplyingTo(review.id)}>
                    ↩ Ответить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;