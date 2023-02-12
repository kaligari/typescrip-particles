import Color from '@/libs/color'
import pathfinder from '@/modules/pathfinder/pathfinder'
import rendererEngine from '@/rendererEngine'

class Scene {
    render() {
        this.drawBackground()
        pathfinder.drawChecker()
    }

    drawBackground() {
        const color = new Color(50, 50, 50)
        for (let y = 0; y < rendererEngine.height; y++) {
            for (let x = 0; x < rendererEngine.width; x++) {
                rendererEngine.drawPixel(x, y, color)
            }
        }
    }
}

const scene = new Scene()
export default scene
