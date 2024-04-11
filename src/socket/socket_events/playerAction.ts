import {Socket} from 'socket.io'

import GameState from '../../game/GameState'
import {Map} from '../../game/Maps/Map'
import Client from '../../game/Client'
import Mob from '../../game/Mobs/Mob'
import Turf from '../../game/Turfs/Turf'

interface keyHandler{
    [key: string] : Function;
}
const controlScheme : keyHandler = {
    'KeyW': (player: Mob, loc : Turf, mapLayout : Map) => {
        const {pos} = loc;

        const x = pos[0];
        const y = pos[1];

        const newLoc = mapLayout.getLoc(x, y - 1);

        player.dir = "north"

        if(!newLoc){return}

        return player.move(newLoc)

    },
    'KeyS': (player: Mob, loc : Turf, mapLayout : Map) => {
        const {pos} = loc;

        const x = pos[0];
        const y = pos[1];

        player.dir = "south"

        const newLoc = mapLayout.getLoc(x, y + 1);

        if(!newLoc){return}

        return player.move(newLoc)

    },
    'KeyD': (player: Mob, loc : Turf, mapLayout : Map) => {
        const {pos} = loc;

        const x = pos[0];
        const y = pos[1];

        player.dir = "east"

        const newLoc = mapLayout.getLoc(x + 1, y);

        if(!newLoc){return}

        return player.move(newLoc)

    },
    'KeyA': (player: Mob, loc : Turf, mapLayout : Map) => {
        const {pos} = loc;

        const x = pos[0];
        const y = pos[1];

        player.dir = "west"

        const newLoc = mapLayout.getLoc(x - 1, y);

        if(!newLoc){return}

        return player.move(newLoc)
    }
}

interface payload{
    type: string;
    value: string;
}

function delayCheck(client : Client, delay: number) : boolean{
    const {last} = client
    
    if(delay > new Date().getTime() - last){
        return false
    }

    client.updateLast()
    return true
}

function handleAction(m: payload, playerClient: Client, Game : GameState, socket : Socket){
    const mapHolder : Map = Game.Map;

    const playerMob = playerClient.mob 

    if(!delayCheck(playerClient, playerMob.walkspeed)){return}

    const key = controlScheme[m.value]
    if(!key){
        return
    }

    key(playerMob, playerMob.loc, mapHolder);
}

export default {path: 'playerAction', f: handleAction}
