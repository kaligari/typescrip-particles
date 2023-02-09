import Game from "./game";

export default class UserInput {
    game: Game
    mouseX: number
    mouseY: number
    mouseClick: boolean

    constructor(game: Game) {
        this.game = game
        this.mouseX = 0
        this.mouseY = 0
        this.mouseClick = false
        window.addEventListener('mousemove', this.getMousePosition.bind(this), false)
        window.addEventListener('mousedown', this.getMouseDown.bind(this), false)
        window.addEventListener('mouseup', this.getMouseUp.bind(this), false)
    }

    getMousePosition(event: MouseEvent)   {        
        const rect = this.game.rendererEngine.canvas.getBoundingClientRect()
        this.mouseX = Math.floor(event.clientX - rect.left)
        this.mouseY = Math.floor(event.clientY - rect.top)
    }

    getMouseDown() {
        this.mouseClick = true
    }

    getMouseUp() {
        this.mouseClick = false
    }

}