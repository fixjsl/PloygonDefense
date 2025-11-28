import e from "express";
import { EnemyGenerator } from "./EnemyGenerator.js";


export class GameEngine{

    constructor(){
        this.canvas 
        this.ctx
        // 게임 상태 관련 변수들도 모두 인스턴스 속성으로 정의
        this.CELL_SIZE = 40;
        this.MAP_WIDTH = 35; 
        this.MAP_HEIGHT = 18; 

        this.enemyGenerator = new EnemyGenerator(this);
        this.enemies = [];
        this.projectiles = [];
        this.towers = []; 
        this.barricades = [];

        this.gameSpeed = 1;
        this.Target = {
            x: null,
            y: null,
            hp : null
        }
    }
 


//map data

 Init(){

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'gameCanvas';
        document.body.appendChild(this.canvas);
        
        // 컨텍스트 할당 (this.ctx 사용)
        this.ctx = this.canvas.getContext('2d');

        // 캔버스 크기 설정 (인스턴스 속성을 사용하여 설정)
        this.canvas.width = 1400;
        this.canvas.height = 720;
        
        // 캔버스 배경 설정
        this.ctx.fillStyle = '#fcfcfcff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);      

        this.canvas.style.display = 'none'

}

//mainloop

 mainLoop() {

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.enemies.forEach(enemy => enemy.update())
    this.towers.forEach(tower => tower.update())
    this.projectiles.forEach(pro => pro.update())

    this.enemies.forEach(enemy => enemy.draw(ctx))
    this.towers.forEach(tower => tower.draw(ctx))
    this.projectiles.forEach(pro => pro.draw(ctx))

    requestAnimationFrame(mainLoop)
}


ColiderCheck(){
    //충돌체크
    const n = enemies.length
    for(let i =0; i<n;i++){
        const enemy = enemies[i]
        for(let j =0; j<projectiles.length;j++){
            const objB = projectiles[j];
            // 2. 두 오브젝트의 충돌체 인스턴스를 가져옵니다.
            const colliderA = enemy.collider;
            const colliderB = objB.collider;
            if (colliderA.isColliding(colliderB)) {
                // A가 B와의 충돌을 처리
                if (enemy.handleCollision) {
                    enemy.handleCollision(objB);
                }
                // B가 A와의 충돌을 처리
                if (objB.handleCollision) {
                    objB.handleCollision();
                }
            }
        }
        for(let k =0; k<barricades.length;k++){
            const objC = barricades[k];
            const colliderA = enemy.collider;
            const colliderB = objC.collider;
            if (colliderA.isColliding(colliderB)) {
                // A가 B와의 충돌을 처리
                if (enemy.handleCollision) {
                    enemy.handleCollision(objC);
                }
                // B가 A와의 충돌을 처리
                if (objC.handleCollision) {
                    objC.handleCollision(objA);
                }
            }
        }

    }
}
mapdataPaser(level){
    //JSON파일 파싱
}

mapInit(level){
    const mapdata = this.mapdataPaser(level)
    //target hp 설정
}

mapdraw(mapdata){
    const mapcode = mapdata.mapcode
    //맵 그리기
    //0 : 길 1 : 타워설치 가능 2 : 설치불가 -1 : 몬스터 스폰 3 : 타겟(x, y설정)
}

waveStart(){

}


}
