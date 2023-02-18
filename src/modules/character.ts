import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { IAnimationFile } from '@/modules/gameAnimation/types'
import animation from '@/modules/gameAnimation/adventurer.json'
import { floor } from '@/helpers/math'
import userInput from '@/modules/userInput/userInput'
import rendererEngine from '@/rendererEngine'
import State from './character/state'
import StateIdle from './character/states/idle'
import StateRun from './character/states/run'
import StateJump from './character/states/jump'
import stateJumpEnd from './character/states/jumpEnd'
import stateSomersault from './character/states/somersault'

export type TStateTypes = StateRun | StateJump

export default class Character {
    animation: GameAnimation
    posX: number
    posY: number
    isLeft: boolean
    state: TStateTypes
    states: TStateTypes[]
    stateIdle: State
    stateRun: State
    stateJump: State
    stateSomersault: State
    stateJumpEnd: State
    accX: number
    accY: number
    currSpeedX: number
    currSpeedY: number

    constructor() {
        this.animation = new GameAnimation(animation as IAnimationFile)
        this.states = []
        this.posX = 0
        this.posY = 50
        this.isLeft = false
        this.stateRun = new StateRun(this)
        this.stateIdle = new StateIdle(this)
        this.stateJump = new StateJump(this)
        this.stateJumpEnd = new stateJumpEnd(this)
        this.stateSomersault = new stateSomersault(this)
        this.state = this.stateIdle
        this.accX = 0
        this.accY = 0
        this.currSpeedX = 0
        this.currSpeedY = 0
    }

    init() {
        this.posX = rendererEngine.width / 2
    }

    changeState(state: TStateTypes, isLeft: undefined | boolean = undefined) {
        if (this.state === state && this.isLeft === isLeft) return
        if (typeof isLeft !== 'undefined') {
            this.isLeft = isLeft
        }
        this.state = state
        state.onChangeState()
    }

    handleInput() {
        if (userInput.isKeyPressedOnce('Space')) {
            this.state.onAction1()
            this.accY = 1
            return
        }
        if (userInput.isKeyPressed('ArrowDown')) {
            this.state.onDown()
            this.accY = 1
            return
        }
        if (userInput.isKeyPressed('ArrowRight')) {
            this.state.onRight()
            this.accX = 1
            return
        }
        if (userInput.isKeyPressed('ArrowLeft')) {
            this.state.onLeft()
            this.accX = 1
            return
        }
        this.state.onNoInput()
        this.accX = 0
        this.accY = 0
    }

    decelerationX(factor: number, minVal = 0) {
        if (this.currSpeedX > minVal) {
            this.currSpeedX -= factor
            return
        }
        this.currSpeedX = 0
    }

    accelerationX(factor: number, maxVal = 1) {
        const accX = Math.abs(this.accX) * factor
        if (this.currSpeedX < maxVal) {
            this.currSpeedX += accX
            return
        }
        this.currSpeedX = maxVal
    }

    decelerationY(factor: number, minVal = 0) {
        if (this.currSpeedY > minVal) {
            this.currSpeedY -= factor
            return
        }
        this.currSpeedY = 0
    }

    accelerationY(factor: number, maxVal = 1) {
        const accY = Math.abs(this.accY) * factor
        if (this.currSpeedY < maxVal) {
            this.currSpeedY += accY
            return
        }
        this.currSpeedY = maxVal
    }

    calcState() {
        this.state.calc()
        this.state.physics()
    }

    render() {
        this.animation.render(floor(this.posX), this.posY, this.isLeft)
    }
}
