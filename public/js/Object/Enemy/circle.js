import { Enemy } from "./Enemy.js";


export class CircleEnemy extends Enemy{
    constructor(x,y,path){
        super(x,y);
        this.size = 20; // 원형 적의 반지름
        this.color = 'red'; // 원형 적의 색상
        this.path = path;
        this.hp = 50;
        this.attack = 5;
        this.movespeed = 2; // 애는 제일 빠름

        this.bounty = 5;
    }

    update(){
        super.update();
    }

    draw(ctx){
        // 원형 적의 그리기 로직 구현
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }



}