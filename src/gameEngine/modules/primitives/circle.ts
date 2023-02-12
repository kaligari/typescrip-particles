import Game from "../../game"
import Color from "../../libs/color"

export default class Circle {
    game: Game
    xc: number
    yc: number
    radius: number
    color: Color

    constructor(game: Game, xc: number, yc: number, radius: number, color: Color) {
        this.game = game
        this.xc = xc
        this.yc = yc
        this.radius = radius
        this.color = color
    }

    drawCircle(xc: number, yc: number, x: number, y: number) {
        this.game.rendererEngine.drawPixel(xc+x, yc+y, this.color)
        this.game.rendererEngine.drawPixel(xc-x, yc+y, this.color);
        this.game.rendererEngine.drawPixel(xc+x, yc-y, this.color);
        this.game.rendererEngine.drawPixel(xc-x, yc-y, this.color);
        this.game.rendererEngine.drawPixel(xc+y, yc+x, this.color);
        this.game.rendererEngine.drawPixel(xc-y, yc+x, this.color);
        this.game.rendererEngine.drawPixel(xc+y, yc-x, this.color);
        this.game.rendererEngine.drawPixel(xc-y, yc-x, this.color);
    }

    draw() {
        let x = 0
        let y = this.radius
        let d = 3 - 2 * this.radius
        this.drawCircle(this.xc, this.yc, x, y)

        while (y >= x) {
            x++
            if (d > 0){
                y--;
                d = d + 4 * (x - y)
            } else {
                d = d + 4 * x
            }
            this.drawCircle(this.xc, this.yc, x, y)
        }
    }

    fill() {
        for(let y = -this.radius; y <= this.radius; y++) {
            for(let x = -this.radius; x <= this.radius; x++) {
                if(x * x + y * y <= this.radius * this.radius) {
                    this.game.rendererEngine.drawPixel(this.xc + x, this.yc + y, this.color);
                }
            }
        }
                    
    }

}