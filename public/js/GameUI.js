import GameP from "./GamePage.js";



export class GameUI{
    constructor(){

    }

    Init(){
        //Draw UI Button
        //Pause Button
        //Retry Button
        //Resume Button
        //Select Button
        //Speed Button
        const speed = document.createElement('button')
        speed.addEventListener('click',()=>{
            GameP.map.speed += 1
            if (GameP.map.speed >3 ){
                speed = 1
            }
        })
    }
}