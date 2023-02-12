import rendererEngine from '@/rendererEngine'
export default class Game {
    constructor(width: number, height: number, scale = 1) {
        rendererEngine.init(width, height, scale)
        this.render()
    }

    render() {
        rendererEngine.render()
        window.requestAnimationFrame(this.render.bind(this))
    }
}
