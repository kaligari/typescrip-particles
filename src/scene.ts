import Color from '@/libs/color'
// import pathfinder from '@/modules/pathfinder/pathfinder'
// import GameImage from './libs/gameImage'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character'

// export type IAnimationFile = typeof animation
class Scene {
    // sky: GameImage
    // clouds: GameImage
    player: Character

    constructor() {
        this.player = new Character()
        // this.sky = new GameImage()
        // this.sky.loadImage('./img/env/sky.png')
        // this.clouds = new GameImage()
        // this.clouds.loadImage('./img/env/far-grounds.png')
    }

    render() {
        this.drawBackground()
        this.player.render()
        // pathfinder.drawChecker()
        // this.sky.render(0, 0)
        // this.clouds.render(0, 90)
    }

    drawBackground() {
        const color = new Color(50, 50, 50)
        for (let y = 0; y < rendererEngine.height; y++) {
            for (let x = 0; x < rendererEngine.width; x++) {
                rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}

const scene = new Scene()
export default scene
