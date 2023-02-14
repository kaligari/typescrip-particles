import { floor } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'

class UserInput {
    mouseX: number
    mouseY: number
    mouseClick: boolean
    keyPressed: string[]
    keyPressedOnce: string[]

    constructor() {
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

    getMousePosition(event: MouseEvent) {
        const rect = rendererEngine.canvas.getBoundingClientRect()

        const mouseX = floor((event.clientX - rect.left) / rendererEngine.scale)
        if (mouseX >= 0 && mouseX <= rendererEngine.width) {
            this.mouseX = mouseX
        }

        const mouseY = floor((event.clientY - rect.top) / rendererEngine.scale)
        if (mouseY >= 0 && mouseY <= rendererEngine.height) {
            this.mouseY = mouseY
        }
    }

    getMouseDown() {
        this.mouseClick = true
    }

    getMouseUp() {
        this.mouseClick = false
    }

    getKeyDown(event: KeyboardEvent) {
        if (!this.keyPressed.includes(event.code)) {
            this.keyPressed.push(event.code)

            if (!this.keyPressedOnce.includes(event.code)) {
                this.keyPressedOnce.push(event.code)
            }
        }
    }

    getKeyUp(event: KeyboardEvent) {
        if (this.keyPressed.includes(event.code)) {
            const idx = this.keyPressed.findIndex(item => item === event.code)
            this.keyPressed.splice(idx, 1)
        }
    }

    resetInput() {
        return (this.keyPressedOnce = [])
    }

    isKeyPressed(key: string) {
        return this.keyPressed.includes(key)
    }

    isKeyPressedOnce(key: string) {
        return this.keyPressedOnce.includes(key)
    }
}

const userInput = new UserInput()
export default userInput
