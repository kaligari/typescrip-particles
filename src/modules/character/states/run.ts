import Character from '@/modules/character/character'
import State from '../state'

export default class StateRun extends State {
    constructor(character: Character, name = 'run') {
        super(character, name)
    }

    update() {
        if (this.character.inputXPressure === 0) {
            this.character.interpolateForceX(
                this.character.X_DECELERATION,
                this.character.X_DESIRED_DECELERATION,
            )
        }
    }

    onLeft() {
        this.character.isLeft = true
        if (this.character.currSpeedX > 0) {
            this.character.interpolateForceX(this.character.X_OPPOSITE_DECELERATION, 0)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = true
            }
            return
        }
        this.character.interpolateForceX(
            this.character.X_ACCELERATION * this.character.inputXPressure,
            -this.character.X_DESIRED_ACCELERATION,
        )
    }

    onRight() {
        this.character.isLeft = false
        if (this.character.currSpeedX < 0) {
            this.character.interpolateForceX(this.character.X_OPPOSITE_DECELERATION, 0)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = false
            }
            return
        }
        this.character.interpolateForceX(
            this.character.X_ACCELERATION * this.character.inputXPressure,
            this.character.X_DESIRED_ACCELERATION,
        )
    }

    onDown() {
        this.character.changeState(this.character.stateIdle)
    }

    onAction1() {
        this.character.currSpeedY -= this.character.X_JUMP_FROM_RUN
        this.character.changeState(this.character.stateJump)
    }
}
