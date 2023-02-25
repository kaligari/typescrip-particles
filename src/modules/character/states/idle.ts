import Character from '@/modules/character/character'
import State from '../state'

export default class StateIdle extends State {
    constructor(character: Character, name = 'idle') {
        super(character, name)
    }

    update() {
        this.character.interpolateForceX(0.15, 0)
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
        this.character.currSpeedY -= 4
        this.character.changeState(this.character.stateJump)
    }
}
