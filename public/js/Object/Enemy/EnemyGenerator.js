import { Enemy } from "./Enemy.js";
import {rect} from "./rect.js";
import {circle} from "./circle.js";
import {triangle} from "./triangle.js";


export class EnemyGenerator{

    constructor(gameEngine,mapdata,pathData){
        this.gameEngine = gameEngine;
        this.spawnInterval = 2000; // 적 생성 간격 (밀리초)
        this.lastSpawnTime = 0;

        this.wavedata = mapdata.WaveData;
        this.pathdata = pathData;
        this.currentWaveIndex = 0;
        this.circleE = 0;
        this.triE = 0;
        this.rectE = 0;
        this.isWaveActive = false;
    }

    SpawnWave(){
        if (!this.isWaveActive) return; // 이미 웨이브가 시작하지 않았다면

        if(this.circleE + this.triE + this.rectE <= 0){
                this.isWaveActive = false;
                return;
        }
        const currentTime = Date.now();
        if(this.circleE + this.triE + this.rectE > 0 && currentTime - this.lastSpawnTime >= this.spawnInterval){
                    
            // 새로운 적 생성
            const enemy = this.createEnemy();
            if (enemy) {
                this.gameEngine.enemies.push(enemy);
                this.lastSpawnTime = currentTime;
            } else {
                // 혹시라도 createEnemy가 null을 반환하면 다음 루프에서 다시 시도
                this.lastSpawnTime = currentTime;
            }

        }
        
    }
    createEnemy(){
        const startX = this.pathdata[0].x;
        const startY = this.pathdata[0].y;
        
  
        if (this.circleE > 0 && this.circleE % 5 === 0 && this.triE > 0) { 
            this.triE--;
            console.log("Spawn: Triangle (Mixed)");
            return new triangle(startX, startY, this.pathdata);
        }
        
        // 2. Circle 몬스터를 먼저 소진
        else if (this.circleE > 0) {
            this.circleE--;
            console.log("Spawn: Circle");
            return new circle(startX, startY, this.pathdata);
        }

        // 3. 남은 Triangle 몬스터 소진
        else if (this.triE > 0) {
            this.triE--;
            console.log("Spawn: Triangle");
            return new triangle(startX, startY, this.pathdata);
        }
        
        // 4. Rectangle 몬스터 소진 (가장 마지막 타입)
        else if (this.rectE > 0) {
            this.rectE--;
            console.log("Spawn: Rectangle");
            return new rect(startX, startY, this.pathdata);
        }

        // 모든 적이 소진되었을 경우 (SpawnWave에서 이미 처리되지만 안전을 위해)
        return null;
    }

    StartWave(){
        
        this.currentWaveIndex++;
        const waveKey = `wave${this.currentWaveIndex}`;
        const wave = this.waveData[waveKey];

        if (!wave) {
            console.log("All waves completed!");
            return;
        }

        this.circleE = wave.circle || 0;
        this.triE = wave.tri || 0;
        this.rectE = wave.rect || 0;
        this.isWaveActive = true;
        this.lastSpawnTime = Date.now();
    }
}