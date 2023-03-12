import { floor, round } from '@/helpers/math'
import GameScript from '@/libs/gameScript'
import TileCollider from '../collider'
import Character from './character'
import rendererEngine from '@/rendererEngine'
import camera from '@/libs/camera'
import StateManager from './stateManager'

export default class PlayerController extends GameScript {
    parent: Character
    jumpBlocked: boolean
    offsetX: number
    offsetY: number
    accX: number
    accY: number
    boundBottom: number | null
    X_ACCELERATION: number
    X_DESIRED_ACCELERATION: number
    X_DECELERATION: number
    X_DESIRED_DECELERATION: number
    X_OPPOSITE_DECELERATION: number
    X_JUMP: number
    X_JUMP_FROM_RUN: number
    X_SOMERSAULT: number
    X_CROUCH: number
    Y_GRAVITY: number

    constructor(name: string, parent: Character) {
        super(name)
        this.parent = parent
        this.jumpBlocked = false
        this.offsetX = 20
        this.offsetY = 0
        this.boundBottom = null
        this.accX = 0
        this.accY = 0
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
        this.Y_GRAVITY = 0.15
    }

    calcColision(x: number, y: number) {
        const tileCollider = this.parent.getScript('tileCollider') as TileCollider

        const col = floor(x / tileCollider.tiles.tileWidth)
        const row = floor(y / tileCollider.tiles.tileWidth)
        const tileId = row * tileCollider.tiles.tileSetWidth + col

        if (tileCollider.tiles.tiles[tileId] !== 0) {
            return row * tileCollider.tiles.tileHeight
        }
        return null
    }

    interpolateForceX(factor: number, target = 1) {
        if (this.accX - factor > target) {
            this.accX -= factor
            return
        }
        if (this.accX + factor < target) {
            this.accX += factor
            return
        }
        this.accX = target
    }

    updateState() {
        const tileCollider = this.parent.getScript('tileCollider') as TileCollider

        if (this.accX > 0) {
            // end of the level
            if (
                this.parent.x >=
                tileCollider.tiles.tileSetWidth * tileCollider.tiles.tileWidth - this.parent.width
            ) {
                this.accX = 0
            }
            for (
                let tileId = tileCollider.topRightTileId;
                tileId < tileCollider.bottomRightTileId;
                tileId += tileCollider.tiles.tileSetWidth
            ) {
                const tile = tileCollider.tiles.tiles[tileId]
                if (tile !== 0) {
                    this.accX = 0
                    continue
                }
            }
        }

        if (this.accX < 0) {
            // begin of the level
            if (this.parent.x <= 0) {
                this.accX = 0
            }

            for (
                let tileId = tileCollider.topLeftTileId;
                tileId < tileCollider.bottomLeftTileId;
                tileId += tileCollider.tiles.tileSetWidth
            ) {
                const tile = tileCollider.tiles.tiles[tileId]
                if (tile !== 0) {
                    this.accX = 0
                    continue
                }
            }
        }

        const desiredX = this.accX
        const desiredY = round(this.accY)

        const x = floor(this.parent.x) + desiredX
        const y = floor(this.parent.y) + desiredY

        const bottomX = x + floor(this.parent.width / 2)
        const bottomY = y + this.parent.height

        const collisionBottom = this.calcColision(bottomX, bottomY)
        if (collisionBottom !== null && this.boundBottom === null) {
            this.boundBottom = collisionBottom - this.parent.height
            // this.changeState(this.stateIdle)
            const stateManager = this.parent.getScript('stateManager') as StateManager
            if (!stateManager) return
            stateManager.changeState(stateManager.stateIdle)
        } else if (collisionBottom === null) {
            this.boundBottom = null
        }

        const topX = x + floor(this.parent.width / 2)
        const topY = y
        const collisionTop = this.calcColision(topX, topY)
        if (collisionTop !== null) {
            this.accY = 0
        }
        this.parent.x += round(this.accX)
        this.parent.y += round(this.accY)
    }

    updateCamera() {
        const tileCollider = this.parent.getScript('tileCollider') as TileCollider
        const playerOffsetX = this.parent.width / 2
        const playerOffsetY = this.parent.height / 2
        const offsetX = rendererEngine.width * 0.5 - playerOffsetX
        const offsetY = rendererEngine.height * 0.5 - playerOffsetY

        if (
            this.parent.x - offsetX > 0 &&
            this.parent.x + offsetX + this.parent.width <
                tileCollider.tiles.tileSetWidth * tileCollider.tiles.tileWidth
        ) {
            camera.x = this.parent.x - offsetX
        }

        if (
            this.parent.y - offsetY > 0 &&
            this.parent.y + offsetY + this.parent.height <
                tileCollider.tiles.tileSetHeight * tileCollider.tiles.tileHeight
        ) {
            camera.y = this.parent.y - offsetY
        }
    }

    override update() {
        this.updateState()
        this.updateCamera()
    }
}
