let loading = 1

socket.on('render',  (m)=>{
    const type = m.type

    if(!type){return}

    const s = SOCKET_EVENTS[type]
    if(!s){return}
    if(!loading){return s(m)}

    queue.push((_ => s(m)))
})

function readQueue(){
    queue.forEach(a => a())
}

function loadMap(){
    console.log("Loading map")

    socket.emit("map", {type: "map"})

    socket.on("map", m =>{
        const screen = document.querySelector(".map");

        const {state} = m

        screen.innerHTML = state
        loading = 0
        console.log("Finished loading map")
        readQueue()
    })
}

loadMap()