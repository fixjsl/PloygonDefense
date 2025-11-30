import  StartP  from "./StartPage.js";
import EditorP from "./MapEditor.js";
import Levelp from "./LevelSelect.js";
import GameP from "./GamePage.js";


addEventListener('DOMContentLoaded', ()=>{
    StartP.Init()
    console.log("StartPage Initialized")
    EditorP.Init()
    console.log("MapEditor Initialized")
    Levelp.Init()
    console.log("LevelSelect Initialized")
    GameP.Init()
    console.log("GamePage Initialized")
})


