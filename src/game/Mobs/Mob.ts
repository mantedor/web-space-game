import AtomMovable from "../AtomMovable"
import Turf from '../Turfs/Turf'
import Client from '../Client'

class Mob extends AtomMovable{
    client : Client | null;
    walkspeed: number;
    overlays: Array<string>;
    color: number;
    constructor(name : string, desc : string, icon : string, c : Client | null, loc : Turf, walkspeed : number){
        super(name, desc, icon, true, "south", loc);
        this.client = c

        this.walkspeed = walkspeed
        this.overlays = []
        this.color = 0
    }

    setClient(c : Client){
        this.client = c

        c.mob = this
    }

    get html(){
        const dir = this.dir ? this.dir : "south"
        
        return `<div style="background-image: url('${this.icon}-${dir}.png');" id="${this.id}" class="atom movable mob"></div>`
    }
}

export default Mob
