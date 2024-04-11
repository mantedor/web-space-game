let move = 1

const SOCKET_EVENTS = {
    "move": m => {
        const {movement, state} = m;

        if(!move){return}

        move = 0

        const MovableAtom = document.getElementById(movement[1]);
        const nextLoc = document.getElementById(movement[0]);

        const currentLoc = MovableAtom.parentNode;

        const startingPosition = currentLoc.getBoundingClientRect()
        const targetPosition = nextLoc.getBoundingClientRect()

        MovableAtom.style.backgroundImage = `url('${state}')`
        const newElementAtom = MovableAtom.cloneNode(true)

        const t = `translate(${targetPosition.x - startingPosition.x}px, ${targetPosition.y - startingPosition.y}px)`
        
        MovableAtom.style.transition = 'transform 0.1s';
        MovableAtom.style.transform = t

        setTimeout(_ => {
            MovableAtom.id = "###"
            MovableAtom.remove();

            nextLoc.appendChild(newElementAtom);
            move = 1}, 100)
    },
    "changeInner": m => {
        const {id, state} = m;

        const element = document.getElementById(id);

        element.innerHTML = state
    },
    "changeOuter": m => {
        const {id, state} = m;

        const element = document.getElementById(id);

        element.outerHTML = state
    }
}
