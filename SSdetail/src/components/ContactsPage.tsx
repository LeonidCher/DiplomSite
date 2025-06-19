import React from 'react';
import './style/contacts.css';

const ContactsPage: React.FC = () => {
  
  return (
    <div className="contacts-page">
      <div className="container">
        <h1 className="contacts-title">Контакты</h1>
        <div className="contact-info">
          <p><strong>Адрес:</strong> г. Ульяновск, ул. Богдана Хмельницкого, д. 30А</p>
          <p><strong>Телефон:</strong> +7 (902) 213-04-56</p>
          <p><strong>Email:</strong> info@ssdetailing.com</p>
          <p><strong>Мессенджеры:</strong>
            <a href="https://t.me/ssdetailing" target="_blank" rel="noopener noreferrer">Telegram</a>
          </p>
        </div>
        <div className="map-container" id="map">
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A1838de2aa7439cf2ee315c4281e6ee84758fab95a59f6b6161ffd265320b4fce&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
        </div>
        {/* <div className="feedback-form">
          <h2>Форма обратной связи</h2>
          <form>
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Ваш email" required />
            <textarea placeholder="Ваше сообщение" required></textarea>
            <button type="submit">Отправить</button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default ContactsPage;