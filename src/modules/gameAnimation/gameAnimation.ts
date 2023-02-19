import rendererEngine from '@/rendererEngine'
import { floor } from '@/helpers/math'
import { IAnimation, IAnimationFile } from './types'
import GameTiles from '@/libs/gameTiles'

export default class GameAnimation {
    tiles: GameTiles
    animation: IAnimation | undefined
    cols: number
    rows: number
    animationName: string
    duration: number
    step: number
    maxSteps: number
    afterEnd: string
    ignoreInput: boolean

    constructor(animationFile: IAnimationFile) {
        this.animationName = ''
        this.tiles = new GameTiles(animationFile)
        this.duration = 0
        this.step = 0
        this.maxSteps = 0
        this.afterEnd = ''
        this.ignoreInput = false
        this.rows = this.tiles.rows
        this.cols = this.tiles.cols
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

        this.tiles.image.renderSelection(
            {
                x: row * this.tiles.tileWidth,
                y: col * this.tiles.tileHeight,
                width: this.tiles.tileWidth,
                height: this.tiles.tileHeight,
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
        this.animation = this.tiles.tiles.find(animation => animation.class === animationName)
        if (typeof this.animation === 'undefined') {
            throw Error(`GameAnimation: Cannnot find animation "${animationName}"`)
        }
        this.step = 0
        this.animationName = animationName
        this.maxSteps = this.animation.animation.length
    }

    isEnd() {
        return this.step === this.maxSteps
    }
}
