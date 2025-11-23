
import Levelp from "./LevelSelect.js";
import EditorP from "./MapEditor.js";
import PM from "./PageManager.js";

class StartPage{
    
constructor(){
    this.Page
}

Init(){

    const StartPage = document.createElement('div');

    const Title = document.createElement('h1');
    Title.textContent = 'Ploygon Defense'

    const StartButton = document.createElement('button');
    StartButton.textContent = 'Start'
    const EditorButton = document.createElement('button')
    EditorButton.textContent = 'MapEditor'
    StartPage.id = 'startPage'

    StartButton.className = 'startPagebutton'
    EditorButton.className = 'startPagebutton'

    
    StartButton.addEventListener('click',()=>{
        PM.changePage(StartP,Levelp)
    })
    EditorButton.addEventListener('click',()=>{
        PM.changePage(StartP.EditorP);
    })

    StartPage.append(
        Title,
        StartButton,
        EditorButton
    )
    
    document.body.appendChild(StartPage)
    this.Page = StartPage
}

StartScreen(){
    this.Page.style.display = 'flex'
}

CloseScreen(){
    this.Page.style.display = 'none'
}
}

const StartP = new StartPage()

export default StartP;


