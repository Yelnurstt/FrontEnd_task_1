import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
      <h2>О проекте AgroMarket</h2>
      <p>
        <strong>AgroMarket</strong> - это современная платформа, созданная для того, чтобы 
        сократить путь между фермерским полем и вашим столом.
      </p>
      <p>
        Наша миссия - закрыть урок 90 + и  поддержка локальных производителей и обеспечение городских жителей 
        самыми свежими, экологически чистыми продуктами без лишних наценок супермаркетов.
      </p>
      <div className="about-highlight" style={{ marginTop: '30px' }}>
        <h4>Почему выбирают нас?</h4>
        <ul>
          <li>Краш Елнұр</li>
          <li>Самый лучший препод</li>
          <li>Қазақстанның жарқын болашағы үшін</li>
        </ul>
      </div>
    </div>
  );
};

export default About;