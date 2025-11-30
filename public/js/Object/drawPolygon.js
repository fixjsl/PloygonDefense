export function drawRectCentered(ctx, cx, cy, width, height, color) {
    // 캔버스 API의 rect 함수가 요구하는 왼쪽 위 꼭짓점 좌표 (sx, sy)를 계산합니다.
    const sx = cx - width / 2;
    const sy = cy - height / 2;

    // 스타일 설정
    ctx.fillStyle = color;

    // 캔버스 API의 rect 함수를 사용하여 경로를 정의합니다.
    ctx.beginPath();
    ctx.rect(sx, sy, width, height);
    
    // 채우기
    ctx.fill();
}

export function drawEquilateralTriangle(ctx, cx, cy, size, color, rotationRad = 0) {
    // 1. 세 꼭짓점을 계산
    const R = size; // 중심에서 꼭짓점까지의 거리
    const angleOffset = Math.PI / 2 + rotationRad; // 위를 향하도록 90도(PI/2) 오프셋 적용

    // 120도(2*PI/3) 간격으로 세 점의 좌표를 계산
    const points = [];
    for (let i = 0; i < 3; i++) {
        const angle = angleOffset + (i * 2 * Math.PI) / 3;
        const x = cx + R * Math.cos(angle);
        const y = cy + R * Math.sin(angle);
        points.push({ x, y });
    }

    // 2. 경로 정의 (이전 함수와 동일)
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();

    // 3. 렌더링
    ctx.fillStyle = color;
    ctx.fill();
}