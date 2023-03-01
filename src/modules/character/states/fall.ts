import Character from '@/modules/character/character'
import StateRun from './run'

export default class StateFall extends StateRun {
    constructor(character: Character, name = 'fall') {
        super(character, name)
    }

    onDown() {
        this.character.accY += this.character.X_CROUCH
        this.character.changeState(this.character.stateJump)
    }

    onAction1() {
        if (this.character.changeState(this.character.stateSomersault)) {
            this.character.accY = 0
            this.character.accY -= this.character.X_SOMERSAULT
        }
    }
}
