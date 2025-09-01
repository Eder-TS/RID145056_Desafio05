import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('library_database.db', (err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados: ', err.message);
  } else {
    console.log('Conectando ao banco de dados SQLite.');
  }
});

export default db;
