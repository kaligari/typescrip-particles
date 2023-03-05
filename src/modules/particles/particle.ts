import camera from '@/libs/camera'
import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'

export default class Particle {
    x: number
    y: number
    // TODO Are we using it?
    xSpeed: number
    ySpeed: number
    life: number
    color: Color
    active: boolean

    constructor() {
        this.x = 0
        this.y = 0
        this.xSpeed = 0
        this.ySpeed = 0
        this.life = 0
        this.color = new Color(0, 0, 0)
        this.active = false
    }

    set(
        x: number,
        y: number,
        life: number,
        color: Color,
        active: boolean,
        xSpeed: number,
        ySpeed: number,
    ) {
        this.x = x
        this.y = y
        this.life = life
        this.color = color
        this.active = active
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
    }

    draw() {
        rendererEngine.drawPixel(this.x - camera.x, this.y - camera.y, this.color)
    }
}
