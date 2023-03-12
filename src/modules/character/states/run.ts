import HandleInput from '../handleInput'
import State from '../state'
import StateManager from '../stateManager'

export default class StateRun extends State {
    constructor(stateManager: StateManager, name = 'run') {
        super(stateManager, name)
    }

    update() {
        const handleInput = this.stateManager.parent.getScript('handleInput') as HandleInput
        if (handleInput.inputXPressure === 0) {
            this.stateManager.playerController.interpolateForceX(
                this.stateManager.playerController.X_DECELERATION,
                this.stateManager.playerController.X_DESIRED_DECELERATION,
            )
        }
    }

    onLeft() {
        this.stateManager.parent.flipY = true
        if (this.stateManager.playerController.accX > 0) {
            this.stateManager.playerController.interpolateForceX(
                this.stateManager.playerController.X_OPPOSITE_DECELERATION,
                0,
            )
            if (this.stateManager.playerController.accX === 0) {
                this.stateManager.parent.flipY = true
            }
            return
        }
        const { inputXPressure } = this.stateManager.parent.getScript('handleInput') as HandleInput
        this.stateManager.playerController.interpolateForceX(
            this.stateManager.playerController.X_ACCELERATION * inputXPressure,
            -this.stateManager.playerController.X_DESIRED_ACCELERATION,
        )
    }

    onRight() {
        this.stateManager.parent.flipY = false
        if (this.stateManager.playerController.accX < 0) {
            this.stateManager.playerController.interpolateForceX(
                this.stateManager.playerController.X_OPPOSITE_DECELERATION,
                0,
            )
            if (this.stateManager.playerController.accX === 0) {
                this.stateManager.parent.flipY = false
            }
            return
        }
        const { inputXPressure } = this.stateManager.parent.getScript('handleInput') as HandleInput
        this.stateManager.playerController.interpolateForceX(
            this.stateManager.playerController.X_ACCELERATION * inputXPressure,
            this.stateManager.playerController.X_DESIRED_ACCELERATION,
        )
    }

    onDown() {
        this.stateManager.changeState(this.stateManager.stateIdle)
    }

    onAction1() {
        this.stateManager.playerController.accY -=
            this.stateManager.playerController.X_JUMP_FROM_RUN
        this.stateManager.changeState(this.stateManager.stateJump)
    }
}
