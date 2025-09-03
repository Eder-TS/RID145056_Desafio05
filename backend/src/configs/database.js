import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('library_database.db', (err) => {
  if (err) {
    console.log('Error connecting database: ', err.message);
  } else {
    console.log('Library database connected.');
  }
});

export default db;
