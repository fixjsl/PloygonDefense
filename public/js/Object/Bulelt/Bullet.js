import { Object } from "../Object.js";


export class Bullet extends Object{
    constructor(x,y){
        this.speed
        this.damage
        this.size
        this.direction
        this.tag = "Bullet"
        super(x,y);
    }
    update(){

    }
    draw(){
    }
    handleCollision(){
           this.Dead();
    }
    Dead(){
        //총알 삭제 처리
    }
}