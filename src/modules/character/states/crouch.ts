import Character from '@/modules/character/character'
import StateIdle from './idle'

export default class StateCrouch extends StateIdle {
    constructor(character: Character) {
        super(character, 'crouch')
    }

    onAction1() {}
}
