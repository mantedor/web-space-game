import {Socket} from 'socket.io'
import MessageEmitter from '../MessageEmitter'

import { Map } from '../../game/Maps/Map'

import Client from '../../game/Client'
import GameState from '../../game/GameState'

interface payload{
    type: "map"
}
function sendMap(m: payload, playerClient: Client, Game : GameState, socket : Socket){
    const mapLayout : Map = Game.Map;

    const messageEmitter : MessageEmitter = new MessageEmitter(socket);
    messageEmitter.map(mapLayout.html)
}

export default {path: 'map', f: sendMap}
