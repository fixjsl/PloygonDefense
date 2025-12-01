import { Object } from "../Object.js";


export class Bullet extends Object{
    constructor(x,y,damage,direction){
        super(x,y);
        this.speed
        this.damage
        this.size = 5
        this.direction
        this.color = 'black'
        this.tag = "Bullet"
        this.isDead = false
    }
    update(){
        //목표까지 이동
        const targetx = this.direction.x
        const targety = this.direction.y

        const dx = targetx - this.x
        const dy = targety - this.y
        const distance = Math.sqrt(dx*dx + dy*dy)

        if(distance < this.speed){
            this.x = targetx
            this.y = targety
        }
        else{
            const directionX = dx / distance;
            const directionY = dy / distance;

            this.x += directionX * this.speed;
            this.y += directionY * this.speed;
        }

    }
    draw(ctx){
        //원형 그리기
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fill()
    }
    handleCollision(){
           this.Dead();
    }
    Dead(){
        //총알 삭제 처리
        this.isDead = true
    }
}