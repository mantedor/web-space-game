//It's bad practice to declare global variables
//but I need the GameState variable to be accessible
//so I'll do it this way
import Atom from './game/Atom'

interface idsInterface{
    [key: number] : Atom;
}

declare global{
    var ids : idsInterface;
}

global.ids = {}

import GameState from './game/GameState'
declare global{
    var GameGlobal : GameState;
}

const g = new GameState()

global.GameGlobal = g 

export default g
