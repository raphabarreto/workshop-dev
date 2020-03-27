const express = require('express');

const server = express();
const nunjucks = require('nunjucks');

const db = require('./db');


server.use(express.static('public'));
server.use(express.urlencoded({
  extended: true,
}));

nunjucks.configure('views', {
  express: server,
  noCache: true,

});

server.get('/', (request, response) => {
  db.all('SELECT * FROM ideas', (err, rows) => {
    if (err) {
      console.log(err);
      return response.send('Erro no banco de dados');
    }

    const reversedIdeas = [...rows].reverse();

    const lastIdeas = [];

    for (const idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return response.render('index.html', { ideas: lastIdeas });
  });
});

server.get('/ideias', (request, response) => {
  db.all('SELECT * FROM ideas', (err, rows) => {
    if (err) {
      console.log(err);
      return response.send('Erro no banco de dados');
    }

    const reversedIdeas = [...rows].reverse();

    return response.render('ideias.html', { ideas: reversedIdeas });
  });
});

server.post('/', (request, response) => {
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);
  `;

  const values = [
    request.body.image,
    request.body.title,
    request.body.category,
    request.body.description,
    request.body.link,
  ];


  db.run(query, values, (err) => {
    if (err) {
      console.log(err);
      return response.send('Erro no banco de dados');
    }

    return response.redirect('/ideias');
  });
});

server.listen(3000);
