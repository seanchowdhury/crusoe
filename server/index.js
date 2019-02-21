import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express from 'express'

import models, { sequelize } from '../db/models'
import socketRun from './sockets/socket.js'
import { router as userRoutes } from './routes/users'
import { router as gameRoutes } from './routes/games'

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/game', gameRoutes)

const port = 8000

sequelize.sync({force: true}).then(() => {
  const server = app.listen(port)
  socketRun(server)
  console.log('listening on port:' + port)
})
