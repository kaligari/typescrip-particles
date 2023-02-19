import rendererEngine from '@/rendererEngine'
import GameImage from '@/libs/gameImage'
import levelFile from './level.json'
import userInterface from '../userInterface/userInterface'
import Color from '@/libs/color'
import Rectangle from '../primitives/rectangle'
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
    offset: number

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
        this.offset = 0
    }

    init() {
        this.sizeX = 21 // rendererEngine.width / this.tileWidth
        this.sizeY = 13
        // this.startX = (rendererEngine.width - this.sizeX * this.tileWidth) / 2 - this.tileWidth / 2
        this.startX = (rendererEngine.width - this.sizeX * this.tileWidth) / 2
        console.log(this.startX)

        this.readLevelFile()
    }

    readLevelFile() {
        this.tileWidth = levelFile.tileheight
        this.tileSet = levelFile.layers[0].data
        this.tileSetWidth = levelFile.layers[0].width
    }

    render(scrollX: number) {
        // const destX = (-scrollX % this.tileWidth) * this.tileWidth + this.tileWidth / 2
        const destX = scrollX % this.tileWidth // + this.tileWidth + this.tileWidth / 2
        this.destX = destX
        // const destX = scrollX % this.tileWidth

        for (let x = 0; x < this.sizeX * this.sizeY; x++) {
            // const tileId = Math.floor(scrollX / this.tileWidth)
            // tileId *= 16
            // console.log(tileId)

            // const xPos = 16 * 14
            // const yPos = 16 * 9

            const row = Math.floor(x / this.sizeX)
            const col = x % this.sizeX

            const offset =
                Math.floor(x / this.sizeX) * this.tileSetWidth + col + Math.floor(scrollX / 16)
            // +
            //th.floor(scrollX / this.sizeX)

            // const offset = destX

            this.tileId = this.tileSet[offset] - 1
            const j = 0
            if (x === 0) {
                this.offset = offset
            }
            if (this.tileId === -1) continue
            // new Rectangle().draw(col * 16 - destX, row * 16, 16, 16, new Color(255, 255, 255))

            // continue

            this.tiles.renderSelection(
                {
                    x: (this.tileId % 44) * 16,
                    y: Math.floor(this.tileId / 44) * 16,
                    width: 16,
                    height: 16,
                },
                col * 16 - destX, //this.startX + col * 16 + destX, //// col * 16 + 8,
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
