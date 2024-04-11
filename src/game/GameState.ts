import Template from './Maps/debug/template'

import {Map} from './Maps/Map'

import Client from './Client'

interface playerInterface{
    [key: string]: Client;
}

//Incase no map is set
//Use the debug default one
const debugMap = Template

class GameState{
    time : number = 0;

    gameMap : Map; 
    playerHandler : playerInterface = {};

    constructor(gameMap : Map = debugMap){
        this.gameMap = gameMap
    }

    get Map(){
        return this.gameMap
    }

    setMap(gameMap : Map){
        this.gameMap = gameMap
    }
    setPlayer(i : string, client : Client){
        this.playerHandler[i] = client
    }
    getPlayer(i : string): Client | null{
        return this.playerHandler[i]
    }
}

export default GameState
