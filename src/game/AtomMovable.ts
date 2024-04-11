import Atom from './Atom'
import Turf from './Turfs/Turf'

import MessageEmitter from '../socket/MessageEmitter'
import Client from './Client'

interface playerInterface{
    [key: string]: Client;
}

function updatePlayerView(id: string | undefined, content : string, playerHandler : playerInterface){
    for(const x in playerHandler){
        const playerClient : Client = playerHandler[x];
        const emitter : MessageEmitter = playerClient.messageEmitter

        playerClient.messageEmitter.changeInner(id, content)
    }
}

function showMovement(atom : AtomMovable, newLoc : Turf, playerHandler : playerInterface){
    for(const x in playerHandler){
        const playerClient : Client = playerHandler[x];
        const emitter : MessageEmitter = playerClient.messageEmitter

        emitter.move( newLoc.id + '', atom.id + '', `${atom.icon}-${atom.dir}.png`)
    }
    
}

type Dir = "north" | "west" | "east" | "south" | "";

class AtomMovable extends Atom{
    pos: [number, number];
    loc: Turf;

    constructor(name: string, desc: string, icon: string, density: boolean = false,dir: Dir = "", loc : Turf){
        super(name, desc, icon, density, dir, true)

        this.loc = loc
        this.pos = loc.pos

        this.loc.addToContents(this)

        const turfId = this.loc.id
        const content = this.loc.html
        updatePlayerView(turfId + '', content, global.GameGlobal.playerHandler)
    }

    move(newLoc : Turf){
        this.loc.removeFromContents(this) //Remove ourselves from our turf contents

        this.loc = newLoc
        newLoc.addToContents(this)

        this.pos = newLoc.pos

        showMovement(this, newLoc, global.GameGlobal.playerHandler)

        return newLoc
    }
}

export default AtomMovable
