import GameScript from '@/libs/gameScript'
import userInput from '../userInput/userInput'
import Character from './character'

export default class HandleInput extends GameScript {
    parent: Character

    constructor(parent: Character) {
        super()
        this.parent = parent
    }

    update() {
        userInput.update()
        if (userInput.start) {
            location.reload()
            return
        }
        if (userInput.actionA) {
            this.parent.state.onAction1()
            this.parent.inputYPressure = 1
            return
        }
        if (userInput.down) {
            this.parent.state.onDown()
            return
        }
        if (userInput.right) {
            this.parent.state.onRight()
            // TODO Read pressure from controller
            this.parent.inputXPressure = 1
            return
        }
        if (userInput.left) {
            this.parent.state.onLeft()
            this.parent.inputXPressure = 1
            return
        }
        this.parent.state.onNoInput()
        this.parent.inputXPressure = 0
        this.parent.inputYPressure = 0
    }
}
