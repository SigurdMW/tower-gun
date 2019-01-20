import { COL_SIZE, CANVAS_WIDTH, CONTEXT, CANVAS_HEIGHT } from "../Config";
import { Bullets } from "./Bullets";

/**
 * The Gun Singleton
 * user Gun.getInstance() to get the gun
 */
export class Gun {
    private static instance: Gun
    private bullets = Bullets.getInstance()
    private state = {
        hPos: 0,
        size: COL_SIZE
    }
    static getInstance() {
        if (!Gun.instance) {
            Gun.instance = new Gun();
        }
        return Gun.instance;
    }
    public shoot = () => {
        const bulletColumn = this.state.hPos > 0 ? this.state.hPos / COL_SIZE : 0
        this.bullets.addBullet(bulletColumn)
    }
    public moveRight = () => {
        if ((this.state.hPos + this.state.size) < CANVAS_WIDTH) this.state.hPos += COL_SIZE
    }
    public moveLeft = () => {
        if (this.state.hPos > 0) this.state.hPos -= COL_SIZE
    }
    public drawGun = (image: any) => {
        CONTEXT!.drawImage(image, this.state.hPos, CANVAS_HEIGHT - this.state.size, this.state.size, this.state.size)
    }
}
