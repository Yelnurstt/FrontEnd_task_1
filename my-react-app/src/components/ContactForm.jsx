import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Сообщение отправлено!\nИмя: ${formData.name}\nEmail: ${formData.email}\nТекст: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Связаться с нами</h3>
      <input 
        type="text" 
        name="name" 
        placeholder="Ваше имя" 
        value={formData.name}
        onChange={handleChange}
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Ваш Email" 
        value={formData.email}
        onChange={handleChange}
        required 
      />
      <textarea 
        name="message" 
        placeholder="Ваше сообщение" 
        value={formData.message}
        onChange={handleChange}
        required 
      />
      <button type="submit">Отправить сообщение</button>
    </form>
  );
}

export default ContactForm;