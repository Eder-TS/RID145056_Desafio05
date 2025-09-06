import { bookIdSchema } from '../schemas/bookSchema.js';

const validate = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

const validateBookId = (request, response, next) => {
  try {
    const bookId = +request.params.id;
    bookIdSchema.parse({ id: bookId });
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

export { validate, validateBookId };
