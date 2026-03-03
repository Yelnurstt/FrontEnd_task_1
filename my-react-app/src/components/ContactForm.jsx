import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', message: '' });

  //3: onChange отслеживает ввод текста в поля
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //4: onSubmit предотвращает перезагрузку страницы и выводит данные
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Сообщение отправлено от ${formData.name}: ${formData.message}`);
    setFormData({ name: '', message: '' }); 
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Связаться с фермером</h3>
      <input 
        type="text" 
        name="name" 
        placeholder="Ваше имя" 
        value={formData.name}
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