import Color from "../../libs/color";
import Game from "../../game";

export default class Rectangle {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    draw(x: number, y: number, width: number, height: number, color: Color, fill: Color | null = null) {
        // TODO Optimize number of drawing pixels
        for(let i = x; i <= x + width; i++) {
            for(let j = y; j <= y + height; j++) {
                if(i >= this.game.width || j >= this.game.height) continue
                if(i === x || i === x + width || j === y || j === y + height) {
                    this.game.rendererEngine.drawPixel(i, j, color)
                    continue
                }
                if(fill) {
                    this.game.rendererEngine.drawPixel(i, j, fill)
                }
            }
        }
    }
}