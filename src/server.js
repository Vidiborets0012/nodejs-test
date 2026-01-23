import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import helmet from 'helmet';
import 'dotenv/config';

const app = express();
// const PORT = 3000;

const PORT = process.env.PORT ?? 3000;

//Логування запитів
app.use(
  // 1. Логуємо все
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// Дозволяє запити з будь-яких джерел
app.use(cors()); // 2. Перевіряємо доступ
//Налаштовує різноманітні HTTP-заголовки для захисту від поширених веб-вразливостей
app.use(helmet()); // 3. Захищаємо заголовки
// Middleware для парсингу JSON
app.use(express.json({ limit: '10mb' })); // 4. Тільки якщо все ок, парсимо дані

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Something went wrong');
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
