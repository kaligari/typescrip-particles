import { floor } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'
import UPNG from 'upng-js'
import Color from './color'

export default class GameImage {
    data: Uint8Array | undefined
    width: number
    height: number

    constructor() {
        this.data = new Uint8Array()
        this.width = 0
        this.height = 0
    }

    async loadImage(src: string) {
        const img = await fetch(src)
        const buff = await img.arrayBuffer()
        const imgData = UPNG.decode(buff)
        this.width = imgData.width
        this.height = imgData.height
        const rgba = UPNG.toRGBA8(imgData)[0]
        this.data = new Uint8Array(rgba)
    }

    render() {
        if (this.data === undefined) return

        for (let data = 0; data < this.data.length / 4; data++) {
            const idx = data * 4
            if (this.data[idx + 3] === 0) continue
            rendererEngine.drawPixel(
                data % this.width,
                floor(data / this.width),
                new Color(this.data[idx], this.data[idx + 1], this.data[idx + 2]),
            )
        }
    }
}
