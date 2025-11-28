import { Object } from "../Object";


export class Enemy extends Object{
    constructor(x,y){
        this.attack
        this.movespeed
        this.hp
        this.size
        this.path
        this.tag = "Enemy"
        super(x,y);
    }

    update(){
        // 원형 적의 이동 로직 구현
        // 일정 속도로 목표지점까지 경로를 따라 이동
        // 부딪혔을떄 데미지를 주기 구현

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
        }
    }
    Dead(){
        if(this.hp <= 0){
            //죽음 처리
        }
    }
}