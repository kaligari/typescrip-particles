import StateManager from '../stateManager'
import StateRun from './run'

export default class StateJump extends StateRun {
    constructor(stateManager: StateManager, name = 'jump') {
        super(stateManager, name)
    }

    onAction1() {
        if (this.stateManager.changeState(this.stateManager.stateSomersault)) {
            this.stateManager.parent.accY = 0
            this.stateManager.parent.accY -= this.stateManager.parent.X_SOMERSAULT
        }
    }

    onDown() {
        this.stateManager.changeState(this.stateManager.stateJump)
    }
}
