import Color from "./color"
import Game from "./game"
import Rectangle from "./rectangle"

export default class Scene {
    game: Game
    rects: Rectangle[]
    rectsX = 5
    rectsY = 3

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
        for(let i = 0; i < this.rectsX; i++) {
            for(let j = 0; j < this.rectsY; j++) {
                this.rects[i * j].handleInput()
                this.rects[i * j].x = i * this.rects[i * j].width
                this.rects[i * j].y = j * this.rects[i * j].height
                this.rects[i * j].draw()
            }
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