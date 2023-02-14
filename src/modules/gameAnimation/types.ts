export interface IAnimationFrame {
    duration: number
    tileid: number
}

export interface IAnimation {
    animation: IAnimationFrame[]
    class: string
    id: number
}

export interface IAnimationFile {
    columns: number
    editorsettings: {
        export: {
            format: string
            target: string
        }
    }
    image: string
    imageheight: number
    imagewidth: number
    margin: number
    name: string
    spacing: number
    tilecount: number
    tiledversion: '1.9.2'
    tilewidth: number
    tileheight: number
    type: 'tileset'
    version: '1.9'
    tiles: IAnimation[]
}
