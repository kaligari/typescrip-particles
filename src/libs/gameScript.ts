import GameObject from './gameObject'

export default class GameScript {
    name: string
    parent: GameObject

    constructor(name: string, parent: GameObject) {
        this.name = name
        this.parent = parent
    }

    init() {}

    update() {}
}
