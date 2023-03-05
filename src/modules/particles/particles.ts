import Particle from './particle'

export default abstract class Particles {
    particles: Particle[]
    amount: number
    active: boolean
    onReset?(particle: Particle, id?: number): void
    onUpdate?(particle: Particle, id: number): void

    constructor(amount: number) {
        this.amount = amount
        this.active = false
        this.particles = Array(this.amount)
        for (let i = 0; i < this.amount; i++) {
            this.particles[i] = new Particle()
        }
    }

    resetParticles() {
        for (let i = 0; i < this.amount; i++) {
            if (this.onReset) {
                this.onReset(this.particles[i], i)
            }
        }
    }

    resetParticle(particle: Particle) {
        if (this.onReset) {
            this.onReset(particle)
        }
    }

    update() {
        for (let i = 0; i < this.amount; i++) {
            if (this.onUpdate) {
                this.onUpdate(this.particles[i], i)
            }
        }
    }

    draw() {
        for (let i = 0; i < this.amount; i++) {
            if (this.particles[i].active) {
                this.particles[i].draw()
            }
        }
    }
}
