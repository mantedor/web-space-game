const s = navigator.mediaDevices.getUserMedia({audio: true})

const micStatus = document.querySelector("#micstatuscontent")

let recording

function micState(s){
    micStatus.innerHTML = s != undefined ? "Your voice is being recorded" : ""

    socket.emit("mic", {type: "mic", state: s != undefined ? true : false})
}

socket.on("voice", ({data})=>{
    const blob = new Blob([data])
    const url = URL.createObjectURL(blob)

    const a = new Audio(url)
    a.play()
})

screen.addEventListener("keydown", async ({code}) => {
    if(code !== "KeyC"){return}
    
    if(recording){
        clearInterval(recording);

        recording = undefined
        micState(recording)
        return
    }

    recording = startCycle()

    micState(recording)
})

async function sendVoiceBlob(b){
    const payload = {data: b}
    socket.emit("voice", payload)
}

function generateAudio(data){
    if(!data.length){return}
    const blob = new Blob(data)
    const url = URL.createObjectURL(blob);

    const a = new Audio(url);

    return a
}

async function startRecording(){
    const stream = await s;

    const record = new MediaRecorder(stream);
    record.start()

    const data = [];

    record.addEventListener("dataavailable", e => {
        data.push(e.data)
    })

    record.addEventListener("stop", _ => {
        const a = generateAudio(data)
        if(!a){return}
        
        sendVoiceBlob(new Blob(data))
    })

    return record
}

async function startCycle(){
    let r = await startRecording();

    const a = setInterval(async _ => {
        if(!recording){
            clearInterval(a); 
            r.stop();

            return
        }

        r.stop();

        r = await startRecording()
    }, 2000)

    return a
}