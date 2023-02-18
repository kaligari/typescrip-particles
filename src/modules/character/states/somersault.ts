import Character from '@/modules/character'
import StateJump from './jump'

export default class StateSomersault extends StateJump {
    constructor(character: Character) {
        super(character, 'somersault')
    }

    onAction1() {}

    onDown() {
        this.character.accelerationY(1, 20)
        this.character.changeState(this.character.stateJump)
    }
}
