import Character from '@/modules/character/character'
import StateRun from './run'

export default class StateJump extends StateRun {
    constructor(character: Character, name = 'jump') {
        super(character, name)
    }

    onAction1() {
        if (this.character.changeState(this.character.stateSomersault)) {
            this.character.currSpeedY = 0
            this.character.currSpeedY -= 5
        }
    }
}
