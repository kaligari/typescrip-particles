import rendererEngine from '@/rendererEngine'
import { floor } from '@/helpers/math'
import { ITiledFileTile, ITiledFileTileset } from './types'
import GameTiles from '@/libs/gameTiles'

export default class GameAnimation {
    tiles: GameTiles
    animation: ITiledFileTile | undefined
    animationName: string
    duration: number
    step: number
    maxSteps: number
    afterEnd: string
    ignoreInput: boolean

    constructor() {
        this.animationName = ''
        this.tiles = new GameTiles()

        this.duration = 0
        this.step = 0
        this.maxSteps = 0
        this.afterEnd = ''
        this.ignoreInput = false
        this.changeAnimation('idle')
    }

    load(animationFile: ITiledFileTileset) {
        this.tiles.load(animationFile)
    }

    render(x: number, y: number, mirrorVertical: boolean) {
        if (!this.animation) return

        if (this.step >= this.maxSteps) {
            this.step = 0
            this.duration = 0
        }

        const frame = floor(this.step)
        const tileId = this.animation.animation[frame].tileid

        this.tiles.render(tileId, x, y, mirrorVertical)

        this.duration += rendererEngine.delta
        if (this.duration > this.animation.animation[frame].duration) {
            this.duration = 0
            this.step++
        }
    }

    changeAnimation(animationName: string) {
        if (this.animationName === animationName || !this.tiles.tiles) return
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
