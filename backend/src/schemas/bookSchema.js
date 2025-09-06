import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  pages: z.number().int().min(1, 'Pages is required.'),
  isbn: z
    .string()
    .regex(
      /^(?:\d{9}[\dX]|\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?[\dX])$/,
      'Invalid ISBN',
    ),
  publisher: z.string().min(1, 'Publisher is required.'),
});

const bookIdSchema = z.object({
  id: z.number().int().positive('Book ID must be a positive integer.'),
});

export { bookSchema, bookIdSchema };
