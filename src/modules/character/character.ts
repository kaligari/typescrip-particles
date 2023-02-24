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
import Camera from '@/libs/camera'

export type TStateTypes = StateRun | StateJump

export default class Character {
    camera: Camera
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
    accX: number
    accY: number
    currSpeedX: number
    currSpeedY: number
    jumpBlocked: boolean
    offsetX: number
    offsetY: number
    offsetWidth: number
    offsetHeight: number
    boundBottom: number | null
    collider: TileCollider | null

    constructor(camera: Camera) {
        this.camera = camera
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
        this.boundBottom = null
        this.collider = null
    }

    load(animation: ITiledFileTileset) {
        this.animation.load(animation)
        this.posX = 20
        this.posY = 100
        this.offsetX = 13
        this.offsetY = 6
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
            this.accY = 1
            return
        }
        if (userInput.down) {
            this.state.onDown()
            return
        }
        if (userInput.right) {
            this.state.onRight()
            this.accX = 1
            return
        }
        if (userInput.left) {
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

        // const rightTopX = x + this.offsetWidth
        // const rightTopY = y + floor(this.offsetWidth * 0.25)
        // const collisionRightTop = this.calcColision(rightTopX, rightTopY, cameraX)
        // if (collisionRightTop !== null) {
        //     this.currSpeedX = 0
        // }
        // const rightBottomX = x + this.offsetWidth
        // const rightBottomY = y + floor(this.offsetWidth * 0.75)
        // const collisionRightBottom = this.calcColision(rightBottomX, rightBottomY, cameraX)
        // if (collisionRightBottom !== null) {
        //     this.currSpeedX = 0
        // }
        // console.log(this.collider.topRightTileId, this.collider.bottomRightTileId, this.tiles.tileSetWidth)

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
                            tmpX * 16 - this.camera.x,
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
                            tmpX * 16 - this.camera.x,
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
                            tmpX * 16 - this.camera.x,
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
                            tmpX * 16 - this.camera.x,
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
                new Rectangle().draw(
                    tmpX * 16 - this.camera.x,
                    tmpY * 16,
                    16,
                    16,
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
                    tmpX * 16 - this.camera.x,
                    tmpY * 16,
                    16,
                    16,
                    new Color(0, 0, 0),
                )
            }
        }

        // const leftTopX = x
        // const leftTopY = y + floor(this.offsetWidth * 0.25)
        // const collisionLeftTop = this.calcColision(leftTopX, leftTopY, cameraX)
        // if (collisionLeftTop !== null) {
        //     this.currSpeedX = 0
        // }
        // const leftBottomX = x
        // const leftBottomY = y + floor(this.offsetWidth * 0.75)
        // const collisionLeftBottom = this.calcColision(leftBottomX, leftBottomY, cameraX)
        // if (collisionLeftBottom !== null) {
        //     this.currSpeedX = 0
        // }

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
        // this.posY += desiredY

        const x = floor(this.posX) + floor(desiredX)
        const y = floor(this.posY) + floor(desiredY)

        this.posX = x
        this.posY = y

        // update camera
        const marginRight = rendererEngine.width * 0.45
        const marginLeft = rendererEngine.width * 0.55

        if (!this.tiles) return

        if (
            this.camera.x < this.posX - marginRight &&
            this.posX <
                this.tiles?.tileSetWidth * this.tiles?.tileWidth - rendererEngine.width * 0.45
        ) {
            this.camera.x += 2
        }
        if (this.camera.x > this.posX - marginLeft && this.camera.x > 0) {
            this.camera.x -= 2
        }
    }

    get x() {
        return floor(this.posX) - this.camera.x
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
