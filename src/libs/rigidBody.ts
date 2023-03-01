export default abstract class RigidBody {
    x = 0
    y = 0
    width = 0
    height = 0
    accX = 0
    accY = 0

    interpolateForceX(factor: number, target = 1) {
        if (this.accX - factor > target) {
            this.accX -= factor
            return
        }
        if (this.accX + factor < target) {
            this.accX += factor
            return
        }
        this.accX = target
    }
}
