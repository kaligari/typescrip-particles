import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import { ITiledFileMapFile, ITiledFileTileset } from './modules/gameAnimation/types'
import TileSet from './modules/tileSet'

export default class Scene {
    player: Character
    tiles: TileSet | null
    cameraX: number
    cameraY: number

    constructor() {
        this.player = new Character()
        this.cameraX = 0
        this.cameraY = 0
        this.tiles = null
    }

    async init() {
        const levelFile = await fetch('./assets/level/level.json').then(response => response.json())
        const levelTilesFile = await fetch('./assets/level/tiles.json').then(response =>
            response.json(),
        )

        this.tiles = new TileSet(
            levelFile as ITiledFileMapFile,
            levelTilesFile as ITiledFileTileset,
        )
        await this.player.init()
        this.tiles.init()
        this.player.addCollisionsTiles(this.tiles)
    }

    updateCamera() {
        const marginRight = rendererEngine.width * 0.6
        const marginLeft = rendererEngine.width * 0.4

        if (this.cameraX < this.player.posX - marginRight) {
            this.cameraX += 2
        }
        if (this.cameraX > this.player.posX - marginLeft) {
            this.cameraX -= 2
        }
        if (this.cameraX < 0) {
            this.cameraX = 0
        }
        if (this.cameraX > 20 * 16) {
            this.cameraX = 20 * 16
        }
    }

    render() {
        if (!this.tiles) return

        this.player.handleInput()
        // this.player.calcState()
        // this.player.calcColisions()
        this.updateCamera()
        this.player.calcState(this.cameraX)
        this.player.updateState()
        this.drawBackground()
        this.tiles.render(this.cameraX)
        this.player.render(this.cameraX)
    }

    drawBackground() {
        const color = new Color(96, 121, 188)
        for (let y = 0; y < rendererEngine.height; y++) {
            for (let x = 0; x < rendererEngine.width; x++) {
                rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}
