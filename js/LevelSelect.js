import PM from "./PageManager.js"
import StartP from "./StartPage.js"


class LevelSelect{



    constructor(){
        this.page
        this.level = 1
    }

    Init(){
        const SelectPage = document.createElement('div')

        const HomeButton = document.createElement('button')
        const LeftButton = document.createElement('button')
        const RightButton = document.createElement('button')

        const LevelStartButton = document.createElement('button')

        LevelStartButton.textContent = 'Level' + this.level


        HomeButton.addEventListener('click',()=>{
            PM.changePage(this.page,StartP)
        })

        LeftButton.addEventListener('click',()=>{
            this.level -=1
            this.NextLevel()

        })
        RightButton.addEventListener('click',()=>{
            this.level +=1
            this.NextLevel()
        })

        SelectPage.append(HomeButton,LeftButton, LevelStartButton,RightButton)

        document.body.appendChild(SelectPage)

        this.page = SelectPage

        this.CloseScreen()
    }

    StartScreen(){
        page.style.display = 'flex'
    }

    CloseScreen(){
        page.style.display = 'none'
    }
    NextLevel(){
        LevelStartButton.textContent = 'Level' + this.level
    }
}

const Levelp = new LevelSelect();
export default Levelp