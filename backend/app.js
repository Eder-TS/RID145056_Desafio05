import express from 'express';
import bookServices from './src/services/bookServices.js';

const app = express();
const newBook = {
  title: 'Zumare',
  pages: 1234,
  isbn: 93984874,
  publisher: 'Saquarema',
};
console.log('node e sqlite');
const book = await bookServices.createBookService(newBook);
console.log(book);
export default app;
