import Color from "./color";
import RendererEngine from "./rendererEngine";

export default class Scene {
    rendererEngine: RendererEngine

    constructor(rendererEngine: RendererEngine) {
        this.rendererEngine = rendererEngine
    }


    render() {
        const color = new Color(255, 0, 0)
        this.rendererEngine.drawPixel(100, 100, color)
    }
}