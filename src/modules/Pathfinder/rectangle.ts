import { EPathfinderRectType } from './enums'
import Color from "../color"
import GameObject from "../gameObject"
import Primitives from "../primitives"
import Pathfinder from './pathfinder'
import { floor } from '../helpers'

export default class Rectangle extends GameObject {
    pathfinder: Pathfinder
    id: number
    borderColor: Color
    type: EPathfinderRectType
    gCost: number | undefined
    hCost: number | undefined
    fCost: number | undefined

    constructor(pathfinder: Pathfinder, id: number) {
        super(pathfinder.game)
        this.pathfinder = pathfinder
        this.width = 29
        this.height = 30
        this.borderColor = new Color(30, 30, 30)
        this.type = EPathfinderRectType.INIT
        this.id = id
    }

    handleInput() {
        if(this.isMouseClick()) {
            if(this.type === EPathfinderRectType.OBSTACLE || this.type === EPathfinderRectType.INIT) {
                return
            }
            this.pathfinder.parentRect = this.id
            this.reveal()
            if(this.type === EPathfinderRectType.REVEALED) {
                this.type = EPathfinderRectType.SELECTED
            }
            // top
            if(this.id >= this.pathfinder.rectsX) {
                this.pathfinder.rects[this.id - this.pathfinder.rectsX].reveal()
            }
            // top-right
            if(this.id >= this.pathfinder.rectsX && this.posX() < this.pathfinder.rectsX - 1) {
                this.pathfinder.rects[this.id - this.pathfinder.rectsX + 1].reveal()
            }
            // right
            if(this.posX() < this.pathfinder.rectsX - 1) {
                this.pathfinder.rects[this.id + 1].reveal()
            }
            // bottom-right
            if(this.id < this.pathfinder.rects.length - this.pathfinder.rectsX && this.posX() < this.pathfinder.rectsX - 1) {
                this.pathfinder.rects[this.id + this.pathfinder.rectsX + 1].reveal()
            }
            // bottom
            if(this.id < this.pathfinder.rects.length - this.pathfinder.rectsX) {
                this.pathfinder.rects[this.id + this.pathfinder.rectsX].reveal()
            }
            // bottom-left
            if(this.id < this.pathfinder.rects.length - this.pathfinder.rectsX && this.posX() > 0) {
                this.pathfinder.rects[this.id + this.pathfinder.rectsX - 1].reveal()
            }
            // left
            if(this.posX() > 0) {
                this.pathfinder.rects[this.id - 1].reveal()
            }
            // top-left
            if(this.id >= this.pathfinder.rectsX && this.posX() > 0) {
                this.pathfinder.rects[this.id - this.pathfinder.rectsX - 1].reveal()
            }
        }
    }

    drawBackground() {
        if(this.type === EPathfinderRectType.START || this.type === EPathfinderRectType.END) {
            new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 128, 255))
            return
        }
        if(this.type === EPathfinderRectType.SELECTED) {
            new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(200, 0, 0))
            return
        }
        if(this.type === EPathfinderRectType.REVEALED) {
            new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 128, 0))
            if(this.isMouseHover()) {
                new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(128, 255, 128))
                return
            }
            return
        }
        if(this.type === EPathfinderRectType.OBSTACLE) {
            new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor, new Color(0, 0, 0))
            return
        }
        if(this.type === EPathfinderRectType.INIT) {
            new Primitives(this.pathfinder.game).drawRect(this.x, this.y, this.width, this.height, this.borderColor)
            return
        }
    }

    drawText() {
        if(this.type === EPathfinderRectType.START) {
            this.pathfinder.game.userInterface.text('A', this.x + 13, this.y + 20, new Color(0, 0, 0))
            return
        }
        if(this.type === EPathfinderRectType.END) {
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
        return (this.id % this.pathfinder.rectsX)
    }

    posY() {
        return floor(this.id / this.pathfinder.rectsX)
    }

    reveal() {
        if(this.type === EPathfinderRectType.OBSTACLE) {
            return
        }
        if(this.type === EPathfinderRectType.INIT) {
            this.type = EPathfinderRectType.REVEALED
            this.hCost = this.pathfinder.distanceBetweenNodes(this.pathfinder.endNode(), this)
        }
        const distanceFromParentNode = this.pathfinder.distanceBetweenNodes(this.pathfinder.parentNode(), this.pathfinder.startNode())
        const gCost = this.pathfinder.distanceBetweenNodes(this.pathfinder.parentNode(), this) + distanceFromParentNode
        if(this.gCost === undefined || gCost < this.gCost) {
            this.gCost = gCost
        }
    }
    
}