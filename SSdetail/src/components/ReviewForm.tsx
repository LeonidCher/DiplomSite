import React from 'react';
import { useForm } from 'react-hook-form';
import './style/reviewForm.css';

interface ReviewData {
  name: string;
  text: string;
}

const ReviewForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewData>();

  const onSubmit = async (data: ReviewData) => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Отзыв успешно отправлен!');
        reset();
      } else {
        const result = await response.json();
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка сервера, проверь консоль');
    }
  };

  return (
    <div className="review-form__wrap">
      <h2 className="review-form__title">Оставить отзыв</h2>
      <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Имя обязательно" })}
          placeholder="Ваше имя"
          className="review-form__input"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <textarea
          {...register("text", { required: "Текст отзыва обязателен" })}
          placeholder="Ваш отзыв"
          className="review-form__textarea"
        />
        {errors.text && <p className="error">{errors.text.message}</p>}

        <button type="submit" className="review-form__submit">
          Отправить отзыв
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;