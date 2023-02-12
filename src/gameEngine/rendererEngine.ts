import Color from "./libs/color"
import Game from "./game"
import Scene from "./scene"

export default class RendererEngine {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    imagedata: ImageData
    deltaNow: number
    deltaThen: number
    delta: number
    fps: number
    scene: Scene
    game: Game

    constructor(game: Game) {
        this.game = game
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.width = 320
        this.height = 200
        this.imagedata = this.ctx.createImageData(this.width, this.height)
        this.deltaNow = 0
        this.deltaThen = 0
        this.delta = 0
        this.fps = 0
        this.scene = new Scene(this.game)
    }

    init(width: number, height: number) {
        this.width = width
        this.height = height
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.imagedata = this.ctx.createImageData(this.width, this.height)
    }

    render() {
        this.setDelta()
        this.scene.render()
        this.game.userInterface.text(`${this.fps} FPS`, 5, 5, new Color(255, 0, 0))
        this.game.userInterface.text(`Mouse X: ${this.game.userInput.mouseX}`, 5, 15, new Color(255, 0, 0))
        this.game.userInterface.text(`Mouse Y: ${this.game.userInput.mouseY}`, 5, 25, new Color(255, 0, 0))
        this.ctx.putImageData(this.imagedata, 0, 0)
    }

    setDelta() {
        this.deltaNow = Date.now()
        this.delta = (this.deltaNow - this.deltaThen) / 1000
        this.deltaThen = this.deltaNow
        this.fps = Math.floor(1 / this.delta)
    }

    drawPixel(x: number, y: number, color: Color) {
        if(x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) return
        const pixelindex = (y * this.width + x) * 4
        if(color.alpha !== 255) {
            const alpha1 = (255 - color.alpha) / 255 
            const alpha2 = color.alpha / 255
            this.imagedata.data[pixelindex] = alpha1 * this.imagedata.data[pixelindex] + alpha2 * color.red
            this.imagedata.data[pixelindex + 1] = alpha1 * this.imagedata.data[pixelindex + 1] + alpha2 * color.green
            this.imagedata.data[pixelindex + 2] = alpha1 * this.imagedata.data[pixelindex + 2] + alpha2 * color.blue
            this.imagedata.data[pixelindex + 3] = 255
            return
        }
        this.imagedata.data[pixelindex] = color.red
        this.imagedata.data[pixelindex + 1] = color.green
        this.imagedata.data[pixelindex + 2] = color.blue
        this.imagedata.data[pixelindex + 3] = 255
    }
}