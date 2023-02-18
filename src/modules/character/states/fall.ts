import Character from '@/modules/character'
import StateRun from './run'

export default class StateFall extends StateRun {
    constructor(character: Character, name = 'fall') {
        super(character, name)
    }

    onDown() {
        this.character.currSpeedY += 0.5
        this.character.changeState(this.character.stateJump)
    }

    onAction1() {
        if (this.character.changeState(this.character.stateSomersault)) {
            this.character.currSpeedY = 0
            this.character.currSpeedY -= 5
        }
    }
}
