import { IBullet } from "../interfaces"

export class Bullet {
    private state = {
        size: 0,
        vPos: 0
    }
    constructor(options: IBullet) {
        this.state = {...options}
    }
}