const express = require('express');

const server = express();

const ideas = [
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
    title: 'Cursos de Programação',
    category: 'Estudo',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, sit voluptate dignissimos voluptatum vel',
    url: 'http://rocketseat.com.br',
  },
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
    title: 'Exercícios',
    category: 'Saúde',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, sit voluptate dignissimos voluptatum vel',
    url: 'http://rocketseat.com.br',
  },
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
    title: 'Meditação',
    category: 'Mentalidade',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, sit voluptate dignissimos voluptatum vel',
    url: 'http://rocketseat.com.br',
  },
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729032.svg',
    title: 'Karaokê',
    category: 'Diversão em Família',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, sit voluptate dignissimos voluptatum vel',
    url: 'http://rocketseat.com.br',
  },
];

server.use(express.static('public'));

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  express: server,
  noCache: true,

});

server.get('/', (request, response) => {
  const reversedIdeas = [...ideas].reverse();

  const lastIdeas = [];

  for (const idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }

  response.render('index.html', { ideas: lastIdeas });
});

server.get('/ideias', (request, response) => {
  const reversedIdeas = [...ideas].reverse();

  response.render('ideias.html', { ideas: reversedIdeas });
});

server.listen(3000);
