import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { ITiledFileTileset } from '@/modules/gameAnimation/types'
import animation from '@/modules/gameAnimation/adventurer.json'
import { abs, floor } from '@/helpers/math'
import userInput from '@/modules/userInput/userInput'
import State from './state'
import StateIdle from './states/idle'
import StateRun from './states/run'
import StateJump from './states/jump'
import StateSomersault from './states/somersault'
import StateFall from './states/fall'
import StateCrouch from './states/crouch'

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
    stateFall: State
    stateCrouch: State
    accX: number
    accY: number
    currSpeedX: number
    currSpeedY: number
    jumpBlocked: boolean

    constructor() {
        this.animation = new GameAnimation(animation as ITiledFileTileset)
        this.animation.tiles.load('./adventurer.png')
        this.states = []
        this.posX = 0
        this.posY = 50
        this.isLeft = false
        this.stateRun = new StateRun(this)
        this.stateIdle = new StateIdle(this)
        this.stateJump = new StateJump(this)
        this.stateSomersault = new StateSomersault(this)
        this.stateFall = new StateFall(this)
        this.stateCrouch = new StateCrouch(this)
        this.state = this.stateIdle
        this.accX = 0
        this.accY = 0
        this.currSpeedX = 0
        this.currSpeedY = 0
        this.jumpBlocked = false
    }

    init() {
        this.posX = 0
    }

    changeState(state: TStateTypes) {
        if (this.state === state) return
        if (state.canChangeState()) {
            this.state = state
            state.changeAnimation()
            state.onChangeState()
            return true
        }
        return false
    }

    handleInput() {
        if (userInput.isKeyPressedOnce('Space')) {
            this.state.onAction1()
            this.accY = 1
            return
        }
        if (userInput.isKeyPressed('ArrowDown')) {
            this.state.onDown()
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
        const accX = abs(this.accX) * factor
        if (this.currSpeedX < maxVal) {
            this.currSpeedX += accX
            return
        }
        this.currSpeedX = maxVal
    }

    calcState() {
        this.state.calc()
        this.state.physics()
    }

    render(cameraX: number) {
        this.animation.render(floor(this.posX) - cameraX, this.posY, this.isLeft)
        // new Rectangle().draw(floor(this.posX) - cameraX, this.posY, 50, 37, new Color(0, 0, 0))
    }
}
