import rendererEngine from '@/rendererEngine'
import { floor } from '@/helpers/math'
import GameTiles from '@/libs/gameTiles'
import { ITiledFileMapFile, ITiledFileTileset } from '../gameAnimation/types'

export default class Tiles {
    tileWidth: number
    tileHeight: number
    sizeX: number
    sizeY: number
    startX: number
    destX: number
    tiles: GameTiles
    tileSet: number[]
    tileSetWidth: number
    file: ITiledFileMapFile

    constructor(file: ITiledFileMapFile, tiles: ITiledFileTileset) {
        this.file = file
        this.tileWidth = file.tilewidth
        this.tileHeight = file.tileheight
        this.sizeX = 0
        this.sizeY = 0
        this.startX = 0
        this.destX = 0
        this.tiles = new GameTiles(tiles)
        this.tiles.load('./img/level.png')
        this.tileSet = []
        this.tileSetWidth = 0
    }

    init() {
        this.readLevelFile()
        this.sizeX = floor(rendererEngine.width / this.tileWidth) + 1
        this.sizeY = floor(rendererEngine.height / this.tileHeight) + 1

        // start x offset where start to draw pixel, negative to startX
        this.startX = (rendererEngine.width - this.sizeX * this.tileWidth) / 2
    }

    readLevelFile() {
        this.tileWidth = this.file.tileheight
        this.tileHeight = this.file.tileheight
        this.tileSet = this.file.layers[0].data
        this.tileSetWidth = this.file.layers[0].width
    }

    render(scrollX: number) {
        const destX = scrollX % this.tileWidth
        this.destX = destX

        for (let x = 0; x < this.sizeX * this.sizeY; x++) {
            const row = Math.floor(x / this.sizeX)
            const col = x % this.sizeX

            const offset =
                Math.floor(x / this.sizeX) * this.tileSetWidth +
                col +
                Math.floor(scrollX / this.tileWidth)

            const tileId = this.tileSet[offset] - 1

            // skip empty pixels
            if (tileId === -1) continue

            this.tiles.render(tileId, col * this.tileWidth - destX, row * this.tileHeight)
        }
    }
}
