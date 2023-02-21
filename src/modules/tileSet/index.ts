import GameTiles from '@/libs/gameTiles'
import { ITiledFileMapFile, ITiledFileTileset } from '@/modules/gameAnimation/types'
import { floor } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'

export default class TileSet {
    tilesFile: GameTiles

    /** Width of one tile (in px) */
    tileWidth = 0
    /** Height of one tile (in px) */
    tileHeight = 1
    /** Width of tile set */
    tileSetWidth = 1
    /** List of tiles */
    tiles: number[] = []
    /** Width of tiles array visible in render area */
    renderedSizeWidth = 0
    /** Height of tiles array visible in render area */
    renderedSizeHeigh = 0
    /** Where start to draw tiles regarding to screen coords */
    startXOffset = 0

    constructor() {
        this.tilesFile = new GameTiles()
    }

    async load(mapFile: ITiledFileMapFile) {
        const tilesFile = await fetch(`./assets/${mapFile.tilesets[0].source}`)
            .then(response => response.json())
            .catch(error => console.log(error))
        await this.tilesFile.load(tilesFile)
        this.tileWidth = mapFile.tileheight
        this.tileHeight = mapFile.tileheight
        this.tiles = mapFile.layers[0].data
        this.tileSetWidth = mapFile.layers[0].width
        this.renderedSizeWidth = floor(rendererEngine.width / this.tileWidth) + 1
        this.renderedSizeHeigh = floor(rendererEngine.height / this.tileHeight) + 1
        this.startXOffset = (rendererEngine.width - this.renderedSizeWidth * this.tileWidth) / 2
    }

    // TODO Change scrollX to Camera class
    render(scrollX: number) {
        const destX = scrollX % this.tileWidth

        for (let x = 0; x < this.renderedSizeWidth * this.renderedSizeHeigh; x++) {
            const row = Math.floor(x / this.renderedSizeWidth)
            const col = x % this.renderedSizeWidth

            const offset =
                Math.floor(x / this.renderedSizeWidth) * this.tileSetWidth +
                col +
                Math.floor(scrollX / this.tileWidth)

            const tileId = this.tiles[offset] - 1

            // skip empty pixels
            if (tileId === -1) continue

            this.tilesFile.render(tileId, col * this.tileWidth - destX, row * this.tileHeight)
        }
    }
}
