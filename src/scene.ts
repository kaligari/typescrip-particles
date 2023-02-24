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
        this.tiles = new TileSet(this.camera)
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

    render() {
        this.player.handleInput()
        this.drawBackground()
        this.player.calcState()
        this.tiles.renderBackground(this.camera.x)
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
