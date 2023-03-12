import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import { ITiledFileMapFile } from './modules/gameAnimation/types'
import TileSet from './modules/tileSet'
import camera from './libs/camera'

export default class Scene {
    player: Character
    tiles: TileSet

    constructor() {
        this.tiles = new TileSet()
        this.player = new Character()
    }

    async init() {
        const levelFile = await fetch('./assets/level.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        await this.tiles.load(levelFile as ITiledFileMapFile)
        await this.player.init()
        this.player.addTiles(this.tiles)
    }

    render() {
        camera.update()
        this.drawBackground()
        this.tiles.renderBackground()
        this.player.update()
        this.tiles.renderForeground()
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
