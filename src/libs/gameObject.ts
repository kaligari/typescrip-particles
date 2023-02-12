import userInput from '@/modules/userInput'

export default class GameObject {
    x: number
    y: number
    width: number
    height: number

    constructor() {
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
    }

    isMouseHover() {
        const mouseX = userInput.mouseX
        const mouseY = userInput.mouseY
        return (
            mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + this.height
        )
    }

    isMouseClick() {
        return userInput.mouseClick && this.isMouseHover()
    }
}
