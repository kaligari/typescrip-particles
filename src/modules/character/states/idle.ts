import PlayerController from '../playerController'
import State from '../state'
import StateManager from '../stateManager'

export default class StateIdle extends State {
    constructor(stateManager: StateManager, name = 'idle') {
        super(stateManager, name)
    }

    update() {
        this.stateManager.playerController.interpolateForceX(
            this.stateManager.playerController.X_DECELERATION,
            this.stateManager.playerController.X_DESIRED_DECELERATION,
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
        this.stateManager.playerController.accY -= this.stateManager.playerController.X_JUMP
        this.stateManager.changeState(this.stateManager.stateJump)
    }
}
