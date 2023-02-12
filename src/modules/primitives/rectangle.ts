import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'

export default class Rectangle {
    draw(
        x: number,
        y: number,
        width: number,
        height: number,
        color: Color,
        fill: Color | null = null,
    ) {
        // TODO Optimize number of drawing pixels
        for (let i = x; i <= x + width; i++) {
            for (let j = y; j <= y + height; j++) {
                if (i === x || i === x + width || j === y || j === y + height) {
                    rendererEngine.drawPixel(i, j, color)
                    continue
                }
                if (fill) {
                    rendererEngine.drawPixel(i, j, fill)
                }
            }
        }
    }
}
