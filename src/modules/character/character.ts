import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { ITiledFileTileset } from '@/modules/gameAnimation/types'
import { floor, round } from '@/helpers/math'
import userInput from '@/modules/userInput/userInput'
import State from './state'
import StateIdle from './states/idle'
import StateRun from './states/run'
import StateJump from './states/jump'
import StateSomersault from './states/somersault'
import StateFall from './states/fall'
import StateCrouch from './states/crouch'
import Rectangle from '../primitives/rectangle'
import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import TileSet from '../tileSet'
import TileCollider from '../collider'
import camera from '@/libs/camera'
import RigidBody from '@/libs/rigidBody'

export type TStateTypes = StateRun | StateJump

export default class Character extends RigidBody {
    tiles: TileSet | null
    animation: GameAnimation
    isLeft: boolean
    state: TStateTypes
    states: TStateTypes[]
    stateIdle: State
    stateRun: State
    stateJump: State
    stateSomersault: State
    stateFall: State
    stateCrouch: State
    inputXPressure: number
    inputYPressure: number
    jumpBlocked: boolean
    offsetX: number
    offsetY: number
    boundBottom: number | null
    collider: TileCollider | null
    X_ACCELERATION: number
    X_DESIRED_ACCELERATION: number
    X_DECELERATION: number
    X_DESIRED_DECELERATION: number
    X_OPPOSITE_DECELERATION: number
    X_JUMP: number
    X_JUMP_FROM_RUN: number
    X_SOMERSAULT: number
    X_CROUCH: number

    constructor() {
        super()
        this.animation = new GameAnimation()
        this.states = []
        this.isLeft = false
        this.stateRun = new StateRun(this)
        this.stateIdle = new StateIdle(this)
        this.stateJump = new StateJump(this)
        this.stateSomersault = new StateSomersault(this)
        this.stateFall = new StateFall(this)
        this.stateCrouch = new StateCrouch(this)
        this.state = this.stateIdle
        this.inputXPressure = 0
        this.inputYPressure = 0
        this.jumpBlocked = false
        this.tiles = null
        this.offsetX = 0
        this.offsetY = 0
        this.boundBottom = null
        this.collider = null
        // -----
        this.X_ACCELERATION = 0.15
        this.X_DESIRED_ACCELERATION = 3
        this.X_DECELERATION = 0.15
        this.X_DESIRED_DECELERATION = 0
        this.X_OPPOSITE_DECELERATION = 0.15
        this.X_JUMP = 3
        this.X_JUMP_FROM_RUN = 4
        this.X_SOMERSAULT = 4
        this.X_CROUCH = 0.5
    }

    load(animation: ITiledFileTileset) {
        this.animation.load(animation)
        this.x = 120
        this.y = 20
        this.offsetX = animation.tileoffset.x
        this.offsetY = animation.tileoffset.y
        this.width = 20
        this.height = 30
    }

    addCollisionsTiles(tiles: TileSet) {
        this.tiles = tiles
        this.collider = new TileCollider(this, tiles)
    }

    calcColision(x: number, y: number) {
        if (!this.tiles) return null

        const col = floor(x / this.tiles.tileWidth)
        const row = floor(y / this.tiles.tileWidth)
        const tileId = row * this.tiles.tileSetWidth + col

        if (this.tiles.tiles[tileId] !== 0) {
            return row * this.tiles.tileHeight
        }
        return null
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
        userInput.update()
        if (userInput.actionA) {
            this.state.onAction1()
            this.inputYPressure = 1
            return
        }
        if (userInput.down) {
            this.state.onDown()
            return
        }
        if (userInput.right) {
            this.state.onRight()
            // TODO Read pressure from controller
            this.inputXPressure = 1
            return
        }
        if (userInput.left) {
            this.state.onLeft()
            this.inputXPressure = 1
            return
        }
        this.state.onNoInput()
        this.inputXPressure = 0
        this.inputYPressure = 0
    }

    updateState() {
        this.collider?.update()
        this.state.updateAlways()
        this.state.update()
        if (!this.collider) return
        if (!this.tiles) return

        if (this.accX > 0) {
            // end of the level
            if (this.x >= this.tiles.tileSetWidth * this.tiles.tileWidth - this.width) {
                this.accX = 0
            }
            for (
                let tileId = this.collider.topRightTileId;
                tileId < this.collider.bottomRightTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tile = this.tiles.tiles[tileId]
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                if (tile !== 0) {
                    this.accX = 0
                    if (rendererEngine.debug) {
                        new Rectangle().draw(
                            tmpX * this.tiles.tileWidth - camera.x,
                            tmpY * this.tiles.tileHeight,
                            this.tiles.tileWidth,
                            this.tiles.tileHeight,
                            new Color(0, 0, 0),
                            new Color(255, 0, 0),
                        )
                    }
                    continue
                }
            }
        }

        if (this.accX < 0) {
            // begin of the level
            if (this.x <= 0) {
                this.accX = 0
            }

            for (
                let tileId = this.collider.topLeftTileId;
                tileId < this.collider.bottomLeftTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tile = this.tiles.tiles[tileId]
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                if (tile !== 0) {
                    this.accX = 0
                    if (rendererEngine.debug) {
                        new Rectangle().draw(
                            tmpX * this.tiles.tileWidth - camera.x,
                            tmpY * this.tiles.tileHeight,
                            this.tiles.tileWidth,
                            this.tiles.tileHeight,
                            new Color(0, 0, 0),
                            new Color(255, 0, 0),
                        )
                    }
                    continue
                }
            }
        }

        if (rendererEngine.debug) {
            for (
                let tileId = this.collider.topRightTileId;
                tileId < this.collider.bottomRightTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                new Rectangle().draw(
                    tmpX * this.tiles.tileWidth - camera.x,
                    tmpY * this.tiles.tileHeight,
                    this.tiles.tileWidth,
                    this.tiles.tileHeight,
                    new Color(0, 0, 0),
                )
            }
            for (
                let tileId = this.collider.topLeftTileId;
                tileId < this.collider.bottomLeftTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                new Rectangle().draw(
                    tmpX * this.tiles.tileWidth - camera.x,
                    tmpY * this.tiles.tileHeight,
                    this.tiles.tileWidth,
                    this.tiles.tileHeight,
                    new Color(0, 0, 0),
                )
            }
            // for (
            //     let tileId = this.collider.bottomLeftTileId;
            //     tileId <= this.collider.bottomRightTileId;
            //     tileId++
            // ) {
            //     const tmpX = tileId % this.tiles.tileSetWidth
            //     const tmpY = floor(tileId / this.tiles.tileSetWidth)
            //     new Rectangle().draw(
            //         tmpX * this.tiles.tileWidth - camera.x,
            //         tmpY * this.tiles.tileHeight,
            //         this.tiles.tileWidth,
            //         this.tiles.tileHeight,
            //         new Color(0, 255, 0),
            //     )
            // }
            for (
                let tileId = this.collider.topLeftTileId;
                tileId <= this.collider.topRightTileId;
                tileId++
            ) {
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                new Rectangle().draw(
                    tmpX * this.tiles.tileWidth - camera.x,
                    tmpY * this.tiles.tileHeight,
                    this.tiles.tileWidth,
                    this.tiles.tileHeight,
                    new Color(0, 0, 0),
                )
            }
        }

        const desiredX = this.accX
        const desiredY = round(this.accY)

        const x = floor(this.x) + desiredX
        const y = floor(this.y) + desiredY

        const bottomX = x + floor(this.width / 2)
        const bottomY = y + this.height
        const collisionBottom = this.calcColision(bottomX, bottomY)
        if (collisionBottom !== null && this.boundBottom === null) {
            this.boundBottom = collisionBottom - this.height
        } else if (collisionBottom === null) {
            this.boundBottom = null
        }

        const topX = x + floor(this.width / 2)
        const topY = y
        const collisionTop = this.calcColision(topX, topY)
        if (collisionTop !== null) {
            this.accY = 0
        }
        this.x += this.accX
        this.y += round(this.accY)
    }

    updateCamera() {
        const playerOffsetX = this.width / 2
        const playerOffsetY = this.height / 2
        const offsetX = rendererEngine.width * 0.5 - playerOffsetX
        const offsetY = rendererEngine.height * 0.5 - playerOffsetY

        if (!this.tiles) return
        if (
            this.x - offsetX > 0 &&
            this.x + offsetX + this.width < this.tiles.tileSetWidth * this.tiles.tileWidth
        ) {
            camera.x = this.x - offsetX
        }

        if (
            this.y - offsetY > 0 &&
            this.y + offsetY + this.height < this.tiles.tileSetHeight * this.tiles.tileHeight
        ) {
            camera.y = this.y - offsetY
        }
    }

    render() {
        const x = round(this.x) - camera.x
        const y = round(this.y) - camera.y
        this.animation.render(x - this.offsetX, y - this.offsetY, this.isLeft)
        if (rendererEngine.debug) {
            new Rectangle().draw(x, y, this.width, this.height, new Color(0, 0, 0))
        }
    }
}
