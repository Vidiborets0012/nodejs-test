import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

const app = express();
const PORT = 3000;
const logPath = path.join(process.cwd(), 'logs', 'access.log');

// ГАЙД: Це і є Middleware. Вона спрацьовує на кожен запит.
app.use(async (req, res, next) => {
  // const logEntry = `[${new Date().toLocaleString()}] ${req.method} ${req.url}\n`;
  const { method, url } = req;
  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}] ${method} ${url}\n`;

  try {
    await fs.appendFile(logPath, logEntry, 'utf-8');
  } catch (err) {
    console.error('Не вдалося записати лог:', err.message);
  }
  next(); // Передаємо керування далі до наших маршрутів
});

// Маршрути (Routes)
app.get('/', (req, res) => {
  res.send('<h1>Головна сторінка</h1><p>Ваш візит зафіксовано!</p>');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Сервер працює та логує запити',
  });
});

app.listen(PORT, () => {
  console.log(`Сервер працює: http://localhost:${PORT}`);
});
