import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import { IAnimationFile } from '@/modules/gameAnimation/types'
import animation from '@/modules/gameAnimation/adventurer.json'
import { floor } from '@/helpers/math'
import userInput from './userInput'

export default class Character {
    animation: GameAnimation
    posX: number
    posY: number
    isLeft: boolean
    isJumping: boolean

    constructor() {
        this.animation = new GameAnimation(animation as IAnimationFile)
        this.posX = 0
        this.posY = 200 - 37
        this.isLeft = false
        this.isJumping = false
    }

    render() {
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

        this.animation.render(floor(this.posX), this.posY, this.isLeft)
    }
}
