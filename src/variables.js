export const canvas = document.getElementById("tower-gun")
export const startBtn = document.getElementById("start-game")
export const appElement = document.getElementById("app-loading-ready")

export const NUM_COLUMNS = 10
export const COL_SIZE = canvas.width / NUM_COLUMNS
export const ROW_HEIGHT = COL_SIZE

export const brickTypes = {
    badGuy: "badGuy",
    goodGuy: "goodGuy"
}