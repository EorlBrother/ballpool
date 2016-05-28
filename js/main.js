


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    render: render,
    update: update
  },
  false, false);


function preload() {
  game.load.image('ball', 'assets/sprites/ball.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#000000'; //'#f46f0a';
  generateBalls();
  createBallSprites();
}


function render() {
}



function update() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    for (var j = i+1; j<BALL_AMOUNT; j++) {
      if(checkCircleCollision(balls[i], balls[j])) {
        handleCollision(balls[i], balls[j]);
      }
    }
  }
  updateBallSprites();
}

function createBallSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    if (ball.sprite == undefined) {
        var ballSprite = game.add.sprite(ball.x, ball.y, 'ball');
        var ballScale = 2*ball.radius/ballSprite.width;
        ballSprite.scale.setTo(ballScale);
        ballSprite.tint = Math.random() * 0xffffff;
        ball.sprite = ballSprite;
    }
  }
}

function updateBallSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    ball.sprite.x = ball.x;
    ball.sprite.y = ball.y;
  }
}
