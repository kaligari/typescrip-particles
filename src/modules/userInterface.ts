import Game from "./game";
import font from '../assets/font.json'
import Color from "./color";

type Char = '!'|'"'|'#'|'$'|'%'|'&'|'\''|'('|')'|'*'|'+'|','|'-'|'.'|'/'
|'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|':'|';'|'<'|'='|'>'|'?'|'@'|'A'
|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'
|'T'|'U'|'V'|'W'|'X'|'Y'|'Z'|'['|'\\'|']'|'^'|'_'|'`'|'a'|'b'|'c'|'d'|'e'
|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'
|'x'|'y'|'z'|'{'|'\|'|'}'|'~'

export default class UserInterface {
    game: Game
    allCharacters: string

    constructor(game: Game) {
        this.game = game
        console.log(font);
        this.allCharacters = "";
        for (let charCode = 33; charCode < 127; ++charCode) {
            if (charCode % 32 === 0) {
                this.allCharacters += " ";
            }
            this.allCharacters += String.fromCharCode(charCode);
        }
        console.log(this.allCharacters);
    }

    drawLetter(inputChar: Char, posX: number, posY: number, color: Color) {
        if(!this.allCharacters.includes(inputChar)) {
            throw Error('UI: not allowed letter')
        }
        const char = font.glyphs[inputChar]
        const offsetY = 7 - char.pixels.length
        
        for(let y = 0; y < char.pixels.length; y++) {
            for(let x = 0; x < char.pixels[y].length; x++) {
                if(char.pixels[y][x] === 0) continue
                this.game.rendererEngine.drawPixel(posX + x, posY + y + offsetY, color)
            }
        }
    }
    
    text(text: string, x: number, y: number, color: Color) {
        for(let i = 0; i < text.length; i++) {
            this.drawLetter(text[i] as Char, x + (6*i), y, color)
            // console.log(text[i]);
        }
        
        
        // const pixels = renderPixels(text, fonts.sevenPlus);
        // console.log(pixels);
    }
}