import bookServices from '../services/bookServices.js';

async function createBookController(req, res) {
  const newBook = req.body;

  try {
    const book = await bookServices.createBookService(newBook);
    res.status(201).send({ book });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookServices.findAllBooksService();
    res.send({ books });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findBookByIdController(req, res) {
  const id = req.params.id;

  try {
    const book = await bookServices.findBookByIdService(id);
    res.send({ book });
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function updateBookConstroller(req, res) {
  const id = req.params.id;
  const updatedBook = req.body;

  try {
    const book = await bookServices.updateBookService(id, updatedBook);
    res.send({ book });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteBookController(req, res) {
  const id = req.params.id;

  try {
    const deletedBook = await bookServices.deleteBookService(id);
    res.send({ deletedBook });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIdController,
  updateBookConstroller,
  deleteBookController,
};
