import Color from '@/libs/color'
import rendererEngine from '@/rendererEngine'
import font from './font.json'
import { Char } from './types'

class UserInterface {
    allCharacters: string

    constructor() {
        this.allCharacters = ''
        for (let charCode = 33; charCode < 127; ++charCode) {
            if (charCode % 32 === 0) {
                this.allCharacters += ' '
            }
            this.allCharacters += String.fromCharCode(charCode)
        }
    }

    drawLetter(inputChar: Char, posX: number, posY: number, color: Color) {
        if (!this.allCharacters.includes(inputChar)) {
            throw Error('UI: not allowed letter')
        }
        const char = font.glyphs[inputChar]
        const offsetY = 7 - char.pixels.length

        for (let y = 0; y < char.pixels.length; y++) {
            for (let x = 0; x < char.pixels[y].length; x++) {
                if (char.pixels[y][x] === 0) continue
                rendererEngine.drawPixel(posX + x, posY + y + offsetY, color)
            }
        }
    }

    text(text: string, x: number, y: number, color: Color) {
        for (let i = 0; i < text.length; i++) {
            this.drawLetter(text[i] as Char, x + 6 * i, y, color)
        }
    }
}

const userInterface = new UserInterface()
export default userInterface
