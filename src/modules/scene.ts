import Color from "./color"
import Game from "./game"
import Pathfinder from "./Pathfinder/pathfinder"

export default class Scene {
    game: Game
    pathfinder: Pathfinder
    
    constructor(game: Game) {
        this.game = game
        this.pathfinder = new Pathfinder(game)
    }

    render() {
        this.drawBackground()
        this.pathfinder.drawChecker()
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