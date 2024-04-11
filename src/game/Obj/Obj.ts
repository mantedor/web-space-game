import Atom from '../Atom'

type Dir = "north" | "west" | "east" | "south" | "";

class Obj extends Atom{
    constructor(name: string, desc: string, icon: string, density: boolean = false,dir: Dir = "", movable: boolean = true){
        super(name, desc, icon, density, dir, movable)
    }

    get html(){
        return `<div style="background-image: url('${this.icon}')" id="${this.id}" class="atom obj"></div>`
    }
}

export default Obj
