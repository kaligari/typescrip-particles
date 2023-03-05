import rendererEngine from '@/rendererEngine'
import Scene from './scene'
import gamePerformance from './modules/gamePerformance'
class Game {
    scene: Scene

    constructor() {
        this.scene = new Scene()
    }

    async init(width: number, height: number, scale = 1) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        rendererEngine.init(canvas, width, height, scale)
        await this.scene.init()
        this.render()
    }

    render() {
        if (rendererEngine.debug) {
            gamePerformance.clear()
            gamePerformance.addMark('game.render')
        }
        rendererEngine.render(this.scene)
        window.requestAnimationFrame(this.render.bind(this))
    }
}
export default Game
