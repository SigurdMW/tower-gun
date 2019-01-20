/**
 * Controls start/stop/pause/restart
 * questions:
 *  - does it contol overal difficulty?
 *  - does it control number of players?
 */
export class Game {
    private static instance: Game
    private state = {
        playing: false,
        pause: false
    }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new Game()
        }
        return this.instance
    }
    public start() {
        this.state.playing = true
    }
    public stop() {
        this.state.playing = false
    }
    public pause() {
        this.state.pause = true
    }
}