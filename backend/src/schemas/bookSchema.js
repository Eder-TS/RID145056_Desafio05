import { z } from 'zod';

const bookSchema = z.object({
  title: z
    .string('O título deve ser uma string.')
    .min(1, 'Título é obrigatório.'),
  pages: z
    .number('Número de páginas deve ser um número.')
    .int('Número de páginas deve ser um número inteiro.')
    .min(1, 'Pages is required.'),
  isbn: z
    .string('ISBN deve ser uma string.')
    .regex(
      /^(?:\d{9}[\dX]|\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?[\dX])$/,
      'ISBN inválido.',
    ),
  publisher: z
    .string('Editora deve ser uma string.')
    .min(1, 'Editora é obrigatória.'),
});

const bookIdSchema = z.object({
  id: z.number().int().positive('Book ID must be a positive integer.'),
});

export { bookSchema, bookIdSchema };
