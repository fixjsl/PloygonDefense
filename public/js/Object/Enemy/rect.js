import { Enemy } from "./Enemy.js";


export class RectEnemy extends Enemy{
    constructor(x,y,path){
        super(x,y);
        this.size = 20; // 원형 적의 반지름
        this.color = 'red'; // 원형 적의 색상
        this.path = path;
        this.hp = 500;
        this.attack = 15;
        this.movespeed = 0.5; // 애는 제일 빠름
    }

    update(){
        // 네모 적의 이동 로직 구현
        // 일정 속도로 목표지점까지 경로를 따라 이동
        // 부딪혔을떄 데미지를 주기 구현
        
    }

    draw(ctx){
        // 네모 적의 그리기 로직 구현
        
        drawRectCentered(ctx,this.x, this.y, this.size, this.size, this.color);
        
    }



}
function drawRectCentered(ctx, cx, cy, width, height, color) {
    // 캔버스 API의 rect 함수가 요구하는 왼쪽 위 꼭짓점 좌표 (sx, sy)를 계산합니다.
    const sx = cx - width / 2;
    const sy = cy - height / 2;

    // 스타일 설정
    ctx.fillStyle = color;

    // 캔버스 API의 rect 함수를 사용하여 경로를 정의합니다.
    ctx.beginPath();
    ctx.rect(sx, sy, width, height);
    
    // 채우기
    ctx.fill();
}