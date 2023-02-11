import Color from "../../../libs/Color"

export default class Particle {
    x: number
    y: number
    life: number
    color: Color
    active: boolean

    constructor(x: number, y: number, life: number, color: Color, active: boolean) {
        this.x = x
        this.y = y
        this.life = life
        this.color = color
        this.active = active
    }
}