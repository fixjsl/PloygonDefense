import { Enemy } from "./Enemy.js";
import { drawRectCentered } from "../drawPolygon.js";

export class RectEnemy extends Enemy{
    constructor(x,y,path){
        super(x,y);
        this.size = 20; // 원형 적의 반지름
        this.color = 'red'; // 원형 적의 색상
        this.path = path;
        this.hp = 500;
        this.attack = 15;
        this.movespeed = 0.5; 

        this.bounty = 25;
    }

    update(){
        super.update();
        
    }

    draw(ctx){
        // 네모 적의 그리기 로직 구현
        
        drawRectCentered(ctx,this.x, this.y, this.size, this.size, this.color);
        
    }



}
