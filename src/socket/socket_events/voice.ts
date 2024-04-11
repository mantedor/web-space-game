import Client from '../../game/Client'
import GameState from '../../game/GameState'
import MessageEmitter from '../MessageEmitter';

import {Socket} from 'socket.io'

interface playerInterface{
    [key: string]: Client;
}

interface payload{
    type: string;
    data: Buffer;
}

function isValidBuffer(b : Buffer) : boolean{
    if(!b){
        return false
    }

    if(b.length > 40000){
        return false
    }

    return true
}

function sendVoice(m: payload, playerClient: Client, Game : GameState, socket : Socket){
    const data = m.data;

    if(!data){return}
    if(!isValidBuffer(data)){return}

    const playerList : playerInterface = Game.playerHandler;

    for(const x in playerList){
        const c : Client = playerList[x]
        
        const MessageEmitter : MessageEmitter = c.messageEmitter;

        MessageEmitter.voice(data)
    }
}

export default {path: 'voice', f: sendVoice}
