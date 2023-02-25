import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { ITiledFileTileset } from '@/modules/gameAnimation/types'
import { abs, floor, round } from '@/helpers/math'
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
import game from '@/game'
import TileSet from '../tileSet'
import TileCollider from '../collider'
import camera from '@/libs/camera'

export type TStateTypes = StateRun | StateJump

export default class Character {
    tiles: TileSet | null
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
    inputXPressure: number
    inputYPressure: number
    currSpeedX: number
    currSpeedY: number
    jumpBlocked: boolean
    offsetX: number
    offsetY: number
    offsetWidth: number
    offsetHeight: number
    boundBottom: number | null
    collider: TileCollider | null

    constructor() {
        this.animation = new GameAnimation()
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
        this.inputXPressure = 0
        this.inputYPressure = 0
        this.currSpeedX = 0
        this.currSpeedY = 0
        this.jumpBlocked = false
        this.tiles = null
        this.offsetX = 0
        this.offsetY = 0
        this.offsetWidth = 0
        this.offsetHeight = 0
        this.boundBottom = null
        this.collider = null
    }

    load(animation: ITiledFileTileset) {
        this.animation.load(animation)
        this.posX = 120
        this.posY = 20
        this.offsetX = animation.tileoffset.x
        this.offsetY = animation.tileoffset.y
        this.offsetWidth = 20
        this.offsetHeight = 30
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

    decelerationX(factor: number, minVal = 0) {
        if (this.currSpeedX > minVal) {
            this.currSpeedX -= factor
            return
        }
        this.currSpeedX = 0
    }

    accelerationX(factor: number, maxVal = 1) {
        if (this.currSpeedX < maxVal) {
            // TODO Remove abs?
            this.currSpeedX += abs(this.inputXPressure) * factor
            return
        }
        this.currSpeedX = maxVal
    }

    calcState() {
        this.collider?.update()
        this.state.calc()
        if (!this.collider) return
        if (!this.tiles) return

        const direction = this.isLeft ? -1 : 1
        const desiredX = this.currSpeedX * direction
        const desiredY = round(this.currSpeedY)

        const x = floor(this.posX) + floor(desiredX)
        const y = floor(this.posY) + floor(desiredY)

        const bottomX = x + floor(this.offsetWidth / 2)
        const bottomY = y + this.offsetHeight
        const collisionBottom = this.calcColision(bottomX, bottomY)
        if (collisionBottom !== null && this.boundBottom === null) {
            this.boundBottom = collisionBottom - this.offsetHeight
        } else if (collisionBottom === null) {
            this.boundBottom = null
        }

        if (!this.isLeft) {
            if (this.posX >= this.tiles.tileSetWidth * this.tiles.tileWidth - this.width) {
                this.currSpeedX = 0
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
                    this.currSpeedX = 0
                    if (game.debug) {
                        new Rectangle().draw(
                            tmpX * 16 - camera.x,
                            tmpY * 16,
                            16,
                            16,
                            new Color(0, 0, 0),
                            new Color(255, 0, 0),
                        )
                    }
                    continue
                } else {
                    if (game.debug) {
                        new Rectangle().draw(
                            tmpX * 16 - camera.x,
                            tmpY * 16,
                            16,
                            16,
                            new Color(0, 0, 0),
                        )
                    }
                }
            }
        }

        if (this.isLeft) {
            if (this.posX <= 0) {
                this.currSpeedX = 0
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
                    this.currSpeedX = 0
                    if (game.debug) {
                        new Rectangle().draw(
                            tmpX * 16 - camera.x,
                            tmpY * 16,
                            16,
                            16,
                            new Color(0, 0, 0),
                            new Color(255, 0, 0),
                        )
                    }
                    continue
                } else {
                    if (game.debug) {
                        new Rectangle().draw(
                            tmpX * 16 - camera.x,
                            tmpY * 16,
                            16,
                            16,
                            new Color(0, 0, 0),
                        )
                    }
                }
            }
        }
        if (game.debug) {
            for (
                let tileId = this.collider.topRightTileId;
                tileId < this.collider.bottomRightTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                new Rectangle().draw(tmpX * 16 - camera.x, tmpY * 16, 16, 16, new Color(0, 0, 0))
            }
            for (
                let tileId = this.collider.topLeftTileId;
                tileId < this.collider.bottomLeftTileId;
                tileId += this.tiles.tileSetWidth
            ) {
                const tmpX = tileId % this.tiles.tileSetWidth
                const tmpY = floor(tileId / this.tiles.tileSetWidth)
                new Rectangle().draw(tmpX * 16 - camera.x, tmpY * 16, 16, 16, new Color(0, 0, 0))
            }
        }

        const topX = x + floor(this.offsetWidth / 2)
        const topY = y
        const collisionTop = this.calcColision(topX, topY)
        if (collisionTop !== null) {
            this.currSpeedY = 0
        }

        this.state.physics()
    }

    updateState() {
        const direction = this.isLeft ? -1 : 1
        const desiredX = this.currSpeedX * direction
        const desiredY = round(this.currSpeedY)

        // this.posX = floor(this.posX + desiredX)
        // this.posY = floor(this.posY + desiredY)

        this.posX = this.posX + desiredX
        this.posY = this.posY + desiredY

        // update camera
        const marginRight = rendererEngine.width * 0.45
        const marginLeft = rendererEngine.width * 0.55

        if (!this.tiles) return

        if (
            camera.x < this.posX - marginRight &&
            this.posX <
                this.tiles?.tileSetWidth * this.tiles?.tileWidth - rendererEngine.width * 0.45
        ) {
            camera.x += 2
        }
        if (camera.x > this.posX - marginLeft && camera.x > 0) {
            camera.x -= 2
        }
    }

    get x() {
        return floor(this.posX) - camera.x
    }

    get y() {
        return this.posY
    }

    get width() {
        return this.offsetWidth
    }

    get height() {
        return this.offsetHeight
    }

    render() {
        this.animation.render(this.x - this.offsetX, this.y - this.offsetY, this.isLeft)
        if (game.debug) {
            // new Rectangle().draw(this.x, this.y, this.width, this.height, new Color(0, 0, 0))
            new Rectangle().draw(
                this.x,
                this.y,
                this.offsetWidth,
                this.offsetHeight,
                new Color(0, 0, 0),
            )
            // rendererEngine.drawPixel(this.x, this.y, new Color(255, 0, 0))
        }
    }
}
