import rendererEngine from '@/rendererEngine'
import Scene from './scene'
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
        rendererEngine.render(this.scene)
        window.requestAnimationFrame(this.render.bind(this))
    }
}
export default Game
