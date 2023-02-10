import Color from "./color"
import Game from "./game"
import GameObject from "./gameObject"
import Primitives from "./primitives"

export default class Rectangle extends GameObject {
    game: Game
    selected: boolean
    borderColor: Color
    gCost: number | undefined
    hCost: number | undefined
    fCost: number | undefined

    constructor(game: Game) {
        super(game)
        this.game = game
        this.width = 30
        this.height = 30
        this.selected = false
        this.borderColor = new Color(128, 128, 128)
    }

    handleInput() {
        if(this.isMouseClick()) {
            this.selected = true
        }
    }

    drawBackground() {
        if(this.selected) {
            new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(20, 20, 20))
            return
        }
        if(this.isMouseHover()) {
            new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 128, 0))
            return
        }
        new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor)
    }

    drawText() {
        if(this.gCost) {
            this.game.userInterface.text(this.gCost.toString(), this.x + 2, this.y + 2, new Color(0, 0, 60))
        }
        if(this.hCost) {
            this.game.userInterface.text(this.hCost.toString(), this.x + this.width - 11, this.y + 2, new Color(60, 0, 0))
        }
        if(this.fCost) {
            this.game.userInterface.text(this.fCost.toString(), this.x + 11, this.y + 20, new Color(0, 0, 0))
        }
    }

    draw() {
        this.drawBackground()
        this.drawText()
    }
    
}