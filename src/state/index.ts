import { Brick } from "../Entities/Brick";
import { Bullet } from "src/Entities";

export const canvasId = "tower-gun"

interface IBrickRow {
    vPos: number
    columns: Brick[][]
}

interface IState {
    config: {
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D | null,
        rowHeight: number
        colNumber: number,
        colSize: number,
        gunSize: number
    }
    images: any[]
    brickRows: IBrickRow[]
    bulletColumns: Bullet[][]
}


export class State {
    private state: IState = {
        config: {
            canvas: <HTMLCanvasElement>document.getElementById(canvasId),
            context: null,
            rowHeight: 0,
            colNumber: 10,
            colSize: 0,
            gunSize: 0
        },
        images: [],
        brickRows: [],
        bulletColumns: []
    }
    constructor() {
        // on init stuff
        if (!this.state.config.canvas) {
            throw new Error("No canvas element found")
        }
        this.init()
    }
    private init() {
        const { canvas, colNumber } = this.state.config
        const colWidth = canvas.width / colNumber
        this.state.config.context = canvas.getContext("2d")
        this.state.config.colSize = colWidth
        this.state.config.rowHeight = colWidth
        this.state.config.gunSize = colWidth
    }
}