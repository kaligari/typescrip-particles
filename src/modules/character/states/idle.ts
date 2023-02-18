import Character from '@/modules/character'
import State from '../state'

export default class StateIdle extends State {
    constructor(character: Character) {
        super(character, 'idle')
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

    onAction1() {
        this.character.currSpeedY -= 3
        this.character.changeState(this.character.stateJump)
    }
}
