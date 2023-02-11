import Game from "../../game"
import { abs, floor } from "../../helpers/math"
import { EPathfinderNodeType } from "./types"
import PathfinderNode from "./pathfinderNode"

export default class Pathfinder {
    game: Game
    nodes: PathfinderNode[]
    obstacles: number[]
    sizeX = 11
    sizeY = 6
    startNodeId: number
    endNodeId: number
    parentNodeId: number
    
    constructor(game: Game) {
        this.game = game
        this.nodes  = new Array(this.sizeX * this.sizeY)
        for(let i = 0; i < this.sizeX * this.sizeY; i++) {
            this.nodes[i] = new PathfinderNode(this, i)
        }
        this.endNodeId = 15
        this.startNodeId = 51
        this.parentNodeId = this.startNodeId
        this.nodes[this.startNodeId].type = EPathfinderNodeType.START
        this.nodes[this.endNodeId].type = EPathfinderNodeType.END
        
        this.obstacles = [14, 25, 26, 27, 28, 29]
        for(let obstacle of this.obstacles) {
            this.nodes[obstacle].type = EPathfinderNodeType.OBSTACLE
        }
    }

    drawChecker() {
        for(let id = 0; id < this.sizeX * this.sizeY; id++) {
            this.nodes[id].handleInput()
            this.nodes[id].x = id % this.sizeX * this.nodes[id].width
            this.nodes[id].y = floor(id / this.sizeX) * this.nodes[id].height
            this.nodes[id].draw()
        }
    }

    startNode() {
        return this.nodes[this.startNodeId]
    }

    endNode() {
        return this.nodes[this.endNodeId]
    }

    parentNode() {
        return this.nodes[this.parentNodeId]
    }

    distanceBetweenNodes(node1: PathfinderNode, node2: PathfinderNode) {
        const startNodeDistX = abs(node1.posX() - node2.posX())
        const startNodeDistY = abs(node1.posY() - node2.posY())
        const stright = abs(startNodeDistX - startNodeDistY)
        const skew = abs(abs(startNodeDistX - startNodeDistY) - (startNodeDistX + startNodeDistY)) / 2
        return stright * 10 + skew * 14
    }

}