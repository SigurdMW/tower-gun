// eslint-disable-next-line
import "babel-polyfill"

(async () => {
    
const canvas = document.getElementById("tower-gun")
const startBtn = document.getElementById("start-game")

const towerImageSrc = require("./img/tower.jpg")
const goodGuyImageSrc = require("./img/good-guy.jpg")
const badGuyImageSrc = require("./img/bad-guy.jpg")
const dollarImageSrc = require("./img/dollar.jpg")

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) { // left
        if (gunState.hPos > 0) gunState.hPos -= 10
    } else if (e.keyCode === 39) { //right
        if ((gunState.hPos + gunSize) < canvas.width) gunState.hPos += 10
    }
})

const NUM_COLUMNS = 10
const COL_SIZE = canvas.width / NUM_COLUMNS

const newImageLoader = (imgPath) => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (e) => {
            reject(e)
        }
        image.src = imgPath
    })
}

// include needed resources here
const [towerImage, goodGuyImage, badGuyImage, dollarImage] = await Promise.all([
    newImageLoader(towerImageSrc),
    newImageLoader(goodGuyImageSrc),
    newImageLoader(badGuyImageSrc),
    newImageLoader(dollarImageSrc)
])

console.log({goodGuyImage, badGuyImage, dollarImage})

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
    context.drawImage(towerImage,gunState.hPos, canvas.height - gunSize, gunSize, gunSize)
}

const drawBadGuys = () => {
    (new Array(10)).fill(0).map((n, i) => {
        context.drawImage(badGuyImage, i * COL_SIZE, 0, COL_SIZE, COL_SIZE)
    })
    
}
   
const update = (time = 0) => {
    drawBackground()
    drawGun()
    drawBadGuys()
    requestAnimationFrame(update)
}

drawGun()
update()

})() // end async