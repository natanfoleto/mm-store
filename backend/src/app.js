import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes.js'

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

export default new App().server;
