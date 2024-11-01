import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import pathfinder, { Pathfinder } from './modules/pathfinder/pathfinder'

export default class Scene {
    pathfinder: Pathfinder

    constructor() {
        this.pathfinder = pathfinder
    }

    async init() {}

    update() {
        this.drawBackground()
        pathfinder.drawChecker()
    }

    drawBackground() {
        const color = new Color(96, 121, 188)
        for (let y = 0; y < rendererEngine.height; y++) {
            for (let x = 0; x < rendererEngine.width; x++) {
                rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}
