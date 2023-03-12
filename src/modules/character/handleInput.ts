import GameScript from '@/libs/gameScript'
import userInput from '../userInput/userInput'
import StateManager from './stateManager'
import GameObject from '@/libs/gameObject'

export default class HandleInput extends GameScript {
    inputXPressure: number
    inputYPressure: number

    constructor(name: string, parent: GameObject) {
        super(name, parent)
        this.inputXPressure = 0
        this.inputYPressure = 0
    }

    override update() {
        userInput.update()
        if (userInput.start) {
            location.reload()
            return
        }
        if (userInput.actionA) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onAction1()
            this.inputYPressure = 1
            return
        }
        if (userInput.down) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onDown()
            return
        }
        if (userInput.right) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onRight()
            // TODO Read pressure from controller
            this.inputXPressure = 1
            return
        }
        if (userInput.left) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onLeft()
            this.inputXPressure = 1
            return
        }
        ;(this.parent.getScript('stateManager') as StateManager)?.state.onNoInput()
        this.inputXPressure = 0
        this.inputYPressure = 0
    }
}
