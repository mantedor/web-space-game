import Mob from './Mobs/Mob'

import {Socket} from 'socket.io'

import GameState from '../game/GameState'
import MessageEmitter from '../socket/MessageEmitter'

interface playerInterface{
    [key: string]: Client;
}

class Client{
    ip : string;
    mob : Mob;
    messageEmitter : MessageEmitter;
    last: number; //Last received message from client

    constructor(i : string = "", m : Mob, messageEmitter: MessageEmitter, playerHandler : playerInterface){
        this.ip = i;
        this.mob = m
        this.messageEmitter = messageEmitter

        this.last = new Date().getTime()
    }

    updateLast(){
        this.last = new Date().getTime()
    }
}

export default Client
