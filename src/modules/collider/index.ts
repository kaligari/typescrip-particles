import Rectangle from '@/libs/rectangle'
import TileSet from '@/modules/tileSet'

export default class TileCollider {
    parent: Rectangle
    tiles: TileSet
    mainId: number

    constructor(parent: Rectangle, tileset: TileSet) {
        this.parent = parent
        this.tiles = tileset
        this.mainId = 0
    }

    update() {
        const col = Math.round(this.parent.x / this.tiles.tileWidth)
        const row = Math.round(this.parent.y / this.tiles.tileHeight) * this.tiles.tileSetWidth
        this.mainId = row + col
    }

    get width() {
        return Math.round(this.parent.width / this.tiles.tileWidth) + 1
    }

    get height() {
        return Math.round(this.parent.height / this.tiles.tileHeight) + 1
    }

    get topLeftTileId() {
        return this.mainId
    }

    get topRightTileId() {
        return this.mainId + this.width
    }

    get bottomLeftTileId() {
        return this.mainId + this.height * this.tiles.tileSetWidth
    }

    get bottomRightTileId() {
        return this.mainId + this.width + this.height * this.tiles.tileSetWidth
    }
}
