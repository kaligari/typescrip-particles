import GameImage from './gameImage'

export default class GameAnimation {
    images: GameImage[]
    name: string
    animation: string
    step: number

    constructor() {
        this.name = 'adventurer'
        this.animation = 'run'
        this.images = []
        this.step = 0
        for (let i = 0; i < 6; i++) {
            this.images.push(new GameImage())
            this.images[i].loadImage(`./img/${this.name}/adventurer-${this.animation}-0${i}.png`)
        }
    }

    render() {
        this.images[this.step].render()
        this.step++
        if (this.step > 5) this.step = 0
    }
}
