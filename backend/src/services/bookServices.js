import bookRepositories from '../repositories/bookRepositories.js';

async function createBookService(newBook) {
  const book = await bookRepositories.createBookRepository(newBook);

  if (!book) throw new Error('Error creating book.');

  return book;
}

async function findAllBooksService() {
  return await bookRepositories.findAllBooksRepository();
}

async function findBookByIdService(bookId) {
  const book = await bookRepositories.findBookByIdRepository(bookId);

  if (!book) throw new Error('Book not found.');

  return book;
}

async function updateBookService(bookId, updatedBook) {
  const bookExists = await bookRepositories.findBookByIdRepository(bookId);
  if (!bookExists) throw new Error('Book not found.');

  const book = await bookRepositories.updateBookRepository(bookId, updatedBook);
  if (!book) throw new Error('Error updating book.');

  return book;
}

async function deleteBookService(bookId) {
  const bookExists = await bookRepositories.findBookByIdRepository(bookId);
  if (!bookExists) throw new Error('Book not found.');

  return await bookRepositories.deleteBookRepository(bookId);
}

export default {
  createBookService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
};
