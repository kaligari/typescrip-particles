import Character from '@/modules/character'
import State from '@/modules/character/state'

export default class StateJump extends State {
    constructor(character: Character) {
        super(character, 'jumpEnd')
    }

    calc() {
        // if (
        //     this.character.animation.step > 1 &&
        //     this.character.animation.step < this.character.animation.maxSteps
        // ) {
        //     if (this.character.isLeft) {
        //         this.character.posX -= 1
        //     } else {
        //         this.character.posX += 1
        //     }
        //     this.character.posY += 1
        // }

        if (this.character.animation.isEnd()) {
            this.character.changeState(this.character.stateIdle)
        }
    }

    onNoInput() {}
}
