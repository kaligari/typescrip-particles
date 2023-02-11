export default class Color {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
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