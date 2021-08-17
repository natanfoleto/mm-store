import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes.js'

import env from './lib/configLoader.js'

class App {
  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(cors())
    this.server.use(helmet())
    this.server.use(express.json({ limit: env.API_SWINT_MAX_REQUEST_SIZE }))
  }

  routes () {
    this.server.use('/api', routes)
  }
}

export default new App().server
