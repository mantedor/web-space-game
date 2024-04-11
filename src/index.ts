import Global from './global'

Global

import {Server} from 'socket.io'
import http from 'http'

import StartConnection from './socket/connection'

import express from 'express'

const app = express()
const GameGlobal = global.GameGlobal

//SOCKET.IO HANDLING
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    StartConnection(socket, GameGlobal)
})

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")

app.use(express.static(__dirname + "/game/rsc"))
app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{
    const gameMap = GameGlobal.Map
    res.render('home', {gameMap})
})

server.listen(3030, () => console.log("HOSTED ON 3030"))
