import Character from '@/modules/character/character'
import State from '../state'

export default class StateRun extends State {
    constructor(character: Character, name = 'run') {
        super(character, name)
    }

    update() {
        if (this.character.inputXPressure === 0) {
            this.character.decelerationX(0.1)
        }
    }

    onLeft() {
        if (!this.character.isLeft) {
            this.character.decelerationX(0.6)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = true
            }
        }
        this.character.accelerationX(0.15, 2)
    }

    onRight() {
        if (this.character.isLeft) {
            this.character.decelerationX(0.6)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = false
            }
        }
        this.character.accelerationX(0.15, 2)
    }

    onDown() {
        this.character.changeState(this.character.stateIdle)
    }

    onAction1() {
        this.character.currSpeedY -= 4
        this.character.changeState(this.character.stateJump)
    }
}
