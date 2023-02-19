import game from '@/game'
import './style.css'
import rendererEngine from './rendererEngine'
import userInput from '@/modules/userInput/userInput'
import scene from './scene'

// new Game(640, 480, 2)
game.init(320, 200, 3)
// game.debug = true

const debug = document.getElementById('debug') as HTMLElement

printDebug()

function printDebug() {
    debug.innerHTML = `${rendererEngine.fps} FPS<br />
    Delta: ${rendererEngine.delta}<br />
    Mouse X: ${userInput.mouseX}<br />
    Mouse Y: ${userInput.mouseY}<br />
    ------<br />
    cameraX: ${scene.cameraX}<br />`
    requestAnimationFrame(printDebug)
}
