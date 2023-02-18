import Character from '@/modules/character'
import StateRun from './run'

export default class StateJump extends StateRun {
    constructor(character: Character, name = 'jump') {
        super(character, name)
    }

    onAction1() {
        this.character.currSpeedY = 0
        this.character.currSpeedY -= 3
        this.character.changeState(this.character.stateSomersault)
    }

    onDown() {
        this.character.accelerationY(1, 20)
        this.character.changeState(this.character.stateJump)
    }
}
