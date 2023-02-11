import RendererEngine from "./rendererEngine"
import UserInput from "./modules/userInput"
import UserInterface from "./modules/userInterface/userInterface"

export default class Game {
    rendererEngine: RendererEngine
    width: number   
    height: number
    userInput: UserInput
    userInterface: UserInterface

    constructor(width: number, height: number) {
        this.rendererEngine = new RendererEngine(this)
        this.userInput = new UserInput(this)
        this.userInterface = new UserInterface(this)
        this.width = width
        this.height = height

        window.addEventListener('resize', () => {
            this.init()
        })

        this.init()
    }

    render() {
        this.rendererEngine.render()
        window.requestAnimationFrame(this.render.bind(this))
    }

    init() {
        this.rendererEngine.init(this.width, this.height)
        this.render()
    }
}