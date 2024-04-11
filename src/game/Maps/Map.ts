import Turf from "../Turfs/Turf"
import AtomMovable from "../AtomMovable"

function formHTML(rowArr : Array<Turf>){
    const html = rowArr.map(a => a.html)
    
    return html.join("")
}

interface contentInterface{
    [key: symbol | string] : AtomMovable | null;
}

class MapElement{
    turf : Turf; //Every tile needs a turf
    content: contentInterface; 
    //Place everything that the floor will contain in contents
    //The content var will be transferred to turf.contents
    //Anything other than a turf

    constructor(t : Turf, c : contentInterface = {}){
        this.turf = t;
        this.content = c;

        this.turf.contents = c
    }

    get element(){
        //The actual thing MapElement is supposed to represent
        return this.turf
    }
}

class Map{
    content: Array<Array<Turf>>;

    //Maps are described with MapElements
    //And the constructor of Map turns them into actual
    //Atoms and stuff
    constructor(layout : Array<Array<MapElement>>){
        //TODO REMOVE THE CONVERSION FROM MAPELEMENTS TO TURFS 
        //AND JUST DO IT DIRECTLY
        const converted = layout.map(rowElement => rowElement.map((mapEl : MapElement) => mapEl.element))

        this.content = converted
    }

    getLoc(x : number, y : number) : Turf | null{
        const height = this.content.length;
        const width = this.content[0].length;

        if(height - 1 < y || y < 0){
            return null
        }
        if(width - 1 < x || x < 0){
            return null
        }

        return this.content[y][x]
    }

    get html(){
        const arrMap = this.content;

        return arrMap.map(a => `<div class="floorRow">${formHTML(a)}</div>`).join("")
        
    }
}

export {Map, MapElement}
