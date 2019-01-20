import { Bullet } from "./Bullet"
import { NUM_COLUMNS, COL_SIZE, CANVAS_HEIGHT, GUN_SIZE } from "../config";
import { IColumn, IBulletColumn } from "../interfaces";

const numToMap = (new Array(NUM_COLUMNS)).fill(0) 

/**
 * The Bullets Singleton
 * use Bullets.getInstance() to get
 */
export class Bullets {
    private static instance: Bullets
    private state = {
        bullets: []
    }
    private columns: IBulletColumn
    constructor() {
        this.columns = numToMap.map(i => [])
    }
    static getInstance() {
        if (!Bullets.instance) {
            Bullets.instance = new Bullets();
        }
        return Bullets.instance;
    }

    
    get getBullets() {
        return this.columns
    }

    set setColumns(col: IBulletColumn) {
        this.columns = [...col]
    }

    addBullet(columnIndex: number) {
        const newColumns = [...this.columns]
        const bulletSize = COL_SIZE / 2
        const bullet = new Bullet({
            size: bulletSize,
            vPos: CANVAS_HEIGHT - (GUN_SIZE + bulletSize)
        })
        newColumns[columnIndex].push(bullet)
        this.setColumns = newColumns
    }

    removeBullet(columnIndex: number, bulletIndex: number) {
        const newColumns = [...this.columns]
        newColumns[columnIndex] = newColumns[columnIndex].filter((c, i) => i !== bulletIndex)
        this.setColumns = newColumns
    }

    public createBullet() {
         // const newBullet = Object.assign({}, bullet)
        // newBullet.size = COL_SIZE / 2
        // newBullet.vPos = canvas.height - (gunSize + newBullet.size)
    }
}
