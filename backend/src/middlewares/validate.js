import z from 'zod';
import { bookIdSchema } from '../schemas/bookSchema.js';

const validate = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (error) {
    // Tratamento da mensagem de erro para o front poder processar mais facilmente.
    let message;
    if (error instanceof z.ZodError) {
      message = error.issues
        .map((issue) => {
          return issue.message;
        })
        .join(', ');
    }
    response.status(400).json({ message });
  }
};

const validateBookId = (request, response, next) => {
  try {
    const bookId = +request.params.id;
    bookIdSchema.parse({ id: bookId });
    next();
  } catch (error) {
    let message;
    if (error instanceof z.ZodError) {
      message = error.issues
        .map((issue) => {
          return issue.message;
        })
        .join(', ');
    }
    response.status(400).json({ message });
  }
};

export { validate, validateBookId };
