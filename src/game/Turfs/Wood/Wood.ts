import Turf from "../Turf"

interface Vars {
    name: string,
    desc: string,
    icon: string,
    density: boolean
}

class Wood extends Turf{
    constructor(pos : [number, number]){
        const vars : Vars = {
            name: "wood floor",
            desc: "A floor made out of wood",
            icon: "woodfloor.png",
            density: false
        }
        
        const {name, desc, icon, density} = vars;

        super(name, desc, icon, density, pos)
    }
}

export default Wood
