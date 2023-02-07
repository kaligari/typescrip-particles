import RendererEngine from './modules/rendererEngine'
import './style.css'

const width = 320
const height = 200

const engine = new RendererEngine()

const render = () => {
  engine.render()
  window.requestAnimationFrame(render)
}

const init = () => {
  engine.init(width, height)
  render()
}

window.addEventListener('resize', () => {
  init()
})

init()