import GameTiles from '@/libs/gameTiles'
import { ITiledFileMapFile } from '@/modules/gameAnimation/types'
import rendererEngine from '@/rendererEngine'
import camera from '@/libs/camera'
import { ceil, floor } from '@/helpers/math'
export default class TileSet {
    tilesFile: GameTiles
    /** Width of one tile (in px) */
    tileWidth = 0
    /** Height of one tile (in px) */
    tileHeight = 1
    /** Width of tile set */
    tileSetWidth = 1
    /** Height of tile set */
    tileSetHeight = 1
    /** List of main tiles */
    tiles: number[] = []
    /** List of background tiles */
    backgroundTiles: number[] = []
    /** List of foreground tiles */
    foregroundTiles: number[] = []
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
        this.tileSetWidth = mapFile.layers[0].width
        this.tileSetHeight = mapFile.layers[0].height
        this.renderedSizeWidth = ceil(rendererEngine.width / this.tileWidth) + 1
        this.renderedSizeHeigh = ceil(rendererEngine.height / this.tileHeight) + 1
        this.startXOffset = (rendererEngine.width - this.renderedSizeWidth * this.tileWidth) / 2

        const mainMap = mapFile.layers.find(map => map.name === 'main')
        if (typeof mainMap === 'undefined') return
        this.tiles = mainMap.data

        const backgroundMap = mapFile.layers.find(map => map.name === 'background')
        if (typeof backgroundMap !== 'undefined') {
            this.backgroundTiles = backgroundMap.data
        }

        const foregroundMap = mapFile.layers.find(map => map.name === 'foreground')
        if (typeof foregroundMap !== 'undefined') {
            this.foregroundTiles = foregroundMap.data
        }
    }

    // TODO Change camera.x to Camera class
    renderBackground() {
        const destX = camera.x % this.tileWidth
        const destY = camera.y % this.tileHeight

        for (let x = 0; x < this.renderedSizeWidth * this.renderedSizeHeigh; x++) {
            const row = floor(x / this.renderedSizeWidth)
            const col = x % this.renderedSizeWidth

            const offset =
                floor(x / this.renderedSizeWidth) * this.tileSetWidth +
                col +
                floor(camera.x / this.tileWidth) +
                this.tileSetWidth * floor(camera.y / this.tileHeight)

            // background tiles
            const backgroundTileId = this.backgroundTiles[offset] - 1
            if (backgroundTileId !== -1) {
                this.tilesFile.render(
                    backgroundTileId,
                    col * this.tileWidth - destX,
                    row * this.tileHeight - destY,
                )
            }

            // main tiles
            const mainTileId = this.tiles[offset] - 1
            if (mainTileId !== -1) {
                this.tilesFile.render(
                    mainTileId,
                    col * this.tileWidth - destX,
                    row * this.tileHeight - destY,
                )
            }
        }
    }

    renderForeground() {
        const destX = camera.x % this.tileWidth
        const destY = camera.y % this.tileHeight

        for (let x = 0; x < this.renderedSizeWidth * this.renderedSizeHeigh; x++) {
            const row = floor(x / this.renderedSizeWidth)
            const col = x % this.renderedSizeWidth

            const offset =
                floor(x / this.renderedSizeWidth) * this.tileSetWidth +
                col +
                floor(camera.x / this.tileWidth) +
                this.tileSetWidth * floor(camera.y / this.tileHeight)

            // foreground tiles
            const foregroundTileId = this.foregroundTiles[offset] - 1

            if (foregroundTileId !== -1) {
                this.tilesFile.render(
                    foregroundTileId,
                    col * this.tileWidth - destX,
                    row * this.tileHeight - destY,
                )
            }
        }
    }
}
