import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import { ITiledFileMapFile } from './modules/gameAnimation/types'
import TileSet from './modules/tileSet'
import camera from './libs/camera'
import GameAnimation from './modules/gameAnimation/gameAnimation'

export default class Scene {
    player: Character
    tiles: TileSet

    constructor() {
        this.tiles = new TileSet()
        this.player = new Character(this.tiles)
    }

    async init() {
        await this.player.init()
        await this.loadFiles()
    }

    async loadFiles() {
        const levelFile = await fetch('./assets/level.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        await this.tiles.load(levelFile as ITiledFileMapFile)
        const characterFile = await fetch('./assets/adventurer.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        const gameAnimation = this.player.getScript('gameAnimation') as GameAnimation
        await gameAnimation.load(characterFile)
    }

    update() {
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
