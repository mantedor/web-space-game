import Obj from '../Obj'

class Item extends Obj{
    constructor(name: string, desc: string, icon: string){
        super(name, desc, icon, false, "", true)
    }

    get html(){
        return `<div style="background-image: url('${this.icon}');" id="${this.id}" class="atom obj item"></div>`
    }
}

export default Item
