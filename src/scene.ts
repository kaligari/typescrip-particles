import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import { ITiledFileMapFile } from './modules/gameAnimation/types'
import TileSet from './modules/tileSet'
import Camera from './libs/camera'

export default class Scene {
    player: Character
    tiles: TileSet
    camera = new Camera()

    constructor() {
        this.player = new Character(this.camera)
        this.camera.x = 0
        this.camera.y = 0
        this.tiles = new TileSet()
    }

    async init() {
        const levelFile = await fetch('./assets/level.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        const characterFile = await fetch('./assets/adventurer.json')
            .then(response => response.json())
            .catch(error => console.log(error))

        await this.tiles.load(levelFile as ITiledFileMapFile)
        await this.player.load(characterFile)
        this.player.addCollisionsTiles(this.tiles)
    }

    updateCamera() {
        const marginRight = rendererEngine.width * 0.6
        const marginLeft = rendererEngine.width * 0.4

        if (this.camera.x < this.player.posX - marginRight) {
            this.camera.x += 2
        }
        if (this.camera.x > this.player.posX - marginLeft) {
            this.camera.x -= 2
        }
        if (this.camera.x < 0) {
            this.camera.x = 0
        }
        if (this.camera.x > 20 * 16) {
            this.camera.x = 20 * 16
        }
    }

    render() {
        this.player.handleInput()
        // this.player.calcState()
        // this.player.calcColisions()
        this.updateCamera()
        this.drawBackground()
        this.tiles.renderBackground(this.camera.x)
        this.player.calcState(this.camera.x)
        this.player.updateState()
        this.player.render()
        // this.tiles.renderForeground(this.camera.x)
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
