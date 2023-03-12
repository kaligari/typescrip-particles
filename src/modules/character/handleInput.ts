import GameScript from '@/libs/gameScript'
import userInput from '../userInput/userInput'
import Character from './character'
import StateManager from './stateManager'

export default class HandleInput extends GameScript {
    parent: Character

    constructor(name: string, parent: Character) {
        super(name)
        this.parent = parent
    }

    update() {
        userInput.update()
        if (userInput.start) {
            location.reload()
            return
        }
        if (userInput.actionA) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onAction1()
            this.parent.inputYPressure = 1
            return
        }
        if (userInput.down) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onDown()
            return
        }
        if (userInput.right) {
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onRight()
            // TODO Read pressure from controller
            this.parent.inputXPressure = 1
            return
        }
        if (userInput.left) {
            // this.parent.state.onLeft()
            ;(this.parent.getScript('stateManager') as StateManager)?.state.onLeft()
            this.parent.inputXPressure = 1
            return
        }
        // this.parent.state.onNoInput()
        ;(this.parent.getScript('stateManager') as StateManager)?.state.onNoInput()
        this.parent.inputXPressure = 0
        this.parent.inputYPressure = 0
    }
}
