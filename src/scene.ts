import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import GameImage from './libs/gameImage'
import Tiles from './modules/tiles/tiles'

class Scene {
    level: GameImage
    player: Character
    tiles: Tiles

    constructor() {
        this.player = new Character()
        this.level = new GameImage()
        this.level.loadImage('./img/level.png')
        this.tiles = new Tiles()
    }

    init() {
        this.tiles.init()
        this.player.init()
    }

    render() {
        this.player.handleInput()
        this.player.calcState()
        this.drawBackground()
        this.tiles.render(Math.round(this.player.posX))
        this.player.render()
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
