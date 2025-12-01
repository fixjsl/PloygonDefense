import GameP from "./GamePage.js";



export class GameUI{
    constructor(){
        this.UI
    }

    Init(){
        //Draw UI Button
        const Uicanvas = document.createElement('div')
        //Pause Button
        const pause = document.createElement('button')
        //Retry Button
        const retry = document.createElement('button')
        //Resume Button
        const resume = document.createElement('button')
        //Speed Button
        const speed = document.createElement('button')
        speed.addEventListener('click',()=>{
            GameP.map.speed += 1
            if (GameP.map.speed >3 ){
                speed = 1
            }
        })
        this.UI = Uicanvas
        document.body.appendChild(this.UI)
        this.UI.id = 'GameUI'
        this.UI.style.display = 'none'
    }
}