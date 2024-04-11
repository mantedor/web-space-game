type Dir = "north" | "west" | "east" | "south" | "";

class Atom{
    name: string;
    desc: string;
    icon: string;
    dir: Dir;
    density: boolean;
    movable: boolean;
    id : number;

    constructor(name: string, desc: string, icon: string, density: boolean = false,dir: Dir = "", movable: boolean = false){
        this.name = name;
        this.desc = desc;
        this.icon = icon;

        this.dir = dir;
        this.movable = movable;
        this.density = density;

        const gIds : Array<string> = Object.keys(global.ids)

        const last : number = Number(gIds[gIds.length - 1])
        const current = Number.isNaN(last) ? 0 : last + 1;

        this.id = current;
        global.ids[current] =this
    }

    get html(){
        return ""
    }
}

export default Atom;
