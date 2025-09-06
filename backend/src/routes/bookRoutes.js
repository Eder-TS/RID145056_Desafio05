import { Router } from 'express';
import bookControllers from '../controllers/bookControllers.js';
import { validate, validateBookId } from '../middlewares/validate.js';
import { bookSchema } from '../schemas/bookSchema.js';

const router = Router();

router.get('/livros', bookControllers.findAllBooksController);

router.get(
  '/livros/:id',
  validateBookId,
  bookControllers.findBookByIdController,
);

router.post(
  '/livros',
  validate(bookSchema),
  bookControllers.createBookController,
);

router.put(
  '/livros/:id',
  validate(bookSchema),
  bookControllers.updateBookConstroller,
);

router.delete('/:id', validateBookId, bookControllers.deleteBookController);

export default router;
