import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import './style/feedback.css';

const Feedback: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        if (!response.ok) throw new Error('Ошибка при загрузке отзывов');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Ошибка:', err);
      }
    };
    fetchReviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / reviewsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(reviews.length / reviewsPerPage)) % Math.ceil(reviews.length / reviewsPerPage));
  };

  const visibleReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  return (
    <div className="feedback">
      <div className="container">
        <h2 className="feedback__title">ОТЗЫВЫ</h2>
        {reviews.length > 0 ? (
          <>
            <div className="feedback__cardsWrap">
              {visibleReviews.map((review, index) => (
                <FeedbackCard
                  key={index}
                  name={review.name}
                  description={review.text}
                />
              ))}
            </div>
            {reviews.length > reviewsPerPage && (
              <div className="feedback__controls">
                <button className="feedback__prev" onClick={prevSlide}>←</button>
                <button className="feedback__next" onClick={nextSlide}>→</button>
              </div>
            )}
          </>
        ) : (
          <p>Нет отзывов.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;