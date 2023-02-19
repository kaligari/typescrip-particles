import { IAnimation, IAnimationFile } from '@/modules/gameAnimation/types'
import GameImage from './gameImage'
import { floor } from '@/helpers/math'

export default class GameTiles {
    image: GameImage
    data: IAnimationFile
    cols: number
    rows: number
    tileWidth: number
    tileHeight: number
    tiles: IAnimation[]

    constructor(file: IAnimationFile) {
        this.data = file
        this.image = new GameImage()
        this.image.loadImage(file.image)
        this.rows = floor(file.imageheight / file.tileheight)
        this.cols = floor(file.imagewidth / file.tilewidth)
        this.tileWidth = file.tilewidth
        this.tileHeight = file.tileheight
        this.tiles = file.tiles
    }
}
