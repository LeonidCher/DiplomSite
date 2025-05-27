import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import './style/feedback.css';

const Feedback: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetching reviews for Feedback...');
        const response = await fetch('http://localhost:5000/api/reviews');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Feedback fetch error:', response.status, errorText);
          throw new Error(`Ошибка при загрузке отзывов: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        // Фильтруем только подтверждённые отзывы
        const approvedReviews = data.filter((review: any) => review.approved);
        setReviews(approvedReviews);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Fetch error in Feedback:', err);
      } finally {
        setLoading(false);
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

  if (loading) return <div className="feedback">Загрузка...</div>;
  if (error) return <div className="feedback">Ошибка: {error}</div>;

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
                <button className="feedback__prev" onClick={prevSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="feedback__next" onClick={nextSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
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