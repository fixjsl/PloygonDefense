import { Object } from "../Object.js";
import { drawRectCentered } from "../drawPolygon.js";


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
        this.isdead = false;
    }


    draw(ctx){
        // 바리케이드 그리기 로직 구현
        drawRectCentered(ctx,this.x, this.y, this.sizex, this.sizey, this.color1);
        drawRectCentered(ctx,this.x,this.y+10,this.sizex,this.sizey/4,this.color2);
        drawRectCentered(ctx,this.x,this.y-10,this.sizex,this.sizey/4,this.color2);
    }
    handleCollision(enemy){
        this.hp -= enemy.attack;
        this.Dead();
    }
    Dead(){
        if(this.hp <= 0){
            //죽음 처리
            this.isdead = true;
        }
    }
}
