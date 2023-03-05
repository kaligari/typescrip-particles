import { round } from '@/helpers/math'

export enum ECameraMovementType {
    round,
    precise,
}
class Camera {
    private _x = 0
    private _y = 0
    private destX = 0
    private destY = 0
    stiffness = 0.1
    movementType = ECameraMovementType.round

    get x() {
        return round(this._x)
    }

    set x(value: number) {
        this.destX = value
    }

    get y() {
        return round(this._y)
    }

    set y(value: number) {
        this.destY = value
    }

    update() {
        switch (this.movementType) {
            case ECameraMovementType.round:
                this._x += round((this.destX - this._x) * this.stiffness)
                this._y += round((this.destY - this._y) * this.stiffness)
                break
            case ECameraMovementType.precise:
                this._x += (this.destX - this._x) * this.stiffness
                this._y += (this.destY - this._y) * this.stiffness
                break
        }
    }
}

const camera = new Camera()
export default camera
