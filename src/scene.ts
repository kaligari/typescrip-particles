import Color from '@/libs/color'
// import pathfinder from '@/modules/pathfinder/pathfinder'
// import GameImage from './libs/gameImage'
import rendererEngine from '@/rendererEngine'
import GameAnimation from './modules/gameAnimation/gameAnimation'
import { IAnimationFile } from './modules/gameAnimation/types'
import animation from './modules/gameAnimation/adventurer.json'
import userInput from './modules/userInput'
import { floor } from './helpers/math'

// export type IAnimationFile = typeof animation
class Scene {
    // sky: GameImage
    // clouds: GameImage
    animation: GameAnimation
    posX: number
    posY: number
    isLeft: boolean
    isJumping: boolean

    constructor() {
        // this.sky = new GameImage()
        // this.sky.loadImage('./img/env/sky.png')
        // this.clouds = new GameImage()
        // this.clouds.loadImage('./img/env/far-grounds.png')
        this.animation = new GameAnimation(animation as IAnimationFile)
        this.posX = 0
        this.posY = 200 - 37
        this.isLeft = false
        this.isJumping = false
    }

    render() {
        this.drawBackground()
        if (userInput.isKeyPressed('Space') || this.isJumping) {
            this.animation.changeAnimation('jump')
            if (!this.isJumping) {
                this.isJumping = true
            }
            if (this.animation.step > 1 && this.animation.step < 5) {
                if (this.isLeft) {
                    this.posX -= 1
                } else {
                    this.posX += 1
                }
            }
            if (this.animation.step === this.animation.maxSteps) {
                this.isJumping = false
            }
        } else if (userInput.isKeyPressed('ArrowRight')) {
            this.animation.changeAnimation('run')
            this.isLeft = false
            this.posX += 1
        } else if (userInput.isKeyPressed('ArrowLeft')) {
            this.animation.changeAnimation('run')
            this.isLeft = true
            this.posX -= 1
        } else if (userInput.isKeyPressed('ArrowDown')) {
            this.animation.changeAnimation('crouch')
        } else {
            this.animation.changeAnimation('idle')
        }
        // pathfinder.drawChecker()
        // this.sky.render(0, 0)
        // this.clouds.render(0, 90)
        this.animation.render(floor(this.posX), this.posY, this.isLeft)
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
