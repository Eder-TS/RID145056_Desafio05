import db from '../configs/database.js';

db.run(
  `
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            pages INTEGER NOT NULL,
            isbn TEXT NOT NULL,
            publisher TEXT NOT NULL
        )
    `,
);

function createBookRepository(newBook) {
  return new Promise((resolve, reject) => {
    const { title, pages, isbn, publisher } = newBook;

    db.run(
      `
                INSERT INTO books (title, pages, isbn, publisher)
                VALUES (?, ?, ?, ?)
            `,
      [title, pages, isbn, publisher],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newBook });
        }
      },
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
                SELECT id, title, pages, isbn, publisher
                FROM books
            `,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(
      `
                SELECT *
                FROM books
                WHERE id = ?
            `,
      [bookId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      },
    );
  });
}

function updateBookRepository(bookId, updatedBook) {
  return new Promise((resolve, reject) => {
    const { title, pages, isbn, publisher } = updatedBook;

    db.run(
      `
        UPDATE books
        SET title = ?, pages = ?, isbn = ?, publisher = ?
        WHERE id = ?
      `,
      [title, pages, isbn, publisher, bookId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: bookId, ...updatedBook });
        }
      },
    );
  });
}

function deleteBookRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.all(
      `
                DELETE FROM books
                WHERE id = ?
            `,
      [bookId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Livro deletado com sucesso.', bookId });
        }
      },
    );
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
};
