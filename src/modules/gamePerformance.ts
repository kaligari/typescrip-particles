import { round } from '@/helpers/math'

class GamePerformance {
    marks: string[]

    constructor() {
        this.clear()
        this.marks = []
    }

    clear() {
        performance.clearMarks()
        performance.clearMeasures()
        this.marks = []
    }

    addMark(name: string) {
        performance.mark(name)
        this.marks.push(name)
    }

    mesure() {
        performance.measure('gamel loop')
    }

    get calcMarks() {
        let output = ''
        for (let i = 1; i < this.marks.length; i++) {
            const { duration } = performance.measure('measure', this.marks[i - 1], this.marks[i])
            const calcMeasure = duration * 10
            output += `${this.marks[i - 1]}: ${round(calcMeasure)}<br />`
        }
        output += '-------------------<br />'
        const { duration } = performance.measure(
            'measure',
            this.marks[0],
            this.marks[this.marks.length],
        )
        output += `Total: ${round(duration * 10)}`
        return output
    }
}
const gamePerformance = new GamePerformance()
export default gamePerformance
