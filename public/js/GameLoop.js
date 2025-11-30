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

 mainLoop = ()=> {
    if (this.LevelClear) {
        return; // 레벨 클리어 시 루프 종료
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.mapBufferCanvas, 0, 0);

    this.enemyGenerator.SpawnWave()
        const deadEnemies = this.enemies.filter(enemy => enemy.isDead);
        
        // 2. 배열 업데이트: isDead가 false인 몬스터만 남기고 제거
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        this.barricades = this.barricades.filter(bar => !bar.isdead);
        this.projectiles = this.projectiles.filter(pro => !pro.isDead);
        
        // 3. 보상 계산 및 지급
        if (deadEnemies.length > 0) {
             // deadEnemies 배열을 순회하며 moneyValue를 합산하여 보상 계산
             const earnedMoney = deadEnemies.reduce((sum, enemy) => sum + (enemy.bounty || 0), 0);
             this.playerMoney += earnedMoney;
             // 콘솔 로그로 확인 (나중에 UI에 표시해야 함)
             console.log(`몬스터 ${deadEnemies.length}마리 처치. +${earnedMoney} 획득. 현재 돈: ${this.playerMoney}`);
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
    //충돌체크
    const n = this.enemies.length
    for(let i =0; i<n;i++){
        const enemy = this.enemies[i]
        for(let j =0; j<this.projectiles.length;j++){
            const objB = this.projectiles[j];
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
        for(let k =0; k<this.barricades.length;k++){
            const objC = this.barricades[k];
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
    //target hp 설정
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
                    color = '#a0a0a0ff'; // 길
                } else if (cell === 1) {
                    color = '#00ff00ff'; // 타워설치 가능
                } else if (cell === 2) {
                    color = '#fcbffeff'; // 설치불가
                } else if (cell === -1) {
                    color = '#0000ffff'; // 몬스터 스폰
                    // 스폰 좌표는 몬스터 생성기가 처리하므로 여기서 별도 저장 불필요
                } else if (cell === 3) {
                    color = '#ff0000ff'; // 타겟
                    // 타겟의 중심 좌표를 설정
                    this.Target.x = x + this.CELL_SIZEx / 2
                    this.Target.y = y + this.CELL_SIZEy / 2
                }
                
                // 타일 색상 적용 및 그리기
                ctx.fillStyle = color;
                ctx.fillRect(x, y, this.CELL_SIZEx, this.CELL_SIZEy);
}

    }
}

}
