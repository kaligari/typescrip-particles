import './style.css'
import rendererEngine from './rendererEngine'
import userInput from '@/modules/userInput/userInput'
import Game from '@/game'

const game = new Game()
game.init(320, 200, 3)
rendererEngine.debug = true

const debug = document.getElementById('debug') as HTMLElement

if (rendererEngine.debug === true) {
    printDebug()
}

function printDebug() {
    debug.innerHTML = `${rendererEngine.fps} FPS<br />
    Delta: ${rendererEngine.delta}<br />
    Mouse X: ${userInput.mouseX}<br />
    Mouse Y: ${userInput.mouseY}<br />
    ------<br />`
    requestAnimationFrame(printDebug)
}
