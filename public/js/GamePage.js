import { GameEngine } from "./GameLoop.js"
import { GameUI } from "./GameUI.js"


class GamePage{



    constructor(){
        this.map = new GameEngine()
        this.UI = new GameUI()
    }
    Init(){
        this.map.Init()
        this.UI.Init()
    }

    LevelStart(level){
        this.map.mapInit(level)
        this.map.mainLoop()
    }

    StartScreen(){
        this.map.canvas.style.display = 'flex'
        this.UI.canvas.style.display = 'flex'
    }

    CloseScreen(){
        this.map.canvas.style.display = 'none'
        this.UI.canvas.style.display = 'none'
    }
}

const GameP = new GamePage()
export default GameP