import StateRun from './run'
import StateManager from '../stateManager'

export default class StateFall extends StateRun {
    constructor(stateManager: StateManager, name = 'fall') {
        super(stateManager, name)
    }

    onDown() {
        this.stateManager.parent.accY += this.stateManager.parent.X_CROUCH
        this.stateManager.changeState(this.stateManager.stateJump)
    }

    onAction1() {
        if (this.stateManager.changeState(this.stateManager.stateSomersault)) {
            this.stateManager.parent.accY = 0
            this.stateManager.parent.accY -= this.stateManager.parent.X_SOMERSAULT
        }
    }
}
