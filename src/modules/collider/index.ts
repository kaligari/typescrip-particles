import TileSet from '@/modules/tileSet'
import Character from '../character/character'
import { floor, round } from '@/helpers/math'
import GameScript from '@/libs/gameScript'

export default class TileCollider extends GameScript {
    parent: Character
    tiles: TileSet
    mainId: number

    constructor(name: string, parent: Character, tileset: TileSet) {
        super(name)
        this.parent = parent
        this.tiles = tileset
        this.mainId = 0
    }

    update() {
        const col = floor(this.parent.x / this.tiles.tileWidth)
        const row = floor(this.parent.y / this.tiles.tileWidth)
        this.mainId = row * this.tiles.tileSetWidth + col
    }

    get width() {
        return round(this.parent.width / this.tiles.tileWidth)
    }

    get height() {
        return round(this.parent.height / this.tiles.tileHeight)
    }

    get topLeftTileId() {
        return this.mainId
    }

    get topRightTileId() {
        const col = floor((this.parent.x + this.parent.width) / this.tiles.tileWidth)
        const row = floor(this.parent.y / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
    }

    get bottomLeftTileId() {
        const col = floor(this.parent.x / this.tiles.tileWidth)
        const row = floor((this.parent.y + this.parent.height) / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
        // return this.mainId + this.height * this.tiles.tileSetWidth
    }

    get bottomRightTileId() {
        const col = floor((this.parent.x + this.parent.width) / this.tiles.tileWidth)
        const row = floor((this.parent.y + this.parent.height) / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
    }
}
