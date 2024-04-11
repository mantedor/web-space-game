import Client from '../../Client'
import Turf from '../../Turfs/Turf'
import Mob from "../Mob"

interface Vars {
    name: string,
    desc: string,
    icon: string,
    walkspeed: number
}

const randomNames = ["Pebas", "Tchebas", "Tugas", "Dilma", "Tigas", "Nugas", "Pebble", "Poba"]

class Player extends Mob{
    color: number;
    constructor(loc: Turf, c : Client | null = null){
        const vars : Vars = {
            name: "human",
            desc: "Real human being!",
            icon: "human",
            walkspeed: 100
        }

        const selected = Math.round(Math.random() * randomNames.length)
        vars.name = randomNames[selected]
        const {name, desc, icon, walkspeed} = vars;

        super(name, desc, icon, c, loc, walkspeed)

        this.color = 0;
        this.overlays = []
    }

    get html(){
        const dir = this.dir ? this.dir : "south"

        return `<div style="filter: grayscale(${this.color}%);background-image: url('${this.icon}-${dir}.png');" name="${this.name}" desc="${this.desc}" id="${this.id}" class="atom mob human"></div>`
    }
}

export default Player
