import Game from '@/game'
import './style.css'
import rendererEngine from './rendererEngine'
import userInput from './modules/userInput'

// new Game(640, 480, 2)
new Game(320, 200, 3)

const debug = document.getElementById('debug') as HTMLElement

printDebug()

function printDebug() {
    debug.innerHTML = `${rendererEngine.fps} FPS<br />
    Delta: ${rendererEngine.delta}<br />
    Mouse X: ${userInput.mouseX}<br />
    Mouse Y: ${userInput.mouseY}<br />`
    requestAnimationFrame(printDebug)
}
