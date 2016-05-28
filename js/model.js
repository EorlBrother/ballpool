function Ball (x, y, color) {
    this.x = x;
    this.y = y;

    this.color = color;

}

var balls = [];

function generateBalls() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    balls[i] = new Ball(Math.random()*(POOL_WIDTH-2*BALL_RADIUS)+BALL_RADIUS, Math.random()*(POOL_HEIGHT-2*BALL_RADIUS)+BALL_RADIUS, COLORS[Math.floor(Math.random()*COLORS_SIZE)])
  }
}
