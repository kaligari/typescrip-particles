import GameAnimation from '@/modules/gameAnimation/gameAnimation'
import TileCollider from '../collider'
import GameObject from '@/libs/gameObject'
import HandleInput from './handleInput'
import StateManager from './stateManager'
import PlayerController from './playerController'

const character = new GameObject()
character.x = 120
character.y = 20
character.width = 20
character.height = 30
character.scripts = [
    new HandleInput('handleInput', character),
    new PlayerController('playerController', character),
    new StateManager('stateManager', character),
    new GameAnimation('gameAnimation', character),
    new TileCollider('tileCollider', character),
]

export default character
