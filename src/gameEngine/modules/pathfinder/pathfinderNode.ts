import { EPathfinderNodeType } from './types'
import Color from "../../libs/color"
import GameObject from "../../libs/gameObject"
import Rectangle from "../primitives/rectangle"
import Pathfinder from './pathfinder'
import { floor } from '../../helpers/math'

export default class PathfinderNode extends GameObject {
    pathfinder: Pathfinder
    id: number
    borderColor: Color
    type: EPathfinderNodeType
    gCost: number | undefined
    hCost: number | undefined
    fCost: number | undefined

    constructor(pathfinder: Pathfinder, id: number) {
        super(pathfinder.game)
        this.pathfinder = pathfinder
        this.width = 29
        this.height = 30
        this.borderColor = new Color(30, 30, 30)
        this.type = EPathfinderNodeType.INIT
        this.id = id
    }

    handleInput() {
        if(this.isMouseClick()) {
            if(this.type === EPathfinderNodeType.OBSTACLE || this.type === EPathfinderNodeType.INIT) {
                return
            }
            this.pathfinder.parentNodeId = this.id
            this.reveal()
            if(this.type === EPathfinderNodeType.REVEALED) {
                this.type = EPathfinderNodeType.SELECTED
            }
            // top
            if(this.id >= this.pathfinder.sizeX) {
                this.pathfinder.nodes[this.id - this.pathfinder.sizeX].reveal()
            }
            // top-right
            if(this.id >= this.pathfinder.sizeX && this.posX() < this.pathfinder.sizeX - 1) {
                this.pathfinder.nodes[this.id - this.pathfinder.sizeX + 1].reveal()
            }
            // right
            if(this.posX() < this.pathfinder.sizeX - 1) {
                this.pathfinder.nodes[this.id + 1].reveal()
            }
            // bottom-right
            if(this.id < this.pathfinder.nodes.length - this.pathfinder.sizeX && this.posX() < this.pathfinder.sizeX - 1) {
                this.pathfinder.nodes[this.id + this.pathfinder.sizeX + 1].reveal()
            }
            // bottom
            if(this.id < this.pathfinder.nodes.length - this.pathfinder.sizeX) {
                this.pathfinder.nodes[this.id + this.pathfinder.sizeX].reveal()
            }
            // bottom-left
            if(this.id < this.pathfinder.nodes.length - this.pathfinder.sizeX && this.posX() > 0) {
                this.pathfinder.nodes[this.id + this.pathfinder.sizeX - 1].reveal()
            }
            // left
            if(this.posX() > 0) {
                this.pathfinder.nodes[this.id - 1].reveal()
            }
            // top-left
            if(this.id >= this.pathfinder.sizeX && this.posX() > 0) {
                this.pathfinder.nodes[this.id - this.pathfinder.sizeX - 1].reveal()
            }
        }
    }

    drawBackground() {
        if(this.type === EPathfinderNodeType.START || this.type === EPathfinderNodeType.END) {
            new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 128, 255))
            return
        }
        if(this.type === EPathfinderNodeType.SELECTED) {
            new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor, new Color(200, 0, 0))
            return
        }
        if(this.type === EPathfinderNodeType.REVEALED) {
            new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 128, 0))
            if(this.isMouseHover()) {
                new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor, new Color(128, 255, 128))
                return
            }
            return
        }
        if(this.type === EPathfinderNodeType.OBSTACLE) {
            new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 0, 0))
            return
        }
        if(this.type === EPathfinderNodeType.INIT) {
            new Rectangle(this.pathfinder.game).draw(this.x, this.y, this.width, this.height, this.borderColor)
            return
        }
    }

    drawText() {
        if(this.type === EPathfinderNodeType.START) {
            this.pathfinder.game.userInterface.text('A', this.x + 13, this.y + 20, new Color(0, 0, 0))
            return
        }
        if(this.type === EPathfinderNodeType.END) {
            this.pathfinder.game.userInterface.text('B', this.x + 13, this.y + 20, new Color(0, 0, 0))
            return
        }
        if(this.gCost) {
            this.pathfinder.game.userInterface.text(this.gCost.toString(), this.x + 2, this.y + 2, new Color(0, 0, 100))
        }
        if(this.hCost) {
            this.pathfinder.game.userInterface.text(this.hCost.toString(), this.x + this.width - 11, this.y + 2, new Color(100, 0, 0))
        }
        if(this.gCost && this.hCost) {
            this.pathfinder.game.userInterface.text((this.gCost + this.hCost).toString(), this.x + 10, this.y + 17, new Color(0, 0, 0))
        }
    }

    draw() {
        this.drawBackground()
        this.drawText()
    }

    posX() {
        return (this.id % this.pathfinder.sizeX)
    }

    posY() {
        return floor(this.id / this.pathfinder.sizeX)
    }

    reveal() {
        if(this.type === EPathfinderNodeType.OBSTACLE) {
            return
        }
        if(this.type === EPathfinderNodeType.INIT) {
            this.type = EPathfinderNodeType.REVEALED
            this.hCost = this.pathfinder.distanceBetweenNodes(this.pathfinder.endNode(), this)
        }
        const distanceFromParentNode = this.pathfinder.distanceBetweenNodes(this.pathfinder.parentNode(), this.pathfinder.startNode())
        const gCost = this.pathfinder.distanceBetweenNodes(this.pathfinder.parentNode(), this) + distanceFromParentNode
        if(this.gCost === undefined || gCost < this.gCost) {
            this.gCost = gCost
        }
        if(this.hCost !== undefined) {
            this.fCost = this.hCost + this.gCost
        }
    }
    
}