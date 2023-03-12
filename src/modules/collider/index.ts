import TileSet from '@/modules/tileSet'
import Character from '../character/character'
import { floor, round } from '@/helpers/math'
import GameScript from '@/libs/gameScript'

export default class TileCollider extends GameScript {
    parent: Character
    tiles: TileSet | null
    mainId: number

    constructor(name: string, parent: Character) {
        super(name)
        this.parent = parent
        this.tiles = null
        this.mainId = 0
    }

    loadTileSet(tileset: TileSet) {
        this.tiles = tileset
    }

    update() {
        if (!this.tiles) return
        const col = floor(this.parent.x / this.tiles.tileWidth)
        const row = floor(this.parent.y / this.tiles.tileWidth)
        this.mainId = row * this.tiles.tileSetWidth + col
    }

    get width() {
        if (!this.tiles) return
        return round(this.parent.width / this.tiles.tileWidth)
    }

    get height() {
        if (!this.tiles) return
        return round(this.parent.height / this.tiles.tileHeight)
    }

    get topLeftTileId() {
        return this.mainId
    }

    get topRightTileId() {
        if (!this.tiles) return
        const col = floor((this.parent.x + this.parent.width) / this.tiles.tileWidth)
        const row = floor(this.parent.y / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
    }

    get bottomLeftTileId() {
        if (!this.tiles) return
        const col = floor(this.parent.x / this.tiles.tileWidth)
        const row = floor((this.parent.y + this.parent.height) / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
        // return this.mainId + this.height * this.tiles.tileSetWidth
    }

    get bottomRightTileId() {
        if (!this.tiles) return
        const col = floor((this.parent.x + this.parent.width) / this.tiles.tileWidth)
        const row = floor((this.parent.y + this.parent.height) / this.tiles.tileWidth)
        return row * this.tiles.tileSetWidth + col
    }
}
