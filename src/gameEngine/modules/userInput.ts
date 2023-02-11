import Game from "../game";

export default class UserInput {
    game: Game
    mouseX: number
    mouseY: number
    mouseClick: boolean
    keyPressed: string[]
    keyPressedOnce: string[]

    constructor(game: Game) {
        this.game = game
        this.mouseX = 0
        this.mouseY = 0
        this.mouseClick = false
        this.keyPressed = []
        this.keyPressedOnce = []
        window.addEventListener('mousemove', this.getMousePosition.bind(this), false)
        window.addEventListener('mousedown', this.getMouseDown.bind(this), false)
        window.addEventListener('mouseup', this.getMouseUp.bind(this), false)
        window.addEventListener('keydown', this.getKeyDown.bind(this), false)
        window.addEventListener('keyup', this.getKeyUp.bind(this), false)
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

    getKeyDown(event: KeyboardEvent) {
        
        if(!this.keyPressed.includes(event.code)) {
            this.keyPressed.push(event.code)
            
            if(!this.keyPressedOnce.includes(event.code)) {
                this.keyPressedOnce.push(event.code)
            }
        }
    }

    getKeyUp(event: KeyboardEvent) {
        if(this.keyPressed.includes(event.code)) {
            const idx = this.keyPressed.findIndex(item => item === event.code)
            this.keyPressed.splice(idx, 1)
        }
    }

    resetInput() {
        return this.keyPressedOnce = []
    }

    isKeyPressed(key: string) {
        return this.keyPressed.includes(key)
    }

    isKeyPressedOnce(key: string) {
        return this.keyPressedOnce.includes(key)
    }

}