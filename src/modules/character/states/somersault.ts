import StateJump from './jump'
import StateManager from '../stateManager'

export default class StateSomersault extends StateJump {
    constructor(stateManager: StateManager) {
        super(stateManager, 'somersault')
    }

    onAction1() {}

    canChangeState() {
        return !this.stateManager.playerController.jumpBlocked
    }

    onChangeState() {
        this.stateManager.playerController.jumpBlocked = true
    }

    onDown() {
        this.stateManager.changeState(this.stateManager.stateJump)
    }
}
