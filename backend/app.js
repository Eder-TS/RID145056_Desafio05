import express from 'express';
import bookServices from './src/services/bookServices.js';
import bookControllers from './src/controllers/bookControllers.js';

const app = express();
const newBook = {
  title: 'Zumare',
  pages: 1234,
  isbn: 93984874,
  publisher: 'Saquarema',
};
console.log('node e sqlite');
const req = {
  body: {
    newBook,
  },
};
const res = 0;
const book = await bookControllers.createBookController(req, res);
console.log(book);
export default app;
