import Character from './character'

export default abstract class State {
    character: Character
    name: string

    constructor(character: Character, name: string) {
        this.character = character
        this.name = name
    }

    updateAlways() {
        // if (this.character.inputXPressure === 0) {
        //     this.character.interpolateForceX(0.2, 1)
        // }
        // apply gravity
        // const gravity = 0.01
        // this.character.currSpeedX += gravity
        // this.character.posX += 0.01 * this.character.posX
        // -----------------------------------------
        if (this.character.boundBottom === null) {
            this.character.accY += this.character.Y_GRAVITY
            if (this.character.accY > 0) {
                this.character.changeState(this.character.stateFall)
            }
        }

        if (
            this.character.boundBottom &&
            this.character.y > this.character.boundBottom &&
            this.character.accY > 0
        ) {
            this.character.accY = 0
            this.character.y = this.character.boundBottom
            this.character.jumpBlocked = false
            if (this.character.accY > 0 && this.character.inputXPressure !== 0) {
                this.character.changeState(this.character.stateRun)
            } else {
                this.character.changeState(this.character.stateIdle)
            }
        }
    }
    onNoInput() {
        if (this.character.accX === 0 && this.character.accY === 0) {
            this.character.changeState(this.character.stateIdle)
        }
    }
    canChangeState(): boolean {
        return true
    }
    changeAnimation() {
        this.character.animation.changeAnimation(this.name)
    }

    update() {}
    onAction1() {}
    onRight() {}
    onLeft() {}
    onDown() {}
    onChangeState() {}
}
