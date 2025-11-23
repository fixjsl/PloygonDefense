import { GameEngine } from "./GameLoop.js"
import { GameUI } from "./GameUI.js"


class GamePage{



    constructor(){
        this.page
        this.map = new GameEngine()
        this.UI = new GameUI()
    }
    Init(){
        this.map.Init()
        this.UI.Init()
    }

    LevelStart(level){
        this.map.mapdraw(level)
    }

    StartScreen(){
        page.style.display = 'flex'
        this.map.mainLoop()
    }

    CloseScreen(){
        page.style.display = 'none'
    }
}

const GameP = new GamePage()
export default GameP