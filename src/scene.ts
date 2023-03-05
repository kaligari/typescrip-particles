import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from './modules/character/character'
import { ITiledFileMapFile } from './modules/gameAnimation/types'
import TileSet from './modules/tileSet'
import camera from './libs/camera'
import ParticlesBubbles from './modules/particles/models/bubbles'

export default class Scene {
    player: Character
    tiles: TileSet
    bubbles: ParticlesBubbles

    constructor() {
        this.player = new Character()
        this.tiles = new TileSet()
        this.bubbles = new ParticlesBubbles(this.player)
    }

    async init() {
        const levelFile = await fetch('./assets/level.json')
            .then(response => response.json())
            .catch(error => console.log(error))
        const characterFile = await fetch('./assets/adventurer.json')
            .then(response => response.json())
            .catch(error => console.log(error))

        await this.tiles.load(levelFile as ITiledFileMapFile)
        await this.player.load(characterFile)
        this.player.addCollisionsTiles(this.tiles)
    }

    // TODO Create water layer
    handleParticles() {
        const tileId = this.player.collider?.mainId
        if (!tileId) return
        if (this.tiles.backgroundTiles[tileId] === 472) {
            this.bubbles.active = true
            return
        }
        this.bubbles.active = false
    }

    render() {
        camera.update()
        this.handleParticles()
        this.bubbles.update()
        this.player.handleInput()
        this.drawBackground()
        this.player.updateState()
        this.player.updateCamera()
        this.tiles.renderBackground()
        this.bubbles.draw()
        this.player.render()
        this.tiles.renderForeground()
    }

    drawBackground() {
        const color = new Color(96, 121, 188)
        for (let y = 0; y < rendererEngine.height; y++) {
            for (let x = 0; x < rendererEngine.width; x++) {
                rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}
