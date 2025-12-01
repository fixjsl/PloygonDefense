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

        const targetWaypoint = this.path[this.currentPathIndex];

        const dx = targetWaypoint.x - this.x;
        const dy = targetWaypoint.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy); 

        const threshold = this.movespeed; 

        if (distance < threshold) {
           
            this.x = targetWaypoint.x; 
            this.y = targetWaypoint.y; 
            this.currentPathIndex++;
            return; 
            
        } else {

            const directionX = dx / distance;
            const directionY = dy / distance;

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
    }
    Dead(){
        if(this.hp <= 0){
            //죽음 처리
            this.isDead = true;
        }
    }
}