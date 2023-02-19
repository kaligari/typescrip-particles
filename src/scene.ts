import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import Tiles from './modules/tiles/tiles'
import levelFile from './modules/tiles/level.json'
import levelTilesFile from './modules/tiles/tiles.json'
import { ITiledFileMapFile, ITiledFileTileset } from './modules/gameAnimation/types'

class Scene {
    player: Character
    tiles: Tiles
    cameraX: number
    cameraY: number

    constructor() {
        this.player = new Character()
        this.tiles = new Tiles(levelFile as ITiledFileMapFile, levelTilesFile as ITiledFileTileset)
        this.cameraX = 0
        this.cameraY = 0
    }

    init() {
        this.tiles.init()
        this.player.init()
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
        this.player.handleInput()
        this.player.calcState()
        this.player.calcColisions()
        this.updateCamera()
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

const scene = new Scene()
export default scene
