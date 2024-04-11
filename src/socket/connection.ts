import {Map} from '../game/Maps/Map'

import GameState from '../game/GameState'
import Client from '../game/Client'

import Turf from '../game/Turfs/Turf'
import Human from '../game/Mobs/Player/Player'

import MessageEmitter from './MessageEmitter'

import {Socket} from 'socket.io'
import {readdirSync} from 'fs'

const eventsDir = __dirname + '/socket_events'

interface eventHolder{
    [key: string]: any;
}

const events = (() => {
    //Loading the socket events through a dir  
    //Containing all the events through modules
    const o : eventHolder = {};

    readdirSync(eventsDir).forEach(async d => {
      const event = (await import(`${eventsDir}/${d}`))["default"]
      const {path, f} = event;

      o[path] = f
    })

    return o
})()

interface playerInterface{
    [key: string]: Client;
}

function createPlayer(ip : string, gameMap : Map, messageEmitter : MessageEmitter, playerHandler : playerInterface) : Client{
    const initialTile : Turf = gameMap.content[0][0]

    const Player = new Human(initialTile)
    const userClient = new Client(ip, Player, messageEmitter, playerHandler)

    Player.setClient(userClient)

    return userClient 
}

function startConnection(socket: Socket, Game : GameState){
    const properIp : string = String(socket.handshake.headers['x-forwarded-for']).split(',')[0];
    const ip = properIp == "undefined" ? socket.handshake.address : properIp; //IPs are the unique identifier for each player in playerHandler

    if(!Game.getPlayer(ip)){
        console.log("STARTED CONNECTION " + ip)
        
        const m = new MessageEmitter(socket)
        const player = createPlayer(ip, Game.Map, m, Game.playerHandler)
        Game.setPlayer(ip, player)
    }

    const client : Client | null = Game.getPlayer(ip)

    client!.messageEmitter.socket = socket

    for(const x in events){
        const f = events[x];

        socket.on(x, message => {
            f(message, client, Game, socket)
        })

    }
}

export default startConnection
