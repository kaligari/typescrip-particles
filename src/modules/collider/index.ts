import TileSet from '@/modules/tileSet'
import Character from '../character/character'

export default class TileCollider {
    parent: Character
    tiles: TileSet
    mainId: number

    constructor(parent: Character, tileset: TileSet) {
        this.parent = parent
        this.tiles = tileset
        this.mainId = 0
    }

    update() {
        // const col = Math.round(this.parent.posX / this.tiles.tileWidth)
        // const row = Math.round(this.parent.y / this.tiles.tileHeight) * this.tiles.tileSetWidth
        // this.mainId = row + col
        const col = Math.floor((this.parent.x + this.parent.camera.x) / this.tiles.tileWidth)
        const row = Math.floor(this.parent.y / this.tiles.tileWidth)
        this.mainId = row * this.tiles.tileSetWidth + col
    }

    get width() {
        return Math.round(this.parent.width / this.tiles.tileWidth)
    }

    get height() {
        return Math.round(this.parent.height / this.tiles.tileHeight)
    }

    get topLeftTileId() {
        return this.mainId
    }

    get topRightTileId() {
        const col = Math.floor(
            (this.parent.x + this.parent.camera.x + this.parent.width) / this.tiles.tileWidth,
        )
        const row = Math.floor(this.parent.y / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
        // return this.mainId + this.width
    }

    get bottomLeftTileId() {
        return this.mainId + this.height * this.tiles.tileSetWidth
    }

    get bottomRightTileId() {
        const col = Math.floor(
            (this.parent.x + this.parent.camera.x + this.parent.width) / this.tiles.tileWidth,
        )
        const row = Math.floor((this.parent.y + this.parent.height) / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
    }
}
