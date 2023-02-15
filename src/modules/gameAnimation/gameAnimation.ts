import rendererEngine from '@/rendererEngine'
import GameImage from '../../libs/gameImage'
import { floor } from '@/helpers/math'
import userInterface from '@/modules/userInterface/userInterface'
import Color from '../../libs/color'
import { IAnimation, IAnimationFile } from './types'

export default class GameAnimation {
    animationFile: IAnimationFile
    animation: IAnimation | undefined
    sprite: GameImage
    cols: number
    rows: number
    animationName: string
    duration: number
    step: number
    maxSteps: number

    constructor(animationFile: IAnimationFile) {
        this.animationName = ''
        this.animationFile = animationFile
        this.sprite = new GameImage()
        this.sprite.loadImage(animationFile.image)
        this.duration = 0
        this.step = 0
        this.maxSteps = 0
        this.rows = floor(animationFile.imageheight / animationFile.tileheight)
        this.cols = floor(animationFile.imagewidth / animationFile.tilewidth)
        this.changeAnimation('idle')
    }

    render(x: number, y: number, mirrorVertical: boolean) {
        if (!this.animation) return

        if (this.step >= this.maxSteps) {
            this.step = 0
            this.duration = 0
        }

        const frame = floor(this.step)
        const tileId = this.animation.animation[frame].tileid

        const row = tileId % this.cols
        const col = floor(tileId / this.cols)

        this.sprite.renderSelection(
            {
                x: row * this.animationFile.tilewidth,
                y: col * this.animationFile.tileheight,
                width: this.animationFile.tilewidth,
                height: this.animationFile.tileheight,
            },
            x,
            y,
            mirrorVertical,
        )

        this.duration += rendererEngine.delta
        if (this.duration > this.animation.animation[frame].duration) {
            this.duration = 0
            this.step++
        }
    }

    changeAnimation(animationName: string) {
        if (this.animationName === animationName) return
        this.animation = this.animationFile.tiles.find(
            animation => animation.class === animationName,
        )
        if (typeof this.animation === 'undefined') {
            throw Error(`GameAnimation: Cannnot find animation "${animationName}"`)
        }
        this.step = 0
        this.animationName = animationName
        this.maxSteps = this.animation.animation.length
    }
}
