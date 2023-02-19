export interface ITiledFileFrame {
    duration: number
    tileid: number
}

export interface ITiledFileProperty {
    name: string
    type: string
    value: boolean | string
}
export interface ITiledFileTile {
    animation: ITiledFileFrame[]
    class: string
    id: number
    properties?: ITiledFileProperty[]
}

export interface ITiledFileEditorSettings {
    export: {
        format: string
        target: string
    }
}
export interface ITiledFileTileset {
    columns: number
    editorsettings: ITiledFileEditorSettings
    image: string
    imageheight: number
    imagewidth: number
    margin: number
    name: string
    spacing: number
    tilecount: number
    tiledversion: string
    tilewidth: number
    tileheight: number
    type: 'tileset'
    version: '1.9'
    tiles: ITiledFileTile[]
}

export interface ITiledFileMapLayersFile {
    data: number[]
    height: number
    id: number
    name: string
    opacity: number
    type: string
    visible: boolean
    width: number
    x: number
    y: number
}

export interface ITiledFileTilesets {
    firstgid: number
    source: string
}
export interface ITiledFileMapFile {
    compressionlevel: number
    editorsettings: ITiledFileEditorSettings
    height: number
    infinite: boolean
    layers: ITiledFileMapLayersFile[]
    nextlayerid: number
    nextobjectid: number
    orientation: string
    renderorder: string
    tiledversion: string
    tileheight: number
    tilesets: ITiledFileTilesets[]
    tilewidth: number
    type: 'map'
    version: '1.9'
    width: number
}
