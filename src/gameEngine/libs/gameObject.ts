import Game from "../game"

export default class GameObject {
    game: Game
    x: number
    y: number
    width: number
    height: number

    constructor(game: Game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.width = 0
        this.height= 0
    }

    isMouseHover() {
        const mouseX = this.game.userInput.mouseX
        const mouseY = this.game.userInput.mouseY
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height
    }

    isMouseClick() {        
        return this.game.userInput.mouseClick && this.isMouseHover()
    }

}