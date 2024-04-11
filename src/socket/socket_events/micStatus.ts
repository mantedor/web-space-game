import Mob from "../../game/Mobs/Mob";

import Client from "../../game/Client";
import GameState from "../../game/GameState";
import {Socket} from "socket.io"

import MessageEmitter from "../MessageEmitter";

interface payload{
    type: "mic";
    state: boolean;
}

function micStatus(m: payload, playerClient: Client, Game : GameState, socket : Socket){
    const state = m.state
    const mob : Mob = playerClient.mob

    for(const x in Game.playerHandler){
        const c : Client = Game.playerHandler[x]
        const MessageEmitter : MessageEmitter = c.messageEmitter;

        if(!state){
            return MessageEmitter.changeInner("micstatushearing", "")
        }
        MessageEmitter.changeInner("micstatushearing", `You are hearing ${mob.name}`)
    }
}

export default {path: 'mic', f: micStatus}
