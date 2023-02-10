import Color from "./color"
import Game from "./game"
import { floor } from "./helpers"
import Rectangle from "./rectangle"

export default class Scene {
    game: Game
    rects: Rectangle[]
    rectsX = 9
    rectsY = 6

    constructor(game: Game) {
        this.game = game
        this.rects  = new Array(this.rectsX * this.rectsY)
        for(let i = 0; i < this.rectsX * this.rectsY; i++) {
            this.rects[i] = new Rectangle(this.game)
        }
    }

    render() {
        this.drawBackground()
        this.drawChecker()
    }
    
    drawChecker() {
        for(let id = 0; id < this.rectsX * this.rectsY; id++) {
            this.rects[id].handleInput()
            this.rects[id].x = id % this.rectsX * this.rects[id].width
            this.rects[id].y = floor(id / this.rectsX) * this.rects[id].height
            this.rects[id].draw()
        }
    }

    drawBackground() {
        const color = new Color(50, 50, 50)
        for(let y = 0; y < this.game.rendererEngine.height; y++) {
            for(let x = 0; x < this.game.rendererEngine.width; x++) {
                this.game.rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}