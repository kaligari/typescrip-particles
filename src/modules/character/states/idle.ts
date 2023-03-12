import State from '../state'
import StateManager from '../stateManager'

export default class StateIdle extends State {
    constructor(stateManager: StateManager, name = 'idle') {
        super(stateManager, name)
    }

    update() {
        this.stateManager.interpolateForceX(
            this.stateManager.parent.X_DECELERATION,
            this.stateManager.parent.X_DESIRED_DECELERATION,
        )
    }

    onRight() {
        this.stateManager.changeState(this.stateManager.stateRun)
    }

    onLeft() {
        this.stateManager.changeState(this.stateManager.stateRun)
    }

    onDown() {
        this.stateManager.changeState(this.stateManager.stateCrouch)
    }

    onAction1() {
        this.stateManager.parent.accY -= this.stateManager.parent.X_JUMP
        this.stateManager.changeState(this.stateManager.stateJump)
    }
}
