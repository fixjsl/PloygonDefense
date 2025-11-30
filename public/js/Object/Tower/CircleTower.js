import { Tower } from "./Tower.js";

export class CircleTower extends Tower{
    constructor(x,y){
        super(x,y);
        this.attack = 15;
        this.range = 100;
        this.fireRate = 1000; // 밀리초 단위
        this.size = 15;
        this.goldCost = 20;
        this.tag = "CircleTower";
    }

    update(){  
        // 원형 타워의 공격 로직 구현
    }
    draw(ctx){
        // 원형 타워의 그리기 로직 구현
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}