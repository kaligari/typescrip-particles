import { EPathfinderNodeType } from './types'
import Color from '@/libs/color'
import GameObject from '@/libs/gameObject'
import Rectangle from '../primitives/rectangle'
import { floor } from '@/helpers/math'
import userInterface from '../userInterface/userInterface'
import pathfinder from './pathfinder'

export default class PathfinderNode extends GameObject {
    id: number
    borderColor: Color
    type: EPathfinderNodeType
    gCost: number | undefined
    hCost: number | undefined
    fCost: number | undefined

    constructor(id: number) {
        super()
        this.width = 29
        this.height = 30
        this.borderColor = new Color(30, 30, 30)
        this.type = EPathfinderNodeType.INIT
        this.id = id
    }

    handleInput() {
        if (this.isMouseClick()) {
            if (
                this.type === EPathfinderNodeType.OBSTACLE ||
                this.type === EPathfinderNodeType.INIT
            ) {
                return
            }
            pathfinder.parentNodeId = this.id
            this.reveal()
            if (this.type === EPathfinderNodeType.REVEALED) {
                this.type = EPathfinderNodeType.SELECTED
            }
            // top
            if (this.id >= pathfinder.sizeX) {
                pathfinder.nodes[this.id - pathfinder.sizeX].reveal()
            }
            // top-right
            if (this.id >= pathfinder.sizeX && this.posX() < pathfinder.sizeX - 1) {
                pathfinder.nodes[this.id - pathfinder.sizeX + 1].reveal()
            }
            // right
            if (this.posX() < pathfinder.sizeX - 1) {
                pathfinder.nodes[this.id + 1].reveal()
            }
            // bottom-right
            if (
                this.id < pathfinder.nodes.length - pathfinder.sizeX &&
                this.posX() < pathfinder.sizeX - 1
            ) {
                pathfinder.nodes[this.id + pathfinder.sizeX + 1].reveal()
            }
            // bottom
            if (this.id < pathfinder.nodes.length - pathfinder.sizeX) {
                pathfinder.nodes[this.id + pathfinder.sizeX].reveal()
            }
            // bottom-left
            if (this.id < pathfinder.nodes.length - pathfinder.sizeX && this.posX() > 0) {
                pathfinder.nodes[this.id + pathfinder.sizeX - 1].reveal()
            }
            // left
            if (this.posX() > 0) {
                pathfinder.nodes[this.id - 1].reveal()
            }
            // top-left
            if (this.id >= pathfinder.sizeX && this.posX() > 0) {
                pathfinder.nodes[this.id - pathfinder.sizeX - 1].reveal()
            }
        }
    }

    drawBackground() {
        if (this.type === EPathfinderNodeType.START || this.type === EPathfinderNodeType.END) {
            new Rectangle().draw(
                this.x,
                this.y,
                this.width,
                this.height,
                this.borderColor,
                new Color(0, 128, 255),
            )
            return
        }
        if (this.type === EPathfinderNodeType.SELECTED) {
            new Rectangle().draw(
                this.x,
                this.y,
                this.width,
                this.height,
                this.borderColor,
                new Color(200, 0, 0),
            )
            return
        }
        if (this.type === EPathfinderNodeType.REVEALED) {
            new Rectangle().draw(
                this.x,
                this.y,
                this.width,
                this.height,
                this.borderColor,
                new Color(0, 128, 0),
            )
            if (this.isMouseHover()) {
                new Rectangle().draw(
                    this.x,
                    this.y,
                    this.width,
                    this.height,
                    this.borderColor,
                    new Color(128, 255, 128),
                )
                return
            }
            return
        }
        if (this.type === EPathfinderNodeType.OBSTACLE) {
            new Rectangle().draw(
                this.x,
                this.y,
                this.width,
                this.height,
                this.borderColor,
                new Color(0, 0, 0),
            )
            return
        }
        if (this.type === EPathfinderNodeType.INIT) {
            new Rectangle().draw(this.x, this.y, this.width, this.height, this.borderColor)
            return
        }
    }

    drawText() {
        if (this.type === EPathfinderNodeType.START) {
            userInterface.text('A', this.x + 13, this.y + 20, new Color(0, 0, 0))
            return
        }
        if (this.type === EPathfinderNodeType.END) {
            userInterface.text('B', this.x + 13, this.y + 20, new Color(0, 0, 0))
            return
        }
        if (this.gCost) {
            userInterface.text(this.gCost.toString(), this.x + 2, this.y + 2, new Color(0, 0, 100))
        }
        if (this.hCost) {
            userInterface.text(
                this.hCost.toString(),
                this.x + this.width - 11,
                this.y + 2,
                new Color(100, 0, 0),
            )
        }
        if (this.gCost && this.hCost) {
            userInterface.text(
                (this.gCost + this.hCost).toString(),
                this.x + 10,
                this.y + 17,
                new Color(0, 0, 0),
            )
        }
    }

    draw() {
        this.drawBackground()
        this.drawText()
    }

    posX() {
        return this.id % pathfinder.sizeX
    }

    posY() {
        return floor(this.id / pathfinder.sizeX)
    }

    reveal() {
        if (this.type === EPathfinderNodeType.OBSTACLE) {
            return
        }
        if (this.type === EPathfinderNodeType.INIT) {
            this.type = EPathfinderNodeType.REVEALED
            this.hCost = pathfinder.distanceBetweenNodes(pathfinder.endNode(), this)
        }
        const distanceFromParentNode = pathfinder.distanceBetweenNodes(
            pathfinder.parentNode(),
            pathfinder.startNode(),
        )
        const gCost =
            pathfinder.distanceBetweenNodes(pathfinder.parentNode(), this) + distanceFromParentNode
        if (this.gCost === undefined || gCost < this.gCost) {
            this.gCost = gCost
        }
        if (this.hCost !== undefined) {
            this.fCost = this.hCost + this.gCost
        }
    }
}
