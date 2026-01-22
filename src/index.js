// import { readdir, readFile } from 'node:fs/promises';

// async function processFiles() {
//   try {
//     // 1. Отримуємо список усіх об'єктів у поточній папці
//     const entries = await readdir('.', { withFileTypes: true });

//     console.log('--- Аналіз проекту ---');

//     for (const entry of entries) {
//       const type = entry.isDirectory() ? 'Папка' : 'Файл';
//       console.log(`${type}: ${entry.name}`);

//       // 2. Якщо це файл package.json, давай прочитаємо його вміст
//       if (entry.name === 'package.json') {
//         // const content = await readFile(entry.name, 'utf-8');
//         const content = await readFile(entry.name);

//         console.log('СИРІ ДАНІ (Buffer):', content);

//         const json = JSON.parse(content);
//         console.log(`>> Назва проекту з JSON: ${json.name}`);
//       }
//     }
//   } catch (error) {
//     console.error('Сталася помилка:', error.message);
//   }
// }

// processFiles();

import path from 'node:path';
import fs from 'node:fs/promises';

async function setupProject() {
  try {
    // 1. Формуємо шлях до папки 'logs' у корені проекту
    // process.cwd() - це шлях до твоєї папки nodejs-test
    const logsDir = path.join(process.cwd(), 'logs');
    const logFilePath = path.join(logsDir, 'app.log');

    // 2. Створюємо папку, якщо її ще немає
    // { recursive: true } дозволяє не видавати помилку, якщо папка вже існує
    await fs.mkdir(logsDir, { recursive: true });

    // 3. Записуємо початковий заголовок у файл (перезаписує файл)
    await fs.writeFile(logFilePath, '--- СТАРТ ЛОГУВАННЯ ---\n', 'utf-8');
    console.log('Файл створено успішно!');

    console.log('Шлях до логів:', logFilePath);
  } catch (error) {
    console.error('Помилка:', error);
  }
}

setupProject();
