import rendererEngine from '@/rendererEngine'
import GameImage from '@/libs/gameImage'
import levelFile from './level.json'
import userInterface from '../userInterface/userInterface'
import Color from '@/libs/color'
export default class Tiles {
    tileWidth: number
    sizeX: number
    sizeY: number
    startX: number
    destX: number
    tiles: GameImage
    tileSet: number[]
    tileSetWidth: number
    tileId: number

    constructor() {
        this.tileWidth = 16
        this.sizeX = 0
        this.sizeY = 0
        this.startX = 0
        this.destX = 0
        this.tiles = new GameImage()
        this.tiles.loadImage('./img/level.png')
        this.tileSet = []
        this.tileSetWidth = 0
        this.tileId = 0
    }

    init() {
        this.sizeX = 20 // rendererEngine.width / this.tileWidth
        this.sizeY = 13
        this.startX = 0 // (rendererEngine.width - this.sizeX * this.tileWidth) / 2 - this.tileWidth / 2
        this.readLevelFile()
    }

    readLevelFile() {
        this.tileWidth = levelFile.tileheight
        this.tileSet = levelFile.layers[0].data
        this.tileSetWidth = levelFile.layers[0].width
    }

    render(scrollX: number) {
        for (let x = 0; x < this.sizeX * this.sizeY; x++) {
            const destX = (-scrollX % this.tileWidth) + x * this.tileWidth + this.tileWidth / 2
            if (x === 0) {
                this.destX = destX
            }
            // const tileId = Math.floor(scrollX / this.tileWidth)
            // tileId *= 16
            // console.log(tileId)

            // const xPos = 16 * 14
            // const yPos = 16 * 9

            const row = Math.floor(x / this.sizeX)
            const col = x % this.sizeX

            const offset = row * this.tileSetWidth + col + Math.floor(scrollX / this.sizeX)

            this.tileId = this.tileSet[offset] - 1
            if (this.tileId === -1) continue

            this.tiles.renderSelection(
                {
                    x: (this.tileId % 44) * 16,
                    y: Math.floor(this.tileId / 44) * 16,
                    width: 16,
                    height: 16,
                },
                col * 16,
                row * 16,
            )
        }
    }

    renderOld(scrollX: number) {
        // for (let x = 0; x < this.sizeX; x++) {
        //     const destX = (-scrollX % this.tileWidth) + x * this.tileWidth + this.tileWidth / 2
        //     if (x === 0) {
        //         this.destX = destX
        //     }
        //     const xPos = 16 * 14
        //     const yPos = 16 * 9
        //     this.tiles.renderSelection(
        //         { x: xPos, y: yPos, width: 16, height: 16 },
        //         this.startX + destX,
        //         180,
        //     )
        // }
    }
}
