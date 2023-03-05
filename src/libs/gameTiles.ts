import { ITiledFileTile, ITiledFileTileset } from '@/modules/gameAnimation/types'
import GameImage from './gameImage'
import { floor } from '@/helpers/math'

export default class GameTiles {
    image: GameImage
    data: ITiledFileTileset | null
    cols: number
    rows: number
    tileWidth: number
    tileHeight: number
    tiles: ITiledFileTile[] | null

    constructor() {
        this.data = null
        this.rows = 0
        this.cols = 0
        this.tileWidth = 0
        this.tileHeight = 0
        this.tiles = null
        this.image = new GameImage()
    }

    async load(file: ITiledFileTileset) {
        await this.image.loadImage(`./assets/${file.image}`)
        this.data = file
        this.rows = floor(file.imageheight / file.tileheight)
        this.cols = floor(file.imagewidth / file.tilewidth)
        this.tileWidth = file.tilewidth
        this.tileHeight = file.tileheight
        this.tiles = file.tiles
    }

    render(tileId: number, x: number, y: number, mirrorVertical = false) {
        this.image.renderSelection(
            {
                x: (tileId % this.cols) * this.tileWidth,
                y: floor(tileId / this.cols) * this.tileHeight,
                width: this.tileWidth,
                height: this.tileHeight,
            },
            x,
            y,
            mirrorVertical,
        )
    }
}
