import express from 'express';

const app = express();
const PORT = 3000;

// "база даних"
const books = [
  { id: 1, title: 'Гаррі Поттер', author: 'Дж. К. Ролінґ' },
  { id: 2, title: 'Володар перснів', author: 'Дж. Р. Р. Толкін' },
  { id: 3, title: 'Відьмак', author: 'Анджей Сапковський' },
];

app.get('/books/:bookId', (req, res) => {
  // Витягуємо параметр з об'єкта req.params
  const { bookId } = req.params;

  // параметри завжди приходять як рядки, тому конвертуємо в число
  const book = books.find((b) => b.id === Number(bookId));

  if (!book) {
    return res.status(404).json({ message: 'Книгу не знайдено' });
  }

  res.json(book);
});

app.get('/books/:bookId/author', (req, res) => {
  const { bookId } = req.params;

  const book = books.find((b) => b.id === Number(bookId));

  if (!book) {
    return res.status(404).json({ message: 'Книгу не знайдено' });
  }

  res.json(book.author);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
