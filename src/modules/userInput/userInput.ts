import { floor } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'

class UserInput {
    mouseX: number
    mouseY: number
    mouseClick: boolean
    keyPressed: string[]
    keyPressedOnce: string[]
    gamepads: Gamepad[]
    gamepad: Gamepad | null
    buttonPressedOncePrevious: boolean[]
    buttonPressedOnce: boolean[]
    touch: Touch | null
    touchStart: number | null
    BUTTONS = 9

    constructor() {
        this.mouseX = 0
        this.mouseY = 0
        this.mouseClick = false
        this.keyPressed = []
        this.keyPressedOnce = []
        this.gamepads = []
        this.gamepad = null
        this.buttonPressedOncePrevious = Array(this.BUTTONS).fill(false)
        this.buttonPressedOnce = Array(this.BUTTONS).fill(false)
        this.touch = null
        this.touchStart = null
        window.addEventListener('mousemove', this.getMousePosition.bind(this), false)
        window.addEventListener('mousedown', this.getMouseDown.bind(this), false)
        window.addEventListener('mouseup', this.getMouseUp.bind(this), false)
        window.addEventListener('keydown', this.getKeyDown.bind(this), false)
        window.addEventListener('keyup', this.getKeyUp.bind(this), false)
        window.addEventListener('touchstart', this.onTouchStart.bind(this), false)
        window.addEventListener('touchmove', this.onTouchMove.bind(this), false)
        window.addEventListener('touchend', this.onTouchEnd.bind(this), false)
    }

    update() {
        this.buttonPressedOnce = Array(this.BUTTONS).fill(false)

        this.gamepad = navigator.getGamepads()[0]

        if (this.gamepad) {
            for (let i = 0; i <= this.BUTTONS; i++) {
                const gamepadButton = this.gamepad.buttons[i].pressed
                if (gamepadButton && !this.buttonPressedOncePrevious[i]) {
                    this.buttonPressedOnce[i] = true
                }
                this.buttonPressedOncePrevious[i] = gamepadButton
            }
        }
    }

    getMousePosition(event: MouseEvent) {
        if (!rendererEngine.canvas) return
        event.preventDefault()
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
        event.preventDefault()
        if (!this.keyPressed.includes(event.code)) {
            this.keyPressed.push(event.code)

            if (!this.keyPressedOnce.includes(event.code)) {
                this.keyPressedOnce.push(event.code)
            }
        }
    }

    getKeyUp(event: KeyboardEvent) {
        event.preventDefault()
        if (this.keyPressed.includes(event.code)) {
            const idx = this.keyPressed.findIndex(item => item === event.code)
            this.keyPressed.splice(idx, 1)
        }
    }

    isKeyPressed(key: string) {
        return this.keyPressed.includes(key)
    }

    isKeyPressedOnce(key: string) {
        const idx = this.keyPressedOnce.indexOf(key)
        if (idx !== -1) {
            this.keyPressedOnce.splice(idx, 1)
            return true
        }
        return false
    }

    isButtonPressedOnce(button: number) {
        return this.buttonPressedOnce[button]
    }

    onTouchStart(event: TouchEvent) {
        this.touchStart = event.touches[0].clientX
    }

    onTouchMove(event: TouchEvent) {
        this.touch = event.touches[0]
    }

    onTouchEnd() {
        this.touch = null
        this.touchStart = null
    }

    get left() {
        return this.isKeyPressed('ArrowLeft') || this.gamepad?.axes[0] === -1
    }

    get right() {
        return this.isKeyPressed('ArrowRight') || this.gamepad?.axes[0] === 1
    }

    get up() {
        return this.isKeyPressed('ArrowUp')
    }

    get down() {
        return this.isKeyPressed('ArrowDown') || this.gamepad?.axes[1] === 1
    }

    get actionA() {
        return this.isKeyPressedOnce('Space') || this.isButtonPressedOnce(2)
    }

    get start() {
        return this.isKeyPressedOnce('KeyR') || this.isButtonPressedOnce(9)
    }
}

const userInput = new UserInput()
export default userInput
