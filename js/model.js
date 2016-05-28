function Ball (x, y) {
    this.x = x;
    this.y = y;

    this.radius = BALL_RADIUS;

    this.moving = false;
    this.movingCounter = 4;

}

var balls = [];

function generateBalls() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    balls[i] = new Ball(Math.random()*(POOL_WIDTH-2*BALL_RADIUS)+BALL_RADIUS+POOL_CORNER_X, Math.random()*(POOL_HEIGHT-2*BALL_RADIUS)+BALL_RADIUS+POOL_CORNER_Y)
  }
}

function checkBoxCollision(ball0, ball1) {
  return collidesBoxX(ball0, ball1) && collidesBoxY(ball0, ball1);
}

function collidesBoxX(ball0, ball1) {
  return (ball0.x <= ball1.x + BALL_RADIUS*2 && ball0.x >= ball1.x - BALL_RADIUS*2)
}

function collidesBoxY(ball0, ball1) {
  return (ball0.y <= ball1.y + BALL_RADIUS*4 && ball0.y >= ball1.y - BALL_RADIUS*4)
}

function checkCircleCollision(ball0, ball1) {
  var dx = ball0.x - ball1.x;
  var dy = ball0.y - ball1.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < (ball0.radius+ball1.radius)) {
    return ball0.radius+ball1.radius - distance;
  }
  return false;
}

function handleCollision(ball0, ball1, distance, isPlayer) {
  if ((ball0.moving || (!ball0.moving && !ball1.moving)) && !isPlayer) {
    if (ball1.x < ball0.x) {
      ball1.x -= distance;
    } else {
      ball1.x += distance;
    }
    if (ball1.y < ball0.y) {
      ball1.y -= distance;
    } else {
      ball1.y += distance;
    }
    ball1.moving = true;
    ball1.movingCounter = MOVING_COUNTER_STARTVALUE;
    ball0.moving = false;
    ball0.movingCounter = 0;
  } else {
    if (ball0.x < ball1.x) {
      ball0.x -= distance;
    } else {
      ball0.x += distance;
    }
    if (ball0.y < ball1.y) {
      ball0.y -= distance;
    } else {
      ball0.y += distance;
    }
    ball1.moving = false;
    ball1.movingCounter = 0;
    ball0.moving = true;
    ball1.movingCounter = MOVING_COUNTER_STARTVALUE;
  }
}

function checkPlayerAtObservatory(player) {
  return (player.x >= OBSERVATORY_X && player.x <= OBSERVATORY_X + 20 && player.y <= POOL_CORNER_Y && player.y + 20 >= POOL_CORNER_Y - 40);
}

function handleWallCollision(ball) {
  if (ball.x - BALL_RADIUS< POOL_CORNER_X) {
    ball.x = POOL_CORNER_X + BALL_RADIUS;
    ball.moving = true;
    ball.movingCounter = MOVING_COUNTER_STARTVALUE;
  } else if (ball.x + BALL_RADIUS > POOL_CORNER_X + POOL_WIDTH) {
    ball.x = POOL_CORNER_X + POOL_WIDTH - BALL_RADIUS;
    ball.moving = true;
    ball.movingCounter = MOVING_COUNTER_STARTVALUE;
  }
  if (ball.y - BALL_RADIUS < POOL_CORNER_Y) {
    ball.y = POOL_CORNER_Y + BALL_RADIUS;
    ball.moving = true;
    ball.movingCounter = MOVING_COUNTER_STARTVALUE;
  } else if (ball.y + BALL_RADIUS > POOL_CORNER_Y + POOL_HEIGHT) {
    ball.y = POOL_CORNER_Y + POOL_HEIGHT - BALL_RADIUS;
    ball.moving = true;
    ball.movingCounter = MOVING_COUNTER_STARTVALUE;
  }

}
