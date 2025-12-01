import { Enemy } from "./Enemy.js";
import {RectEnemy} from "./rect.js";
import {CircleEnemy} from "./circle.js";
import {TriEnemy} from "./triangle.js";


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
            return new CircleEnemy(startX, startY, this.pathdata);
        }
        
        else if (this.circleE > 0) {
            this.circleE--;
            console.log("Spawn: Circle");
            return new CircleEnemy(startX, startY, this.pathdata);
        }
        else if (this.triE > 0) {
            this.triE--;
            console.log("Spawn: Triangle");
            return new TriEnemy(startX, startY, this.pathdata);
        }
        else if (this.rectE > 0) {
            this.rectE--;
            console.log("Spawn: Rectangle");
            return new RectEnemy(startX, startY, this.pathdata);
        }
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