import http from 'node:http';

const PORT = 3000;

// Створюємо сервер
const server = http.createServer((req, res) => {
  console.log(`Отримано запит: ${req.method} ${req.url}`);

  // 1. Встановлюємо заголовок відповіді (що ми відправляємо текст у форматі UTF-8)
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  // 2. Логіка роутингу (ручна)
  if (req.url === '/') {
    res.end('Привіт! Це головна сторінка сервера.');
  } else if (req.url === '/about') {
    res.end('Це сторінка "Про нас".');
  } else if (req.url === '/contact') {
    res.end('Email: email@google.com.');
  } else {
    res.statusCode = 404;
    res.end('Сторінку не знайдено 404');
  }
});

// Запускаємо сервер
server.listen(PORT, () => {
  console.log(`Сервер запущено! Слухаю порт ${PORT}`);
  console.log(`Відкрий у браузері: http://localhost:${PORT}`);
});
