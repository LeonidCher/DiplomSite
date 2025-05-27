const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Настройка middleware
app.use(express.json());
app.use(cors());

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
  dateTime: { type: String, required: true }, // Изменили на dateTime и тип String для ISO
});

const Application = mongoose.model('Application', applicationSchema);

// Маршрут для получения всех заявок
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Маршрут для отправки заявки
app.post('/api/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: `Ошибка при сохранении заявки: ${err.message}` });
  }
});

// Запуск сервера
app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});