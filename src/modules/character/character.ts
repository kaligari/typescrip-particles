import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import TileSet from '../tileSet'
import TileCollider from '../collider'
import GameObject from '@/libs/gameObject'
import HandleInput from './handleInput'
import StateManager from './stateManager'
import PlayerController from './playerController'

export default class Character extends GameObject {
    constructor(tiles: TileSet) {
        super()
        this.x = 120
        this.y = 20
        this.width = 20
        this.height = 30
        // ------
        this.scripts.push(new HandleInput('handleInput', this))
        this.scripts.push(new StateManager('stateManager', this))
        this.scripts.push(new GameAnimation('gameAnimation', this))
        this.scripts.push(new TileCollider('tileCollider', this, tiles))
        this.scripts.push(new PlayerController('playerController', this))
    }
}
