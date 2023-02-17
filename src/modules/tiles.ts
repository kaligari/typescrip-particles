import rendererEngine from '@/rendererEngine'
import Rectangle from './primitives/rectangle'
import Color from '@/libs/color'
import GameImage from '@/libs/gameImage'

export default class Tiles {
    tileWidth: number
    sizeX: number
    startX: number
    destX: number
    tile: GameImage

    constructor() {
        this.tileWidth = 16
        this.sizeX = 0
        this.startX = 0
        this.destX = 0
        this.tile = new GameImage()
        this.tile.loadImage('./img/level.png')
    }

    init() {
        this.sizeX = rendererEngine.width / this.tileWidth + 1
        this.startX = (rendererEngine.width - this.sizeX * this.tileWidth) / 2
        console.log(this.startX)
    }

    render(scrollX: number) {
        for (let x = 0; x < this.sizeX; x++) {
            const destX = (-scrollX % this.tileWidth) + x * this.tileWidth + this.tileWidth / 2
            if (x === 0) {
                this.destX = destX
            }

            const xPos = 16 * 14
            const yPos = 16 * 9
            this.tile.renderSelection(
                { x: xPos, y: yPos, width: 16, height: 16 },
                this.startX + destX,
                180,
            )

            // new Rectangle().draw(this.startX + destX, 100, 16, 16, new Color(255, 255, 255))
        }
    }
}
