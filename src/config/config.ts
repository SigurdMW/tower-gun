export const canvasId = "tower-gun"

export const CANVAS = <HTMLCanvasElement>document.getElementById(canvasId)
export const CONTEXT = CANVAS.getContext("2d")
export const NUM_COLUMNS = 10
export const COL_SIZE = CANVAS.width / NUM_COLUMNS
export const CANVAS_WIDTH = CANVAS.width
export const CANVAS_HEIGHT = CANVAS.height
export const GUN_SIZE = COL_SIZE
export const ROW_HEIGHT = COL_SIZE