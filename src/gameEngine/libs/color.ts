export default class Color {
    red: number
    green: number
    blue: number
    alpha: number

    constructor(red: number, green: number, blue: number, alpha = 255) {
        this.red = red
        this.green = green
        this.blue = blue
        this.alpha = alpha
    }

    multiply(value: number) {
        return new Color(this.red * value, this.green * value, this.blue * value)
    }
    
    add(color: Color){
        this.red += color.red
        this.green += color.green
        this.blue += color.blue
    }
}