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
    pass: 'yrigjcouksuzfqzg', // Используй пароль приложения
  },
});

// Проверка конфигурации nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.error('Ошибка настройки nodemailer:', error);
  } else {
    console.log('Nodemailer готов к отправке писем');
  }
});

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/diplom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
});

const Application = mongoose.model('Application', applicationSchema);

// Схема и модель для отзыва
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

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
    console.log('Заявка сохранена:', application);

    // Отправка email
    try {
      const mailOptions = {
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

      await transporter.sendMail(mailOptions);
      console.log('Email успешно отправлен на', application.email);
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
      // Продолжаем выполнение, даже если email не отправлен
    }

    res.status(201).json(application);
  } catch (err) {
    console.error('Ошибка при сохранении заявки:', err);
    res.status(400).json({ message: `Ошибка при сохранении заявки: ${err.message}` });
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
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: `Ошибка при сохранении отзыва: ${err.message}` });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    console.log('Удаление отзыва с ID:', req.params.id);
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    console.log('Отзыв удалён:', id);
    res.status(200).json({ message: 'Отзыв удалён' });
  } catch (err) {
    console.error('Ошибка удаления:', err);
    res.status(500).json({ message: `Ошибка при удалении отзыва: ${err.message}` });
  }
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});