import rendererEngine from '@/rendererEngine'
class Game {
    debug: boolean

    constructor() {
        this.debug = false
    }

    init(width: number, height: number, scale = 1) {
        rendererEngine.init(width, height, scale)
        this.render()
    }

    render() {
        rendererEngine.render()
        window.requestAnimationFrame(this.render.bind(this))
    }
}
const game = new Game()
export default game
