import Character from '@/modules/character/character'
import StateJump from './jump'

export default class StateSomersault extends StateJump {
    constructor(character: Character) {
        super(character, 'somersault')
    }

    onAction1() {}

    canChangeState() {
        return !this.character.jumpBlocked
    }

    onChangeState() {
        this.character.jumpBlocked = true
    }

    onDown() {
        this.character.changeState(this.character.stateJump)
    }
}
