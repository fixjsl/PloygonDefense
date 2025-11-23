import { GameEngine } from "./GameLoop.js"



class GamePage{



    constructor(){
        this.page
        this.map = new GameEngine
    }

    LevelStart(level){
        this.map.mapdraw(level)
    }

    StartScreen(){
        page.style.display = 'flex'
    }

    CloseScreen(){
        page.style.display = 'none'
    }
}

const GameP = new GamePage()
export default EditorP