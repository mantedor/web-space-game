import {Socket} from 'socket.io'

class MessageEmitter{
    socket : Socket;

    constructor(socket : Socket){
        this.socket = socket
    }
    move(initial : string | undefined, floor : string | undefined, state : string){
        interface movementPayload{
            type: string;
            movement: [string | undefined, string | undefined];
            state: string;
        }

        const o : movementPayload = {type: "move", movement: [initial, floor], state}

        this.socket.emit("render", o)

        return o
    }
    changeOuter(id : string | undefined, content : string){
        interface changePayload{
            type: string;
            id: string | undefined;
            state: string;
        }
        const o : changePayload = {type: "changeOuter", id, state: content}

        this.socket.emit("render", o)

        return o;
    }
    changeInner(id : string | undefined, content : string){
        interface changePayload{
            type: string;
            id: string | undefined;
            state: string;
        }
        const o : changePayload = {type: "changeInner", id, state: content}

        this.socket.emit("render", o)

        return o;
    }
    voice(b : Buffer){
        interface voicePayload{
            type: string;
            data: Buffer;
        }

        const o : voicePayload = {type: "voice", data: b};
        this.socket.emit("voice", o )
    }
    map(content : string){
        interface changePayload{
            type: string;
            state: string;
        }
        const o : changePayload = {type: "map", state: content}

        this.socket.emit("map", o)

        return o;
    }
}

export default MessageEmitter
