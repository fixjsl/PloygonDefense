import e from "express";
import { Object } from "../Object.js";


export class Enemy extends Object{
    constructor(x,y){
        super(x,y);

        this.attack
        this.movespeed
        this.hp
        this.size

        this.path = null
        this.currentPathIndex = 0;
        this.tag = "Enemy"

        this.prevx = this.x;
        this.prevy = this.y;

        this.isDead = false;
        this.bounty = 10;
        
    }

    update(){
        this.prevx = this.x;
        this.prevy = this.y;
        if (this.currentPathIndex >= this.path.length) {
            this.handleGoalReached(); 
            return;
        }


        // 일정 속도로 목표지점까지 경로를 따라 이동
        const targetWaypoint = this.path[this.currentPathIndex];

        // 2. 벡터 계산 (대각선 이동을 위해 필수)
        const dx = targetWaypoint.x - this.x;
        const dy = targetWaypoint.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // 현재 위치와 목표 지점의 거리

        const threshold = this.movespeed; 

        // 3. 목표 지점 도착 확인 및 인덱스 증가 (단 한 번만)
        if (distance < threshold) {
            // 오차 보정 후 다음 웨이포인트로 이동
            this.x = targetWaypoint.x; 
            this.y = targetWaypoint.y; 
            this.currentPathIndex++;
            return; // 다음 프레임에 새로운 목표를 계산하도록 여기서 종료
            
        } else {
            // 4. 목표를 향해 정규화된 벡터로 이동
            
            // 방향 벡터 정규화: (dx/distance, dy/distance)
            const directionX = dx / distance;
            const directionY = dy / distance;

            // movespeed 만큼 이동
            this.x += directionX * this.movespeed;
            this.y += directionY * this.movespeed;
        }   

        
    }

    draw(){
        
    }
    handleCollision(enemy){
        if(enemy.tag === "Bullet"){
            this.hp -= enemy.damage;
            this.Dead();
        }
        else{
            //이전 위치로 돌아가기
            this.x = this.prevx;
            this.y = this.prevy;
        }
    }
    handleGoalReached(){
        // 적이 목표 지점에 도달했을 때 처리 로직 구현
    }
    Dead(){
        if(this.hp <= 0){
            //죽음 처리
            this.isDead = true;
        }
    }
}