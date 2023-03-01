import Character from '@/modules/character/character'
import State from '../state'

export default class StateIdle extends State {
    constructor(character: Character, name = 'idle') {
        super(character, name)
    }

    update() {
        this.character.interpolateForceX(
            this.character.X_DECELERATION,
            this.character.X_DESIRED_DECELERATION,
        )
    }

    onRight() {
        this.character.changeState(this.character.stateRun)
    }

    onLeft() {
        this.character.changeState(this.character.stateRun)
    }

    onDown() {
        this.character.changeState(this.character.stateCrouch)
    }

    onAction1() {
        this.character.accY -= this.character.X_JUMP
        this.character.changeState(this.character.stateJump)
    }
}
