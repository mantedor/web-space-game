const screen = document

const atomName = document.querySelector(".atomname")
const atomDesc = document.querySelector(".atomdesc")

const queue = []
const socket = io();

screen.addEventListener("keydown", e => {
    const payload = {
        type: "keydown",
        value: e.code
    }
    socket.emit('playerAction', payload)
})

screen.addEventListener("click", e => {
    const {clientX, clientY, target} = e
    const payload = {
        type: "click",
        value: {clientX, clientY, target}
    }

    socket.emit('playerAction', payload)
})

document.addEventListener("mousemove", e => {
    const {target} = e;

    const c = target.className.split(" ")[0]

    atomName.textContent = ""
    atomDesc.textContent = ""
    if(c !== "atom"){return}

    atomName.textContent = target.getAttribute("name")
    atomDesc.textContent = target.getAttribute("desc")
})