const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Настройка middleware
app.use(express.json());
app.use(cors());

// Настройка транспорта для nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vlastleonida@gmail.com', // Замени на свой email
    pass: 'yrigjcouksuzfqzg', // Замени на пароль приложения
  },
});

// Проверка подключения nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.error('Ошибка настройки nodemailer:', error);
  } else {
    console.log('Nodemailer готов к отправке писем');
  }
});

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/diplom')
  .then(() => console.log('MongoDB подключена'))
  .catch(err => console.log('Ошибка подключения к MongoDB:', err));

// Схема и модель для заявки
const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carModel: { type: String, required: true },
  service: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateTime: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
});

const Application = mongoose.model('Application', applicationSchema);

// Схема и модель для отзыва
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }, // Добавляем поле для подтверждения
});

const Review = mongoose.model('Review', reviewSchema);

// Email админа
const ADMIN_EMAIL = '4ls2005@mail.ru'; // Замени на email админа

// Маршруты для заявок
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    // Отправка email клиенту
    const clientMailOptions = {
      from: 'your-email@gmail.com',
      to: application.email,
      subject: 'Спасибо за заявку! 🎉',
      html: `
        <h2>Спасибо, ${application.name}, за вашу заявку!</h2>
        <p>Мы получили вашу заявку на услугу "${application.service}" для автомобиля ${application.carModel}. Наш специалист свяжется с вами по телефону ${application.phone} в ближайшее время для подтверждения записи на ${new Date(application.dateTime).toLocaleString()}.</p>
        <p><strong>Скидка 20% ждет вас!</strong> Запишитесь снова или попробуйте наши новые услуги — полировку кузова или тонировку с премиум-покрытием. Качество, которому доверяют с 2020 года!</p>
        <p>Вернитесь к нам на <a href="http://localhost:5173">сайт SS Detailing</a> и получите еще больше преимуществ для вашего авто!</p>
        <p>С уважением,<br/>Команда SS Detailing</p>
      `,
    };

    await transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки email клиенту:', error);
      } else {
        console.log('Email отправлен клиенту:', application.email, info.response);
      }
    });

    // Отправка уведомления админу
    const adminMailOptions = {
      from: 'your-email@gmail.com',
      to: ADMIN_EMAIL,
      subject: 'Новая заявка поступила! 🚗',
      html: `
        <h2>Новая заявка от ${application.name}</h2>
        <p>Услуга: ${application.service}</p>
        <p>Автомобиль: ${application.carModel}</p>
        <p>Дата и время: ${new Date(application.dateTime).toLocaleString()}</p>
        <p>Email клиента: ${application.email}</p>
        <p>Телефон клиента: ${application.phone}</p>
        <p>Пожалуйста, подтвердите или отмените заявку в админ-панели.</p>
      `,
    };

    await transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки email админу:', error);
      } else {
        console.log('Email отправлен админу:', ADMIN_EMAIL, info.response);
      }
    });

    res.status(201).json(application);
  } catch (err) {
    console.error('Ошибка при сохранении заявки:', err);
    res.status(400).json({ message: `Ошибка при сохранении заявки: ${err.message}` });
  }
});

app.delete('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }
    res.status(200).json({ message: 'Заявка успешно удалена' });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при удалении заявки: ${err.message}` });
  }
});

app.put('/api/applications/:id/confirm', async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(id, { confirmed: true }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: application.email,
      subject: 'Ваша заявка подтверждена! ✅',
      html: `
        <h2>Здравствуйте, ${application.name}!</h2>
        <p>Ваша заявка на услугу "${application.service}" для автомобиля ${application.carModel} успешно подтверждена.</p>
        <p>Дата и время записи: ${new Date(application.dateTime).toLocaleString()}</p>
        <p>Наш специалист свяжется с вами по телефону ${application.phone} для уточнения деталей. Если у вас есть вопросы, пишите на этот email.</p>
        <p>С уважением,<br/>Команда SS Detailing</p>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки email:', error);
      } else {
        console.log('Email подтверждения отправлен на', application.email, info.response);
      }
    });

    res.status(200).json({ message: 'Заявка подтверждена', application });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при подтверждении заявки: ${err.message}` });
  }
});

app.delete('/api/applications/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: application.email,
      subject: 'Ваша заявка отменена 😔',
      html: `
        <h2>Здравствуйте, ${application.name}!</h2>
        <p>К сожалению, ваша заявка на услугу "${application.service}" для автомобиля ${application.carModel} была отменена.</p>
        <p>Дата и время записи: ${new Date(application.dateTime).toLocaleString()}</p>
        <p>Если у вас есть вопросы или вы хотите записаться на новое время, свяжитесь с нами по телефону ${application.phone} или через сайт.</p>
        <p>С уважением,<br/>Команда SS Detailing</p>
      `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки email:', error);
      } else {
        console.log('Email об отмене отправлен на', application.email, info.response);
      }
    });

    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: 'Заявка отменена' });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при отмене заявки: ${err.message}` });
  }
});

// Маршруты для отзывов
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    // Отправка уведомления админу
    const adminMailOptions = {
      from: 'your-email@gmail.com',
      to: ADMIN_EMAIL,
      subject: 'Новый отзыв поступил! 🌟',
      html: `
        <h2>Новый отзыв от ${review.name}</h2>
        <p>Текст отзыва: ${review.text}</p>
        <p>Дата: ${new Date(review.createdAt).toLocaleString()}</p>
        <p>Пожалуйста, подтвердите или отклоните отзыв в админ-панели.</p>
      `,
    };

    await transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки email админу:', error);
      } else {
        console.log('Email отправлен админу:', ADMIN_EMAIL, info.response);
      }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: `Ошибка при сохранении отзыва: ${err.message}` });
  }
});

// Новый маршрут для подтверждения отзыва
app.put('/api/reviews/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    res.status(200).json({ message: 'Отзыв подтвержден', review });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при подтверждении отзыва: ${err.message}` });
  }
});

// Новый маршрут для отклонения отзыва
app.delete('/api/reviews/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    res.status(200).json({ message: 'Отзыв отклонён и удалён' });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при отклонении отзыва: ${err.message}` });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    res.status(200).json({ message: 'Отзыв успешно удален' });
  } catch (err) {
    res.status(500).json({ message: `Ошибка при удалении отзыва: ${err.message}` });
  }
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});