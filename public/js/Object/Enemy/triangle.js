import { Enemy } from "./Enemy.js";
import {drawEquilateralTriangle} from "../drawPolygon.js";

export class TriEnemy extends Enemy{
    constructor(x,y,path){
        super(x,y);
        this.size = 20; // 원형 적의 반지름
        this.color = 'red'; // 원형 적의 색상
        this.path = path;
        this.hp = 150;
        this.attack = 10;
        this.movespeed = 1; // 애는 제일 빠름

        this.bounty = 15;
    }

    update(){
        super.update();
    }

    draw(ctx){
        // 원형 적의 그리기 로직 구현
     drawEquilateralTriangle(ctx,this.x, this.y, this.size, this.color, Math.PI / 2);
    }



}

