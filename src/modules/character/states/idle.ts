import Character from '@/modules/character'
import State from '../state'

export default class StateIdle extends State {
    constructor(character: Character, name = 'idle') {
        super(character, name)
    }

    calc() {
        this.character.decelerationX(0.09)
    }

    onRight() {
        this.character.changeState(this.character.stateRun, false)
    }

    onLeft() {
        this.character.changeState(this.character.stateRun, true)
    }

    onDown() {
        this.character.changeState(this.character.stateCrouch)
    }

    onAction1() {
        this.character.currSpeedY -= 4
        this.character.changeState(this.character.stateJump)
    }
}
