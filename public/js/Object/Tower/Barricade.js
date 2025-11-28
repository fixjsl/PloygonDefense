import { Object } from "../Object.js";


export class Barricade extends Object{
    constructor(x,y){
        super(x,y);
        this.sizex= 20;
        this.sizey= 40;
        this.hp = 200;
        this.color1 = 'brown';
        this.color2 = 'yellow';
        this.GoldCost = 30;
        this.tag = "Barricade";
    }



    update(){

    }


    draw(ctx){

    }
    handleCollision(enemy){
        this.hp -= enemy.attack;
        this.Dead();
    }
    Dead(){
        if(this.hp <= 0){
            //죽음 처리
        }
    }
}
