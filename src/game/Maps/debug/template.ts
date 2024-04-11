import {Map, MapElement} from "../Map"

import Wood from "../../Turfs/Wood/Wood"

import Player from "../../Mobs/Player/Player"
import Sword from '../../Obj/Items/Sword/Sword'

//BAD TEST MAP

function formMap(width : number, height : number) : Array<Array<MapElement>>{
    const map : Array<Array<MapElement>> = [];

    for(let y = 0; y < height; y++){
        map[y] = []
        for(let x = 0; x < width; x++){
            const woodTile = new Wood([x, y])
            const mapElement = new MapElement(woodTile)

            map[y].push(mapElement)
        }
    }

    return map;
}

const template = formMap(10, 10)

const map = new Map(template)

export default map
