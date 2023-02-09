import Color from "./color"
import Game from "./game"
import GameObject from "./gameObject"
import Primitives from "./primitives"

export default class Rectangle extends GameObject {
    game: Game
    selected: boolean

    constructor(game: Game) {
        super(game)
        this.game = game
        this.width = 50
        this.height = 50
        this.selected = false
    }

    handleInput() {
        if(this.isMouseClick()) {
            this.selected = true
        }
    }

    draw() {
        if(this.selected) {
            new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, new Color(255, 255, 255), new Color(20, 20, 20))
            return
        }
        if(this.isMouseHover()) {
            new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, new Color(255, 255, 255), new Color(0, 128, 0))
            return
        }
        new Primitives(this.game).drawRect(this.x, this.y, this.width, this.height, new Color(255, 255, 255))
    }
    
}