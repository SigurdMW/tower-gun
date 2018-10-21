import { COL_SIZE, brickTypes } from "./variables"

export const bullet = {
    hPos: 0,
    vPos: 0,
    size: COL_SIZE / 2,
    speed: 1,
    damage: 5
}

export const brick = {
    hp: 10,
    vPos: 0,
    hPos: 0,
    size: COL_SIZE, 
    type: brickTypes.badGuy
}