import rendererEngine from '@/rendererEngine'
import GameImage from '../../libs/gameImage'
import { floor } from '@/helpers/math'
import userInterface from '@/modules/userInterface/userInterface'
import Color from '../../libs/color'
import { IAnimationTypes } from './types'

export default class GameAnimation {
    images: GameImage[][]
    name: string
    animation: string
    step: number
    maxSteps: number
    speed: number
    animations: IAnimationTypes[]
    animationNum: number

    constructor(animations: IAnimationTypes[]) {
        this.name = 'adventurer'
        this.animation = ''
        this.animations = animations
        this.animationNum = 0
        this.images = []
        this.step = 0
        this.speed = 8
        this.maxSteps = 0
        for (let j = 0; j < this.animations.length; j++) {
            const images: GameImage[] = []
            for (let i = 0; i < this.animations[j].frames; i++) {
                images.push(new GameImage())
                images[i].loadImage(
                    `./img/${this.name}/${this.name}-${this.animations[j].name}-${i
                        .toString()
                        .padStart(2, '0')}.png`,
                )
            }
            this.images.push(images)
        }

        this.changeAnimation('idle')
    }

    render() {
        this.images[this.animationNum][floor(this.step)].render()
        this.step += rendererEngine.delta * this.speed
        if (this.step > this.maxSteps) this.step = 0
        userInterface.text(floor(this.step).toString(), 20, 50, new Color(255, 0, 0))
    }

    changeAnimation(animationName: string) {
        if (this.animation === animationName) return
        const animationIdx = this.animations.findIndex(item => item.name === animationName)
        if (animationIdx === -1) {
            throw Error('GameAnimation: Cannnot find animation')
        }
        this.step = 0
        this.animation = animationName
        this.maxSteps = this.animations[animationIdx].frames
        this.animationNum = animationIdx
    }
}
