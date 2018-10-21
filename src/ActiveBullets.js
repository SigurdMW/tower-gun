import { NUM_COLUMNS } from "./variables"

const numToMap = (new Array(NUM_COLUMNS)).fill(0) 

export class ActiveBullets {
    constructor() {
        this.columns = numToMap.map(i => [])
    }
    
    get getBullets() {
        return this.columns
    }

    set setColumns(col) {
        this.columns = [...col]
    }

    addBullet(columnIndex, bullet) {
        const newColumns = [...this.columns]
        newColumns[columnIndex].push(bullet)
        this.setColumns = newColumns
    }

    removeBullet(columnIndex, bulletIndex) {
        const newColumns = [...this.columns]
        newColumns[columnIndex] = newColumns[columnIndex].filter((c, i) => i !== bulletIndex)
        this.setColumns = newColumns
    }
}

export default ActiveBullets