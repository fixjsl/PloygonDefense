import { Enemy } from "./Enemy.js";


export class TriEnemy extends Enemy{
    constructor(x,y,path){
        super(x,y);
        this.size = 20; // 원형 적의 반지름
        this.color = 'red'; // 원형 적의 색상
        this.path = path;
        this.hp = 150;
        this.attack = 10;
        this.movespeed = 1; // 애는 제일 빠름
    }

    update(){
        // 원형 적의 이동 로직 구현
        // 일정 속도로 목표지점까지 경로를 따라 이동
        // 부딪혔을떄 데미지를 주기 구현
        
    }

    draw(ctx){
        // 원형 적의 그리기 로직 구현
     drawEquilateralTriangle(ctx,this.x, this.y, this.size, this.color, Math.PI / 2);
    }



}

function drawEquilateralTriangle(ctx, cx, cy, size, color, rotationRad = 0) {
    // 1. 세 꼭짓점을 계산
    const R = size; // 중심에서 꼭짓점까지의 거리
    const angleOffset = Math.PI / 2 + rotationRad; // 위를 향하도록 90도(PI/2) 오프셋 적용

    // 120도(2*PI/3) 간격으로 세 점의 좌표를 계산
    const points = [];
    for (let i = 0; i < 3; i++) {
        const angle = angleOffset + (i * 2 * Math.PI) / 3;
        const x = cx + R * Math.cos(angle);
        const y = cy + R * Math.sin(angle);
        points.push({ x, y });
    }

    // 2. 경로 정의 (이전 함수와 동일)
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();

    // 3. 렌더링
    ctx.fillStyle = color;
    ctx.fill();
}