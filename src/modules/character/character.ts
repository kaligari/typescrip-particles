import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { floor, round } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'
import TileSet from '../tileSet'
import TileCollider from '../collider'
import camera from '@/libs/camera'
import GameObject from '@/libs/gameObject'
import HandleInput from './handleInput'
import StateManager from './stateManager'

export default class Character extends GameObject {
    inputXPressure: number
    inputYPressure: number
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

    constructor(tiles: TileSet) {
        super()
        this.inputXPressure = 0
        this.inputYPressure = 0
        this.jumpBlocked = false
        // this.tiles = tiles
        this.offsetX = 0
        this.offsetY = 0
        this.boundBottom = null
        this.accX = 0
        this.accY = 0
        this.x = 120
        this.y = 20
        this.width = 20
        this.height = 30
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
        // ------
        this.scripts.push(new HandleInput('handleInput', this))
        this.scripts.push(new StateManager('stateManager', this))
        this.scripts.push(new GameAnimation('gameAnimation', this))
        this.scripts.push(new TileCollider('tileCollider', this, tiles))
    }

    async init() {
        super.init()
        const gameAnimation = this.getScript('gameAnimation') as GameAnimation
        const characterFile = await fetch('./assets/adventurer.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        this.offsetX = characterFile.tileoffset.x
        this.offsetY = characterFile.tileoffset.y
        await gameAnimation.load(characterFile)
    }

    calcColision(x: number, y: number) {
        const tileCollider = this.getScript('tileCollider') as TileCollider

        const col = floor(x / tileCollider.tiles.tileWidth)
        const row = floor(y / tileCollider.tiles.tileWidth)
        const tileId = row * tileCollider.tiles.tileSetWidth + col

        if (tileCollider.tiles.tiles[tileId] !== 0) {
            return row * tileCollider.tiles.tileHeight
        }
        return null
    }

    updateState() {
        super.update()
        const tileCollider = this.getScript('tileCollider') as TileCollider

        if (this.accX > 0) {
            // end of the level
            if (
                this.x >=
                tileCollider.tiles.tileSetWidth * tileCollider.tiles.tileWidth - this.width
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
            if (this.x <= 0) {
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

        const x = floor(this.x) + desiredX
        const y = floor(this.y) + desiredY

        const bottomX = x + floor(this.width / 2)
        const bottomY = y + this.height

        const collisionBottom = this.calcColision(bottomX, bottomY)
        if (collisionBottom !== null && this.boundBottom === null) {
            this.boundBottom = collisionBottom - this.height
            // this.changeState(this.stateIdle)
            const stateManager = this.getScript('stateManager') as StateManager
            if (!stateManager) return
            stateManager.changeState(stateManager.stateIdle)
        } else if (collisionBottom === null) {
            this.boundBottom = null
        }

        const topX = x + floor(this.width / 2)
        const topY = y
        const collisionTop = this.calcColision(topX, topY)
        if (collisionTop !== null) {
            this.accY = 0
        }
        this.x += round(this.accX)
        this.y += round(this.accY)
    }

    updateCamera() {
        const tileCollider = this.getScript('tileCollider') as TileCollider
        const playerOffsetX = this.width / 2
        const playerOffsetY = this.height / 2
        const offsetX = rendererEngine.width * 0.5 - playerOffsetX
        const offsetY = rendererEngine.height * 0.5 - playerOffsetY

        if (
            this.x - offsetX > 0 &&
            this.x + offsetX + this.width <
                tileCollider.tiles.tileSetWidth * tileCollider.tiles.tileWidth
        ) {
            camera.x = this.x - offsetX
        }

        if (
            this.y - offsetY > 0 &&
            this.y + offsetY + this.height <
                tileCollider.tiles.tileSetHeight * tileCollider.tiles.tileHeight
        ) {
            camera.y = this.y - offsetY
        }
    }

    update() {
        this.updateState()
        this.updateCamera()
    }
}
