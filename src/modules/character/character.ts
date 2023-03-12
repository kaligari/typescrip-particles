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
    // call StateManager: state.onAction1(), state.onDown(), state.onRight(), state.onLeft(), state.onNoInput()
    new PlayerController('playerController', character),
    // TileCollider: tiles, topRightTileId, bottomRightTileId, topLeftTileId, bottomLeftTileId
    new StateManager('stateManager', character),
    // PlayerController: boundBottom, accX, accY, jumpBlocked,
    // Y_GRAVITY, X_CROUCH, X_SOMERSALT, X_DECELERATION,
    // X_DESIRED_DECELERATION, X_JUMP, X_DECELERATION
    // X_OPPOSITE_DECELERATION, X_JUMP_FROM_RUN
    new GameAnimation('gameAnimation', character),
    // OK
    new TileCollider('tileCollider', character),
    // OK
]

export default character
