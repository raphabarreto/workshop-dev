const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ws.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ideas(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    link TEXT
  );
  `);

  db.run('DELETE FROM ideas WHERE id = ?', [7], (err) => {
    if (err) return console.log(err);

    return console.log('DELETEI', this);
  });

  // db.all('SELECT * FROM ideas', (err, rows) => {
  //   if (err) return console.log(err);

  //   return console.log(rows);
  // });
});

module.exports = db;
