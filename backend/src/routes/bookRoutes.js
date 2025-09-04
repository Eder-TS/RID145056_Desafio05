import { Router } from 'express';
import bookControllers from '../controllers/bookControllers.js';

const router = Router();

router.get('/livros', bookControllers.findAllBooksController);

router.get('/livros/:id', bookControllers.findBookByIdController);

router.post('/livros', bookControllers.createBookController);

router.put('/livros/:id', bookControllers.updateBookConstroller);

router.delete('/livros/:id', bookControllers.deleteBookController);

export default router;
