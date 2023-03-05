import camera from '@/libs/camera'
import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'

export default class Particle {
    x: number
    y: number
    life: number
    color: Color
    active: boolean

    constructor() {
        this.x = 0
        this.y = 0
        this.life = 0
        this.color = new Color(0, 0, 0)
        this.active = false
    }

    set(x: number, y: number, life: number, color: Color, active: boolean) {
        this.x = x
        this.y = y
        this.life = life
        this.color = color
        this.active = active
    }

    draw() {
        rendererEngine.drawPixel(this.x - camera.x, this.y - camera.y, this.color)
    }
}
