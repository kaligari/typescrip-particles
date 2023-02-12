import rendererEngine from '@/rendererEngine'
export default class Game {
    constructor(width: number, height: number, scale = 1) {
        window.addEventListener('resize', () => {
            this.init(width, height, scale)
        })

        this.init(width, height, scale)
    }

    render() {
        rendererEngine.render()
        window.requestAnimationFrame(this.render.bind(this))
    }

    init(width: number, height: number, scale: number) {
        rendererEngine.init(width, height, scale)
        this.render()
    }
}
