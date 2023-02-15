import { floor } from '@/helpers/math'
import rendererEngine from '@/rendererEngine'
import UPNG from 'upng-js'
import Color from './color'

export interface IRectangle {
    x: number
    y: number
    width: number
    height: number
}

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

    render(x: number, y: number) {
        if (this.data === undefined) return

        for (let data = 0; data < this.data.length / 4; data++) {
            const idx = data * 4
            if (this.data[idx + 3] === 0) continue
            rendererEngine.drawPixel(
                (data % this.width) + x,
                floor(data / this.width) + y,
                new Color(this.data[idx], this.data[idx + 1], this.data[idx + 2]),
            )
        }
    }

    renderSelection(crop: IRectangle, x: number, y: number, mirrorVertical = false) {
        if (this.data === undefined) return
        for (let i = 0; i < crop.width * crop.height; i++) {
            const skipB = this.width - crop.width - crop.x
            const offsetX = i % crop.width
            const offsetY = floor(i / crop.width)
            const scanDirection = mirrorVertical ? crop.width - offsetX : offsetX
            let idx = (crop.x + crop.width + skipB) * (offsetY + crop.y) + crop.x + scanDirection
            idx *= 4

            if (this.data[idx + 3] === 0) continue

            rendererEngine.drawPixel(
                offsetX + x,
                offsetY + y,
                new Color(this.data[idx], this.data[idx + 1], this.data[idx + 2]),
            )
        }
    }
}
