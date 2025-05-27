import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import './style/footer.css';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p>© 2025 SS Detailing. Все права защищены.</p>
          <p>г. Москва, ул. Примерная, д. 10 | +7 (999) 123-45-67</p>
          <button className="footer__review-button" onClick={openModal}>
            Оставить отзыв
          </button>
        </div>
        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
              <button className="modal__close" onClick={closeModal}>×</button>
              <ReviewForm />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;