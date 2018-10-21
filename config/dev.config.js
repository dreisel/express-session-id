const conf = {
  db: {
    all: process.env.DB_ALL || 'wack',
    secret: '$ref:aws-secrets/secres.ssd',
  },
}

module.exports = conf;


const ac = require('ac');

const config = await ac('alla');
