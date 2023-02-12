import Color from '@/libs/color'
// import pathfinder from '@/modules/pathfinder/pathfinder'
import rendererEngine from '@/rendererEngine'
import GameImage from './libs/gameImage'
import GameAnimation from './modules/gameAnimation/gameAnimation'
import animation from './modules/gameAnimation/adventurer.json'
import { IAnimationTypes } from './modules/gameAnimation/types'
import userInput from './modules/userInput'
class Scene {
    image: GameImage
    animation: GameAnimation

    constructor() {
        this.image = new GameImage()
        this.image.loadImage('./img/player.png')
        this.animation = new GameAnimation(animation.animations as IAnimationTypes[])
    }

    render() {
        this.drawBackground()
        if (userInput.isKeyPressed('ArrowRight')) {
            this.animation.changeAnimation('run')
        } else if (userInput.isKeyPressed('Space')) {
            this.animation.changeAnimation('jump')
        } else {
            this.animation.changeAnimation('idle')
        }
        // rendererEngine.ctx.drawImage(this.img, 100, 100)
        // pathfinder.drawChecker()
        // this.image.render()
        this.animation.render()
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
