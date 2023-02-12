import rendererEngine from "./rendererEngine"
export default class Game {

    constructor(width: number, height: number) {
        
        window.addEventListener('resize', () => {
            this.init(width, height)
        })

        this.init(width, height)
    }

    render() {
        rendererEngine.render()
        window.requestAnimationFrame(this.render.bind(this))
    }

    init(width: number, height: number) {
        rendererEngine.init(width, height)
        this.render()
    }
}