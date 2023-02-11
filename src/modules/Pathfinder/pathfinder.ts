import Game from "../game"
import { abs, floor, pow2, round, sqrt } from "../helpers"
import { EPathfinderRectType } from "./enums"
import Rectangle from "./rectangle"

export default class Pathfinder {
    game: Game
    rects: Rectangle[]
    obstacles: number[]
    rectsX = 11
    rectsY = 6
    rectStart: number
    rectEnd: number
    parentRect: number
    
    constructor(game: Game) {
        this.game = game
        this.rects  = new Array(this.rectsX * this.rectsY)
        for(let i = 0; i < this.rectsX * this.rectsY; i++) {
            this.rects[i] = new Rectangle(this, i)
        }
        this.rectEnd = 15
        this.rectStart = 51
        // this.rectEnd = 0
        // this.rectStart = 65
        this.parentRect = this.rectStart
        this.rects[this.rectStart].type = EPathfinderRectType.START
        this.rects[this.rectEnd].type = EPathfinderRectType.END
        
        this.obstacles = [14, 25, 26, 27, 28, 29]
        for(let obstacle of this.obstacles) {
            this.rects[obstacle].type = EPathfinderRectType.OBSTACLE
        }
    }

    drawChecker() {
        for(let id = 0; id < this.rectsX * this.rectsY; id++) {
            this.rects[id].handleInput()
            this.rects[id].x = id % this.rectsX * this.rects[id].width
            this.rects[id].y = floor(id / this.rectsX) * this.rects[id].height
            this.rects[id].draw()
        }
    }

    startNode() {
        return this.rects[this.rectStart]
    }

    endNode() {
        return this.rects[this.rectEnd]
    }

    parentNode() {
        return this.rects[this.parentRect]
    }

    distanceBetweenNodes(node1: Rectangle, node2: Rectangle) {
        const startNodeDistX = abs(node1.posX() - node2.posX())
        const startNodeDistY = abs(node1.posY() - node2.posY())
        const stright = abs(startNodeDistX - startNodeDistY)
        const skew = abs(abs(startNodeDistX - startNodeDistY) - (startNodeDistX + startNodeDistY)) / 2
        return stright * 10 + skew * 14
    }

}