import Character from '../character'

export default abstract class State {
    character: Character
    name: string

    constructor(character: Character, name: string) {
        this.character = character
        this.name = name
    }

    physics() {
        const minY = 200 - 55
        if (this.character.posY < minY) {
            this.character.currSpeedY += 0.15
            if (this.character.currSpeedY > 0) {
                this.character.changeState(this.character.stateFall)
            }
        }

        if (this.character.posY > minY && this.character.currSpeedY > 0) {
            this.character.currSpeedY = 0
            this.character.posY = minY
            this.character.jumpBlocked = false
            if (this.character.currSpeedX > 0) {
                this.character.changeState(this.character.stateRun)
            } else {
                this.character.changeState(this.character.stateIdle)
            }
        }

        const direction = this.character.isLeft ? -1 : 1
        this.character.posX += this.character.currSpeedX * direction
        this.character.posY += Math.round(this.character.currSpeedY)
    }

    calc() {}
    onAction1() {}
    onRight() {}
    onLeft() {}
    onDown() {}
    onNoInput() {
        if (this.character.currSpeedX === 0 && this.character.currSpeedY === 0) {
            this.character.changeState(this.character.stateIdle)
        }
    }
    canChangeState(): boolean {
        return true
    }
    onChangeState() {}
    changeAnimation() {
        this.character.animation.changeAnimation(this.name)
    }
}
