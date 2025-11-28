import { Enemy } from "./Enemy.js";


export class EnemyGenerator{

    constructor(gameEngine){
        this.gameEngine = gameEngine;
        this.spawnInterval = 2000; // 적 생성 간격 (밀리초)
        this.lastSpawnTime = 0;

        this.x;
        this.y;

        this.wavedata = [];
    }

    SpawnWave(){
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            // 새로운 적 생성
            const enemy = this.createEnemy();
            this.gameEngine.enemies.push(enemy);
    }
        this.lastSpawnTime = currentTime;
}
    createEnemy(){
        // 적 생성 로직 구현

    }
    Wavedataclear(){
        this.wavedata = [];
    }
}