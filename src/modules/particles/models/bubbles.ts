import Particles from '../particles'
import { random } from '@/helpers/math'
import Particle from '../particle'
import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import Character from '@/modules/character/character'

export default class Bubbles extends Particles {
    object: Character
    amount: number

    constructor(object: Character) {
        super(30)
        this.amount = 30
        this.object = object
    }

    override onReset(particle: Particle) {
        particle.set(this.object.x + 10, this.object.y, 5000, this.color, true)
    }

    override onUpdate(particle: Particle) {
        if (particle.active) {
            particle.life -= rendererEngine.delta
            particle.x += 1 - random(2)
            particle.y -= random(5) === 1 ? 1 : 0
        } else if (this.active && random(this.amount) === 1) {
            this.resetParticle(particle)
        }
        // destroy particle when its touch level water
        if (particle.life <= 0 || particle.y < 148) {
            particle.active = false
        }
    }

    get color() {
        const color1 = 130 + random(50)
        const color2 = 130 + random(50)
        return new Color(0, color1, color2)
    }
}
