class Camera {
    private _x = 0
    private _y = 0

    get x() {
        return this._x
    }

    set x(value: number) {
        this._x = value
    }

    get y() {
        return this._y
    }

    set y(value: number) {
        this._y = value
    }
}

const camera = new Camera()
export default camera
