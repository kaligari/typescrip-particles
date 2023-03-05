class Camera {
    private _x = 0
    private _y = 0
    private destX = 0
    private destY = 0
    stiffness = 0.1

    get x() {
        return this._x
    }

    set x(value: number) {
        this.destX = value
    }

    get y() {
        return this._y
    }

    set y(value: number) {
        this.destY = value
    }

    update() {
        this._x += Math.round((this.destX - this._x) * this.stiffness)
    }
}

const camera = new Camera()
export default camera
