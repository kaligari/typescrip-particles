import Character from '@/modules/character'
import State from '../state'

export default class StateRun extends State {
    constructor(character: Character, name = 'run') {
        super(character, name)
    }

    calc() {
        if (this.character.accX === 0) {
            this.character.decelerationX(0.1)
            return
        }
        this.character.accelerationX(0.1, 2)
    }

    onLeft() {
        if (!this.character.isLeft) {
            this.character.decelerationX(0.4)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = true
            }
        }
    }

    onRight() {
        if (this.character.isLeft) {
            this.character.decelerationX(0.4)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = false
            }
        }
    }

    onAction1() {
        this.character.currSpeedY -= 2
        this.character.changeState(this.character.stateJump)
    }
}
