import "babel-polyfill"
import { ImageLoader } from "./ImageLoader"
import { Gun } from "./Entities"
import { canvasId } from "./config";
import { Game } from "./Entities/Game";

export class InitializeGame {
    private static instance: InitializeGame
    private canvas = <HTMLCanvasElement>document.getElementById(canvasId)
    // const startBtn = document.getElementById("start-game")
    // const appElement = document.getElementById("app-loading-ready")
    private context: CanvasRenderingContext2D | null
    private loadedImages: any[] = []
    private hasAllSetupStepsSucceeded: boolean = true
    private gun = Gun.getInstance()
    private game = Game.getInstance()
    constructor() {
        if (!this.canvas) {
            this.setHasFailed("No canvas element found in document")
        }
        this.context = this.canvas.getContext("2d")

        this.loadResources()
        this.initializeControls()
        this.startGame()
    }

    static getInstance() {
        if (!InitializeGame.instance) {
            InitializeGame.instance = new InitializeGame();
        }
        return InitializeGame.instance;
    }

    private setHasFailed = (e: string) => {
        this.hasAllSetupStepsSucceeded = false
        throw new Error(e)
    }

    private initializeControls = () => {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 37) { // left arrow
                this.gun.moveLeft()
            } else if (e.keyCode === 39) { // right arrow
                this.gun.moveRight()
            } else if (e.keyCode === 32) { // space
                this.gun.shoot()
            }
        })
    }

    private loadResources = async () => {
        try {
            const images = await ImageLoader.queue([
                require("../img/png/bullet.png"),
                require("../img/png/dollar.png"),
                require("../img/png/bad-guy.png"),
                require("../img/png/good-guy.png"),
                require("../img/png/tower.png")
            ]).fetch()
            this.loadedImages = images as any[]
        } catch(e) {
            this.setHasFailed(e)
        }
    }
    public startGame = () => {
        
    }

    public draw = () => {
        
    }
}

export const game = InitializeGame.getInstance()