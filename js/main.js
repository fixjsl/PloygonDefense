const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기를 1400x720으로 설정
canvas.width = 1400;
canvas.height = 720;

// 새로운 그리드 크기 정의
const CELL_SIZE = 40;
const MAP_WIDTH = 35;  // 1400 / 40
const MAP_HEIGHT = 18; // 720 / 40

let enemies = [];
let projectiles = [];
let Towers = [];

//map data

//mainloop

function mainLoop() {
    
}