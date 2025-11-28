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
    }

    update(){
        // 원형 적의 이동 로직 구현
        // 일정 속도로 목표지점까지 경로를 따라 이동
        // 부딪혔을떄 데미지를 주기 구현

    }

    draw(ctx){
        // 원형 적의 그리기 로직 구현
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }



}