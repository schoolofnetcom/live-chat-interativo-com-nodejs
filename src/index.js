import path from 'path'
import express from 'express'
import socket from 'socket.io'

import routes from './routes'
import chat from './socket'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '../public')))
 
routes(app)

const server = app.listen(3000, '127.0.0.1', () => console.log('Express server has been started'))
const io = socket(server, { wsEngine: 'ws' })
chat(io)