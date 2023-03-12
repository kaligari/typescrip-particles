import State from './state'
import StateIdle from './states/idle'
import StateRun from './states/run'
import StateJump from './states/jump'
import StateSomersault from './states/somersault'
import StateFall from './states/fall'
import StateCrouch from './states/crouch'
import Character from './character'
import GameScript from '@/libs/gameScript'

export type TStateTypes = StateRun | StateJump

export default class StateManager extends GameScript {
    parent: Character
    state: TStateTypes
    states: TStateTypes[]
    stateIdle: State
    stateRun: State
    stateJump: State
    stateSomersault: State
    stateFall: State
    stateCrouch: State

    constructor(name: string, parent: Character) {
        super(name)
        this.parent = parent
        this.states = []
        this.stateRun = new StateRun(this)
        this.stateIdle = new StateIdle(this)
        this.stateJump = new StateJump(this)
        this.stateSomersault = new StateSomersault(this)
        this.stateFall = new StateFall(this)
        this.stateCrouch = new StateCrouch(this)
        this.state = this.stateIdle
    }

    changeState(state: TStateTypes) {
        if (this.state === state) return
        if (state.canChangeState()) {
            this.state = state
            state.changeAnimation()
            state.onChangeState()
            return true
        }
        return false
    }

    update() {
        this.state.updateAlways()
        this.state.update()
    }
}
