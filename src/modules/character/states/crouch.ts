import StateIdle from './idle'
import StateManager from '../stateManager'

export default class StateCrouch extends StateIdle {
    constructor(stateManager: StateManager) {
        super(stateManager, 'crouch')
    }

    onAction1() {}
}
