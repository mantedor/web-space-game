import Item from '../Item' 

interface Vars {
    name: string,
    desc: string,
    icon: string
}

class Sword extends Item{
    constructor(){
        const vars : Vars = {
            name: "sword",
            desc: "A sharp knife",
            icon: "sword.png",
        }
        
        const {name, desc, icon} = vars;

        super(name, desc, icon)
    }
}

export default Sword
