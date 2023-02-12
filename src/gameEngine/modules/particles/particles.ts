import Color from "../../libs/color"
import { random } from "../../helpers/math"
import Particle from "../particles/particle"
import rendererEngine from "../../rendererEngine"

export default class Particles {
    particles: Particle[]
    amount: number

    constructor(amount: number) {
        this.amount = amount
        this.particles = Array(this.amount)
        for(let i = 0; i <= this.amount; i++ ) {
            const snow = 100 + random(150)
            this.particles[i] = new Particle(
                random(320),
                -1,
                0,
                new Color(snow, snow, snow),
                false
            )
        }
    }

    drawParticles() {
        for(let i = 0; i <= this.amount; i++ ) {
            if(this.particles[i].active) {
                this.drawParticle(this.particles[i])
            }
        }
        if(random(2) == 0) {
            for(let j = 0; j < 10; j++) {
                this.particles[random(this.amount)].active = true
                
            }
        }
    }

    private drawParticle(particle: Particle) {
        rendererEngine.drawPixel(
            particle.x,
            particle.y,
            particle.color
        )

        if(particle.life > 3000 || particle.y > rendererEngine.height) {
            particle.x = random(320)
            particle.y = -1
            particle.life = 0
            const snow = 100 + random(150)
            particle.color = new Color(snow, snow, snow)
            particle.active = false
        }

        if(particle.active) {
            particle.x += 1
            particle.y += random(3)
        }
        
        particle.life += 10
    }
}