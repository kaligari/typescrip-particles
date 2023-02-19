import { ITiledFileTile, ITiledFileTileset } from '@/modules/gameAnimation/types'
import GameImage from './gameImage'
import { floor } from '@/helpers/math'

export default class GameTiles {
    image: GameImage
    data: ITiledFileTileset
    cols: number
    rows: number
    tileWidth: number
    tileHeight: number
    tiles: ITiledFileTile[]

    constructor(file: ITiledFileTileset) {
        this.data = file
        this.image = new GameImage()
        this.rows = floor(file.imageheight / file.tileheight)
        this.cols = floor(file.imagewidth / file.tilewidth)
        this.tileWidth = file.tilewidth
        this.tileHeight = file.tileheight
        this.tiles = file.tiles
    }

    load(fileName: string) {
        this.image.loadImage(fileName)
    }

    render(tileId: number, x: number, y: number, mirrorVertical = false) {
        this.image.renderSelection(
            {
                x: (tileId % this.cols) * this.tileWidth,
                y: Math.floor(tileId / this.cols) * this.tileHeight,
                width: this.tileWidth,
                height: this.tileHeight,
            },
            x,
            y,
            mirrorVertical,
        )
    }
}
