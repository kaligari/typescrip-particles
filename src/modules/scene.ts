import Color from "./color";
import Particle from "./particle";
import RendererEngine from "./rendererEngine";

function random(number: number) {
    return Math.floor(Math.random() * number)
}

export default class Scene {
    rendererEngine: RendererEngine
    particles: Particle[]
    amount: number

    constructor(rendererEngine: RendererEngine) {
        this.rendererEngine = rendererEngine
        this.amount = 3000
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

    render() {
        this.drawBackground()
        this.drawParticles()
    }

    drawBackground() {
        const color = new Color(50, 50, 50)
        for(let y = 0; y < this.rendererEngine.height; y++) {
            for(let x = 0; x < this.rendererEngine.width; x++) {
                this.rendererEngine.drawPixel(x, y, color)
            }
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
    
    drawParticle(particle: Particle) {
        this.rendererEngine.drawPixel(
            particle.x,
            particle.y,
            particle.color
        )

        if(particle.life > 3000 || particle.y > this.rendererEngine.height) {
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