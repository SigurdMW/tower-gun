import { NUM_COLUMNS, COL_SIZE, ROW_HEIGHT, canvas, context, appElement, brickTypes } from "./variables"
import ActiveBullets from "./ActiveBullets"
import LevelManager from "./LevelManager"
import { newImageLoader } from "./utils"
import { brick, bullet } from "./templates"
// eslint-disable-next-line
import "babel-polyfill"

(async () => {

const towerImageSrc = require("../img/png/tower.png")
const goodGuyImageSrc = require("../img/png/good-guy.png")
const badGuyImageSrc = require("../img/png/bad-guy.png")
const dollarImageSrc = require("../img/png/dollar.png")
const bulletImageSrc = require("../img/png/bullet.png")

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) { // left
        if (gunState.hPos > 0) gunState.hPos -= COL_SIZE
    } else if (e.keyCode === 39) { //right
        if ((gunState.hPos + gunSize) < canvas.width) gunState.hPos += COL_SIZE
    } else if (e.keyCode === 32) {
        shoot()
    }
})

// include needed resources here
const [towerImage, goodGuyImage, badGuyImage, dollarImage, bulletImage] = await Promise.all([
    newImageLoader(towerImageSrc),
    newImageLoader(goodGuyImageSrc),
    newImageLoader(badGuyImageSrc),
    newImageLoader(dollarImageSrc),
    newImageLoader(bulletImageSrc)
])

const images = {
    [brickTypes.goodGuy]: goodGuyImage,
    [brickTypes.badGuy]: badGuyImage
}

// show game
appElement.style.display = "block"

const activeLevel = new LevelManager()
const activeBullets = new ActiveBullets()
window.activeBullets = activeBullets
window.activeLevel = activeLevel

const shoot = () => {
    const bulletColumn = gunState.hPos > 0 ? gunState.hPos / COL_SIZE : 0
    const newBullet = Object.assign({}, bullet)
    newBullet.size = COL_SIZE / 2
    newBullet.vPos = canvas.height - (gunSize + newBullet.size)
    activeBullets.addBullet(bulletColumn, newBullet)
}

const context = canvas.getContext("2d")
const gunSize = COL_SIZE

const gunState = {
    hPos: 0
}

const drawBackground = () => {
    context.fillStyle = "#fff"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

const drawGun = () => {
    context.drawImage(towerImage,gunState.hPos, canvas.height - gunSize, gunSize, gunSize)
}

const drawBrick = (curBrick, vPos) => {
    const image = images[curBrick.type]
    if (image) context.drawImage(image, curBrick.hPos, vPos, curBrick.size, curBrick.size)
}

const drawBullet = (curBullet) => {
    context.drawImage(bulletImage, curBullet.hPos, curBullet.vPos, curBullet.size, curBullet.size);
}

const getColumnBicks = (columnIndex) => {
    const bricks = []
    activeLevel.getLevel.forEach((row, index) => {
        row.columns.forEach((col, colIndex) => {
            if (col && colIndex === columnIndex) bricks.push(Object.assign({}, col, {vPos: row.vPos}))
        })
    })
    return bricks
}

const getClosestBrickPos = (colIndex) => {
    const allBricksInColumn = getColumnBicks(colIndex)
    return allBricksInColumn.reduce((accumulator, current) => {
        if (current.vPos > accumulator) accumulator = current.vPos
        return accumulator
    }, 0)
}

const handleBulletHit = (colIndex) => {
    activeBullets.removeBullet(colIndex, 0)
    const newLevel = activeLevel.getLevel.map((row, i) => {
        if (i === colIndex) row.columns = row.columns.map((c, index) => index === 0 ? 0 : c)
        return row
    })
    activeLevel.setLevel = newLevel
}

const drawBullets = () => {
    activeBullets.getBullets.forEach((col, index) => {
        if (col) {
            col.forEach((currBullet, bulletIndex) => {
                if (col && currBullet) {
                    if (bulletIndex === 0) {
                        const closestColumnBrick = getClosestBrickPos(index)
                        if (closestColumnBrick >= currBullet.vPos) {
                            handleBulletHit(index)
                        }
                    }
                    currBullet.hPos = (index * COL_SIZE) + (currBullet.size / 2)
                    currBullet.vPos -= currBullet.speed
                    drawBullet(currBullet)
                }
            })
        }
    })
}

const dropNewRow = () => {
    activeLevel.addNewRow()
    lastLevelLength++
    newRowCounter = 0
}

let lastLevelLength = 0
let lastLevelUILength = 0
const drawBricks = () => {
    lastLevelUILength = lastLevelLength
    activeLevel.getLevel.forEach(row => {
        row.columns.forEach((curBrick) => drawBrick(curBrick, row.vPos))
    })
}

let newRowCounter = 0
let newRowInterval = 5000
let lastTime = 0
const update = (time = 0) => {
    const deltaTime = time - lastTime
    lastTime = time
    newRowCounter += deltaTime
    if (newRowCounter > newRowInterval) {
        dropNewRow()
    }
    drawBackground()
    drawBricks()
    drawGun()
    drawBullets()
    requestAnimationFrame(update)
}

drawGun()
update()

})() // end async