import Color from '@/libs/color'
import { floor } from './helpers/math'
import Scene from './scene'

class RendererEngine {
    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D | null
    width: number
    height: number
    scale: number
    imagedata: ImageData | null
    deltaNow: number
    deltaThen: number
    delta: number
    fps: number
    debug: boolean

    constructor() {
        this.width = 320
        this.height = 200
        this.deltaNow = 0
        this.deltaThen = 0
        this.delta = 0
        this.fps = 0
        this.scale = 1
        this.imagedata = null
        this.canvas = null
        this.ctx = null
        this.debug = false
    }

    init(canvas: HTMLCanvasElement, width: number, height: number, scale: number) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.imagedata = this.ctx.createImageData(this.width, this.height)
        this.width = width
        this.height = height
        this.scale = scale
        this.canvas.width = this.width * this.scale
        this.canvas.height = this.height * this.scale
        this.imagedata = this.ctx.createImageData(this.width, this.height)
        this.ctx.scale(scale, scale)
        this.ctx.imageSmoothingEnabled = false
    }

    render(scene: Scene) {
        if (!this.imagedata || !this.ctx || !this.canvas) return
        this.setDelta()
        scene.render()
        this.ctx.putImageData(this.imagedata, 0, 0)
        this.ctx.drawImage(this.canvas, 0, 0)
    }

    setDelta() {
        this.deltaNow = Date.now()
        this.delta = this.deltaNow - this.deltaThen
        this.deltaThen = this.deltaNow
        this.fps = floor(1000 / this.delta)
    }

    drawPixel(x: number, y: number, color: Color) {
        if (!this.imagedata) return
        if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) return
        const pixelindex = (y * this.width + x) * 4
        if (color.alpha !== 255) {
            const alpha1 = (255 - color.alpha) / 255
            const alpha2 = color.alpha / 255
            this.imagedata.data[pixelindex] =
                alpha1 * this.imagedata.data[pixelindex] + alpha2 * color.red
            this.imagedata.data[pixelindex + 1] =
                alpha1 * this.imagedata.data[pixelindex + 1] + alpha2 * color.green
            this.imagedata.data[pixelindex + 2] =
                alpha1 * this.imagedata.data[pixelindex + 2] + alpha2 * color.blue
            this.imagedata.data[pixelindex + 3] = 255
            return
        }
        this.imagedata.data[pixelindex] = color.red
        this.imagedata.data[pixelindex + 1] = color.green
        this.imagedata.data[pixelindex + 2] = color.blue
        this.imagedata.data[pixelindex + 3] = 255
    }
}

const rendererEngine = new RendererEngine()
export default rendererEngine
