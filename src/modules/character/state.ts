import GameAnimation from '../gameAnimation/gameAnimation'
import HandleInput from './handleInput'
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

        if (this.stateManager.playerController.boundBottom === null) {
            this.stateManager.playerController.accY += this.stateManager.playerController.Y_GRAVITY
            if (this.stateManager.playerController.accY > 0) {
                this.stateManager.changeState(this.stateManager.stateFall)
            }
        }

        if (
            this.stateManager.playerController.boundBottom &&
            this.stateManager.parent.y > this.stateManager.playerController.boundBottom &&
            this.stateManager.playerController.accY > 0
        ) {
            const handleInput = this.stateManager.parent.getScript('handleInput') as HandleInput
            if (this.stateManager.playerController.accY > 0 && handleInput.inputXPressure !== 0) {
                this.stateManager.changeState(this.stateManager.stateRun)
            } else {
                if (this.stateManager.playerController.accY > 5) {
                    // TODO Implement dust on crouch
                }
                this.stateManager.changeState(this.stateManager.stateIdle)
            }
            this.stateManager.playerController.accY = 0
            this.stateManager.parent.y = this.stateManager.playerController.boundBottom
            this.stateManager.playerController.jumpBlocked = false
        }
    }
    onNoInput() {
        if (
            this.stateManager.playerController.accX === 0 &&
            this.stateManager.playerController.accY === 0
        ) {
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
