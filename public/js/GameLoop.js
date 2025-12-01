import { EnemyGenerator } from "./Object/Enemy/EnemyGenerator.js";


export class GameEngine{

    constructor(){
        this.canvas 
        this.ctx
        // 게임 상태 관련 변수들도 모두 인스턴스 속성으로 정의
        this.CELL_SIZEx ;
        this.CELL_SIZEy
        this.MAP_WIDTH ; 
        this.MAP_HEIGHT; 

        this.mapdata

        this.enemyGenerator ;
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
        this.LevelClear = false;

        this.playerMoney;
        this.mapbuffercanvas;
    }
 


//map data

 Init(){

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'gameCanvas';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 1400;
        this.canvas.height = 720;
        
        this.ctx.fillStyle = '#fcfcfcff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);      

        this.canvas.style.display = 'none'

}

//mainloop

 mainLoop = ()=> {
    if (this.LevelClear) {
        return; 
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.mapBufferCanvas, 0, 0);

    this.enemyGenerator.SpawnWave()
        const deadEnemies = this.enemies.filter(enemy => enemy.isDead);
        
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        this.barricades = this.barricades.filter(bar => !bar.isdead);
        this.projectiles = this.projectiles.filter(pro => !pro.isDead);
        
        if (deadEnemies.length > 0) {
             const earnedMoney = deadEnemies.reduce((sum, enemy) => sum + (enemy.bounty || 0), 0);
             this.playerMoney += earnedMoney;
        }
    this.enemies.forEach(enemy => enemy.update())
    this.towers.forEach(tower => tower.update())
    this.projectiles.forEach(pro => pro.update())

    this.ColiderCheck()

    this.enemies.forEach(enemy => enemy.draw(this.ctx))
    this.towers.forEach(tower => tower.draw(this.ctx))
    this.projectiles.forEach(pro => pro.draw(this.ctx))

    requestAnimationFrame(this.mainLoop)
}


ColiderCheck(){
    const n = this.enemies.length
    for(let i =0; i<n;i++){
        const enemy = this.enemies[i]
        for(let j =0; j<this.projectiles.length;j++){
            const objB = this.projectiles[j];
            
            const colliderA = enemy.collider;
            const colliderB = objB.collider;
            if (colliderA.isColliding(colliderB)) {
                if (enemy.handleCollision) {
                    enemy.handleCollision(objB);
                }
                if (objB.handleCollision) {
                    objB.handleCollision();
                }
            }
        }
        for(let k =0; k<this.barricades.length;k++){
            const objC = this.barricades[k];
            const colliderA = enemy.collider;
            const colliderB = objC.collider;
            if (colliderA.isColliding(colliderB)) {
                
                if (enemy.handleCollision) {
                    enemy.handleCollision(objC);
                }
                
                if (objC.handleCollision) {
                    objC.handleCollision(objA);
                }
            }
        }

    }
}


async mapInit(level){
    try{
            const response = await fetch(`/api/levels/${level}`)
    if (!response.ok) {
        throw new Error(`Failed to load level ${level}. Status: ${response.status}`);
    }
    this.mapdata = await response.json()
    console.log(mapdata)
    this.MAP_HEIGHT = mapdata.gridY;
    this.MAP_WIDTH = mapdata.gridX;
    this.CELL_SIZEx = this.canvas.width / this.MAP_WIDTH
    this.CELL_SIZEy =  this.canvas.height / this.MAP_HEIGHT;
    this.playerMoney = mapdata.startMoney

    this.Target.hp = mapdata.baseHp


    const pathdata = this.ConvertPath(this.mapdata.pathData)
    this.enemyGenerator = new EnemyGenerator(this, this.mapdata, pathdata);
    this.mapBufferCanvas = document.createElement('canvas');
    this.mapBufferCanvas.width = this.canvas.width;
    this.mapBufferCanvas.height = this.canvas.height;

    this.mapdraw(this.mapdata);
    }
    catch(err){
        console.error(`Error loading level ${level}:`, err);
    }




}
ConvertPath(pathdata){
    const path = pathdata.map(point => ({
        x: point.x * this.CELL_SIZEx + this.CELL_SIZEx / 2,
        y: point.y * this.CELL_SIZEy + this.CELL_SIZEy / 2
    }));
    return path;
}
mapdraw(mapdata){
    const mapcode = mapdata.mapCode
    const ctx = this.mapBufferCanvas.getContext('2d');
    //맵 그리기
    //0 : 길 1 : 타워설치 가능 2 : 설치불가 -1 : 몬스터 스폰 3 : 타겟(x, y설정)
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i =0; i< this.MAP_HEIGHT;i++){
        for(let j =0; j< this.MAP_WIDTH;j++){
            const cell = mapcode[i][j]
            const x = j * this.CELL_SIZEx
            const y = i * this.CELL_SIZEy
                if (cell === 0) {
                    color = '#a0a0a0ff'; 
                } else if (cell === 1) {
                    color = '#00ff00ff'; 
                } else if (cell === 2) {
                    color = '#fcbffeff'; 
                } else if (cell === -1) {
                    color = '#0000ffff'; 
                } else if (cell === 3) {
                    color = '#ff0000ff'; 
                    this.Target.x = x + this.CELL_SIZEx / 2
                    this.Target.y = y + this.CELL_SIZEy / 2
                }
                
                ctx.fillStyle = color;
                ctx.fillRect(x, y, this.CELL_SIZEx, this.CELL_SIZEy);
}

    }
}

}
