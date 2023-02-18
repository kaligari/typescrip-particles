import Character from '@/modules/character'
import State from '../state'

export default class StateRun extends State {
    constructor(character: Character, name = 'run') {
        super(character, name)
    }

    calc() {
        if (this.character.accX === 0) {
            this.character.decelerationX(0.15)
            return
        }
        this.character.accelerationX(0.2, 2.5)
    }

    onLeft() {
        if (!this.character.isLeft) {
            this.character.decelerationX(0.6)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = true
            }
        }
    }

    onRight() {
        if (this.character.isLeft) {
            this.character.decelerationX(0.6)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = false
            }
        }
    }

    onDown() {
        this.character.changeState(this.character.stateIdle)
    }

    onAction1() {
        this.character.currSpeedY -= 4
        this.character.changeState(this.character.stateJump)
    }
}
