import Character from '@/modules/character/character'
import State from '../state'

export default class StateRun extends State {
    constructor(character: Character, name = 'run') {
        super(character, name)
    }

    update() {
        // console.log('sss')
        if (this.character.inputXPressure === 0) {
            this.character.interpolateForceX(0.15, 0)
        }
    }

    onLeft() {
        this.character.isLeft = true
        if (this.character.currSpeedX > 0) {
            this.character.interpolateForceX(0.15, 0)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = true
            }
            return
        }
        this.character.interpolateForceX(0.15 * this.character.inputXPressure, -2)
    }

    onRight() {
        this.character.isLeft = false
        if (this.character.currSpeedX < 0) {
            this.character.interpolateForceX(0.15, 0)
            if (this.character.currSpeedX === 0) {
                this.character.isLeft = false
            }
            return
        }
        this.character.interpolateForceX(0.15 * this.character.inputXPressure, 2)
    }

    onDown() {
        this.character.changeState(this.character.stateIdle)
    }

    onAction1() {
        this.character.currSpeedY -= 4
        this.character.changeState(this.character.stateJump)
    }
}
