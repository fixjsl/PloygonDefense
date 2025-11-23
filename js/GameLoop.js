
export class GameEngine{

    constructor(){
        this.canvas 
        this.ctx
        // 게임 상태 관련 변수들도 모두 인스턴스 속성으로 정의
        this.CELL_SIZE = 40;
        this.MAP_WIDTH = 35; 
        this.MAP_HEIGHT = 18; 

        this.enemies = [];
        this.projectiles = [];
        this.towers = []; 
        
        this.gameSpeed = 1;
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

mapdataPaser(level){
    //JSON파일 파싱
}

mapdraw(level){
    mapdata = this.mapdataPaser(level)

    const mapcode = mapdata.mapcode
}


}



