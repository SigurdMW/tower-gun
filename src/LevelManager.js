import { NUM_COLUMNS, ROW_HEIGHT, COL_SIZE } from "./variables"
import { brick } from "./templates"

const columnsTemplate = (new Array(NUM_COLUMNS)).fill(0)

export class LevelManager {
    constructor() {
        this.rowTemplate = {
            vPos: 0,
            columns: columnsTemplate.map(r => [])
        }
        this.level = []
    }

    set setLevel(level) {
        this.level = [...level]
    }

    get getLevel() {
        return this.level
    }

    addNewRow() {
        const newRow = Object.assign({}, this.rowTemplate)
        const newLevel = [...this.level]
        newLevel.forEach((curRow, index) => {
            newLevel[index].vPos += ROW_HEIGHT
        })
        newRow.columns = newRow.columns.map((col, index) => {
            const newBrick = Object.assign({}, brick)
            newBrick.hPos = index * COL_SIZE
            return newBrick
        })
        newLevel.push(newRow)
        this.setLevel = newLevel
    }
}

export default LevelManager