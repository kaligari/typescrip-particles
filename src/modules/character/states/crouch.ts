import Character from '@/modules/character'
import StateIdle from './idle'

export default class StateCrouch extends StateIdle {
    constructor(character: Character) {
        super(character, 'crouch')
    }

    onRight() {
        this.character.changeState(this.character.stateRun, false)
    }

    onLeft() {
        this.character.changeState(this.character.stateRun, true)
    }

    onAction1() {}
}
