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
import Tiles from '../tiles/tiles'
import Rectangle from '../primitives/rectangle'
import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import game from '@/game'

export type TStateTypes = StateRun | StateJump

export default class Character {
    tiles: Tiles | null
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
    offsetX: number
    offsetY: number
    offsetWidth: number
    offsetHeight: number

    constructor() {
        this.animation = new GameAnimation(animation as ITiledFileTileset)
        this.animation.tiles.load('./adventurer.png')
        this.states = []
        this.posX = 0
        this.posY = 0
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
        this.tiles = null
        this.offsetX = 0
        this.offsetY = 0
        this.offsetWidth = 0
        this.offsetHeight = 0
    }

    init() {
        this.posX = 20
        this.posY = 10
        this.offsetX = 13
        this.offsetY = 6
        this.offsetWidth = 20
        this.offsetHeight = 30
    }

    addCollisionsTiles(tiles: Tiles) {
        this.tiles = tiles
    }

    calcColisions() {}

    calcColision(x: number, y: number) {
        if (!this.tiles) return

        // x = this.posX
        // y = this.posY

        const col = floor(x / this.tiles.tileWidth)
        const row = floor(x / this.tiles.tileWidth)
        const tileId = row * this.tiles.tileSetWidth + (col % this.tiles.tileSetWidth)
        // console.log(tileId)
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
        const posX = floor(this.posX) - cameraX
        const posY = this.posY
        this.animation.render(posX - this.offsetX, posY - this.offsetY, this.isLeft)
        if (game.debug) {
            new Rectangle().draw(
                posX,
                posY,
                this.offsetWidth,
                this.offsetHeight,
                new Color(0, 0, 0),
            )
            rendererEngine.drawPixel(floor(this.posX) - cameraX, this.posY, new Color(255, 0, 0))
        }
    }
}
