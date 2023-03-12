import GameScript from '@/libs/gameScript'
import userInput from '../userInput/userInput'
import Character from './character'
import StateManager from './stateManager'

export default class HandleInput extends GameScript {
    parent: Character
    inputXPressure: number
    inputYPressure: number

    constructor(name: string, parent: Character) {
        super(name)
        this.parent = parent
        this.inputXPressure = 0
        this.inputYPressure = 0
    }

    update() {
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
            // this.parent.state.onLeft()
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onLeft()
            this.inputXPressure = 1
            return
        }
        // this.parent.state.onNoInput()
        ;(this.parent.getScript('stateManager') as StateManager)?.state.onNoInput()
        this.inputXPressure = 0
        this.inputYPressure = 0
    }
}
