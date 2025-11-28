import PM from "./PageManager.js"
import StartP from "./StartPage.js"


class LevelSelect{



    constructor(){
        this.page
        this.maxlevel
        this.level = 1
    }

    Init(){
        const SelectPage = document.createElement('div')
        SelectPage.id = 'LevelSelectPage'
        const HomeButton = document.createElement('button')
        const LeftButton = document.createElement('button')
        const RightButton = document.createElement('button')

        const LevelStartButton = document.createElement('button')

        this.GetMaxlevel()

        LevelStartButton.textContent = 'Level' + this.level


        HomeButton.addEventListener('click',()=>{
            PM.changePage(Levelp,StartP)
        })

        LeftButton.addEventListener('click',()=>{
            if(this.level-1 >=1){
                this.level -=1
                this.NextLevel(LeftButton)
            }


        })
        RightButton.addEventListener('click',()=>{
            if(this.level+1 <=this.maxlevel){
                this.level +=1
                this.NextLevel(RightButton) 
            }

        })

        SelectPage.append(HomeButton,LeftButton, LevelStartButton,RightButton)

        document.body.appendChild(SelectPage)

        this.page = SelectPage

        this.page.style.display = 'none'
    }
    async GetMaxlevel(){
        try{
            const res = await fetch('http://127.0.0.1:52273/api/count/level')

            if(!res.ok){
                throw new Error('Connection Error')
            }

            const data = await res.json()

            maxlevel = data.Maxlevel
        }
        catch(err){
            console.error(err)
            this.maxlevel = 1
        }
        console.log(this.maxlevel)

    }

    StartScreen(){
        this.page.style.display = 'flex'
    }

    CloseScreen(){
        this.page.style.display = 'none'
    }
    NextLevel(button){
        button.textContent = 'Level' + this.level
    }
}

const Levelp = new LevelSelect();
export default Levelp