import GameAnimation from '../gameAnimation/gameAnimation'
import StateManager from './stateManager'

export default abstract class State {
    stateManager: StateManager
    name: string

    constructor(stateManager: StateManager, name: string) {
        this.stateManager = stateManager
        this.name = name
    }

    updateAlways() {
        // if (this.stateManager.parent.inputXPressure === 0) {
        //     this.stateManager.parent.interpolateForceX(0.2, 1)
        // }
        // apply gravity
        // const gravity = 0.01
        // this.stateManager.parent.currSpeedX += gravity
        // this.stateManager.parent.posX += 0.01 * this.stateManager.parent.posX
        // -----------------------------------------
        if (this.stateManager.parent.boundBottom === null) {
            this.stateManager.parent.accY += this.stateManager.parent.Y_GRAVITY
            if (this.stateManager.parent.accY > 0) {
                this.stateManager.changeState(this.stateManager.stateFall)
            }
        }

        if (
            this.stateManager.parent.boundBottom &&
            this.stateManager.parent.y > this.stateManager.parent.boundBottom &&
            this.stateManager.parent.accY > 0
        ) {
            if (
                this.stateManager.parent.accY > 0 &&
                this.stateManager.parent.inputXPressure !== 0
            ) {
                this.stateManager.changeState(this.stateManager.stateRun)
            } else {
                if (this.stateManager.parent.accY > 5) {
                    // TODO Implement dust on crouch
                }
                this.stateManager.changeState(this.stateManager.stateIdle)
            }
            this.stateManager.parent.accY = 0
            this.stateManager.parent.y = this.stateManager.parent.boundBottom
            this.stateManager.parent.jumpBlocked = false
        }
    }
    onNoInput() {
        if (this.stateManager.parent.accX === 0 && this.stateManager.parent.accY === 0) {
            this.stateManager.changeState(this.stateManager.stateIdle)
        }
    }
    canChangeState(): boolean {
        return true
    }
    changeAnimation() {
        const gameAnimation = this.stateManager.parent.getScript('gameAnimation') as GameAnimation
        gameAnimation.changeAnimation(this.name)
    }

    update() {}
    onAction1() {}
    onRight() {}
    onLeft() {}
    onDown() {}
    onChangeState() {}
}
