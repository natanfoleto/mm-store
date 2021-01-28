const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes.js');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json({ limit: '10mb' }));
  }

  routes() {
    this.server.use('/api', routes);
  }
}

module.exports = new App().server;
