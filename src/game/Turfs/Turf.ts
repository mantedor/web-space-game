import MessageEmitter from '../../socket/MessageEmitter'

import GameState from '../GameState'
import Client from '../Client'

import AtomMovable from "../AtomMovable"
import Atom from '../Atom'
import Mob from '../Mobs/Mob'

interface playerInterface{
    [key: string]: Client;
}

function updateStatePlayer(playerHandler : playerInterface, description: string | undefined, content : string){
    for(const x in playerHandler){
        const c : Client = playerHandler[x];
        const m : Mob = c.mob;

        const id : string | undefined = description
        c.messageEmitter.changeInner(id, content)
    }
}

interface contentInterface{
    [key: symbol | string] : AtomMovable | null;
}

//Base class for all Turfs
class Turf extends Atom{
    contents : contentInterface; 
    pos : [number, number];

    constructor(name:string, desc: string, icon:string, density: boolean = false, pos : [number, number], contents : contentInterface = {}){
        super(name, desc, icon, density, "", false)

        //Turf exclusive vars
        this.pos = pos;
        this.contents = contents;

    }

    addToContents(a : AtomMovable){
        this.contents[a.id] = a

        //Notify turfs content change
        //So it can get
        /*if(!(a instanceof Mob)){return}
        
        const playerMob : Mob = a
        const client : Client | null = playerMob.client

        if(!client){return}
        updateStatePlayer(client.playerHandler, this.id.description, this.html)
        */}
    removeFromContents(a : AtomMovable){
        this.contents[a.id] = null

        /*if(!(a instanceof Mob)){ return}

        const playerMob : Mob = a
        const client : Client | null = playerMob.client 

        if(!client){return}
        updateStatePlayer(client.playerHandler, this.id.description, this.html)
        */}
        
    get html(){
        const contents : contentInterface = this.contents;
        let contentHTML : string = ""

        //You won't be able to iterate through an object with a
        //For in loop if the keys are Symbol()
        //So we have to manually extract the keys
        const k = Reflect.ownKeys(contents)
        for(const e of k){
            const s : symbol | string = e
            const item = contents[s];

            if(!item){
                continue;
            }

            contentHTML += contents[s]?.html
        }

        return `<div style="background-image: url('${this.icon}')" id="${this.id}" class="atom turf" name="${this.name}" desc="${this.desc}">${contentHTML}</div>`
    }
}

export default Turf;
