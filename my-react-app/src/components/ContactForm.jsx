import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice'; // Импортируем экшен

function ContactForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Введите корректный email';
    if (formData.message.length < 10) newErrors.message = 'Минимум 10 символов';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newMessage = {
          ...formData,
          id: Date.now(),
          date: new Date().toLocaleString()
        };

        dispatch(addMessage(newMessage));
        
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-form">
      <h3>Связаться с нами</h3>
      {submitSuccess && <p style={{ color: '#10b981' }}>Сообщение сохранено в базе!</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
        
        <input name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        
        <textarea name="message" placeholder="Сообщение" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
        {errors.message && <span style={{ color: 'red', fontSize: '12px' }}>{errors.message}</span>}
        
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Запись...' : 'Отправить'}</button>
      </form>
    </div>
  );
}

export default ContactForm;