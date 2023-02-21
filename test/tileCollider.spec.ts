import { expect, it } from 'vitest'
import Rectangle from '@/libs/rectangle'
import TileSet from '@/modules/tileSet'
import TileCollider from '@/modules/collider'
import { ITiledFileMapFile, ITiledFileTileset } from '@/modules/gameAnimation/types'
import levelFile from './assets/level.json'
import levelTilesFile from './assets/tiles.json'

const parent = new Rectangle(20, 20, 22, 22)
const tileset = new TileSet(levelFile as ITiledFileMapFile, levelTilesFile as ITiledFileTileset)
tileset.tileWidth = 16
tileset.tileHeight = 16
tileset.tileSetWidth = 4
tileset.tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const collider = new TileCollider(parent, tileset)

it('Collider properties', () => {
    collider.update()
    expect(collider.mainId).toBe(5)
    expect(collider.width).toBe(2)
    expect(collider.height).toBe(2)
    expect(collider.topLeftTileId).toBe(5)
    expect(collider.topRightTileId).toBe(7)
    expect(collider.bottomLeftTileId).toBe(13)
    expect(collider.bottomRightTileId).toBe(15)
})
