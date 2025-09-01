import db from '../configs/database';

db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            pages INTEGER NOT NULL,
            isbn INTEGER NOT NULL,
            publisher TEXT NOT NULL,
        )
    `);

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

function findBooksByIdRepository(bookId) {
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
    const fields = ['title', 'pages', 'isbn', 'publisher'];
    let query = 'UPDATE books SET';
    let values = [];

    fields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedBook[field]);
      }
    });

    query = query.slice(0, -1);
    query += ' WHERE id = ?';
    values.push(bookId);

    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id: bookId, ...updatedBook });
      }
    });
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
  findBooksByIdRepository,
  updateBookRepository,
  deleteBookRepository,
};
