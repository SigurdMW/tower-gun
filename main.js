const canvas = document.getElementById("tower-gun")
const startBtn = document.getElementById("start-game")

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) { // left
        if (gunState.hPos > 0) gunState.hPos -= 10
    } else if (e.keyCode === 39) { //right
        if ((gunState.hPos + gunSize) < canvas.width) gunState.hPos += 10
    }
})

const bullets = []

const bullet = {
    hPos: 0,
    vPos: 0,
    size: 1,
    speed: 1
}

const context = canvas.getContext("2d")
const gunSize = 50

const gunState = {
    hPos: (canvas.width / 2) - (gunSize/2)
}

const drawBackground = () => {
    context.fillStyle = "#fff"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

const drawGun = () => {
    context.fillStyle = "#000"
    context.fillRect(gunState.hPos, canvas.height - gunSize, gunSize, gunSize)
}

const update = (time = 0) => {
    drawBackground()
    drawGun()
    requestAnimationFrame(update)
}

drawGun()
update()