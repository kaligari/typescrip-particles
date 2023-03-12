import rendererEngine from '@/rendererEngine'
import { floor } from '@/helpers/math'
import { ITiledFileTile, ITiledFileTileset } from './types'
import GameTiles from '@/libs/gameTiles'
import GameScript from '@/libs/gameScript'
import camera from '@/libs/camera'
import GameObject from '@/libs/gameObject'

export default class GameAnimation extends GameScript {
    tiles: GameTiles
    animation: ITiledFileTile | undefined
    animationName: string
    duration: number
    step: number
    maxSteps: number
    afterEnd: string
    ignoreInput: boolean
    offsetX: number
    offsetY: number

    constructor(name: string, parent: GameObject) {
        super(name, parent)
        this.animationName = ''
        this.tiles = new GameTiles()

        this.duration = 0
        this.step = 0
        this.maxSteps = 0
        this.afterEnd = ''
        this.ignoreInput = false
        this.changeAnimation('idle')
        this.offsetX = 0
        this.offsetY = 0
    }

    async load(animationFile: ITiledFileTileset) {
        await this.tiles.load(animationFile)
        this.offsetX = animationFile.tileoffset.x
        this.offsetY = animationFile.tileoffset.y
    }

    update() {
        if (!this.animation) return

        const XOnScreen = this.parent.x - camera.x
        const YOnScreen = this.parent.y - camera.y

        if (this.step >= this.maxSteps) {
            this.step = 0
            this.duration = 0
        }

        const frame = floor(this.step)
        const tileId = this.animation.animation[frame].tileid

        this.tiles.render(
            tileId,
            XOnScreen - this.offsetX,
            YOnScreen - this.offsetY,
            this.parent.flipY,
        )

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
