function Ball (x, y, color) {
    this.x = x;
    this.y = y;

    this.radius = BALL_RADIUS;

    this.color = color;

    this.moving = false;

}

var balls = [];

function generateBalls() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    balls[i] = new Ball(Math.random()*(POOL_WIDTH-2*BALL_RADIUS)+BALL_RADIUS, Math.random()*(POOL_HEIGHT-2*BALL_RADIUS)+BALL_RADIUS, COLORS[Math.floor(Math.random()*COLORS_SIZE)])
  }
}

// function checkBoxCollision(ball0, ball1) {
//   return collidesBoxX(ball0, ball1) && collidesBoxY(ball0, ball1);
// }
//
// function collidesBoxX(ball0, ball1) {
//   return (ball0.x <= ball1.x + BALL_RADIUS*2 && ball0.x >= ball1.x - BALL_RADIUS*2)
// }
//
// function collidesBoxY(ball0, ball1) {
//   return (ball0.y <= ball1.y + BALL_RADIUS*2 && ball0.y >= ball1.y - BALL_RADIUS*2)
// }

function checkCircleCollision(ball0, ball1) {
  var dx = ball0.x - ball1.x;
  var dy = ball0.y - ball1.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (ball0.radius+ball1.radius);
}

function handleCollision(ball0, ball1) {
  if (ball0.moving || (!ball0.moving && !ball1.moving)) {
    if (ball1.x < ball0.x) {
      ball1.x -= BALL_RADIUS;
    } else {
      ball1.x += BALL_RADIUS;
    }
    if (ball1.y < ball0.y) {
      ball1.y -= BALL_RADIUS;
    } else {
      ball1.y += BALL_RADIUS;
    }
    ball1.moving = true;
    ball0.moving = false;
  } else {
    if (ball0.x < ball1.x) {
      ball0.x -= BALL_RADIUS;
    } else {
      ball0.x += BALL_RADIUS;
    }
    if (ball0.y < ball1.y) {
      ball0.y -= BALL_RADIUS;
    } else {
      ball0.y += BALL_RADIUS;
    }
    ball1.moving = false;
    ball0.moving = true;
  }
}
