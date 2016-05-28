


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

var cursors;
var player;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();

  player = new Ball(0,0);

  game.stage.backgroundColor = '#000000'; //'#f46f0a';
  generateBalls();
  createBallPool();
  createPlayerSprite();
  createBallSprites();
}


function render() {
}



function update() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    for (var j = i+1; j<BALL_AMOUNT; j++) {
      if(checkCircleCollision(balls[i], balls[j])) {
        handleCollision(balls[i], balls[j], false);
      }
    }
    handleWallCollision(balls[i]);
    if(checkCircleCollision(balls[i],player)) {
      handleCollision(balls[i], player, true);
    }
  }
  handleInput();
  updateSprites();
}

function handleInput() {
  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W))
  {
    player.y -= BALL_RADIUS/4;
    player.moving = true;
  }
  if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
  {
    player.y += BALL_RADIUS/4;
    player.moving = true;
  }
  if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))
  {
    player.x += BALL_RADIUS/4;
    player.moving = true;
  }
  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))
  {
    player.x -= BALL_RADIUS/4;
    player.moving = true;
  }
}

function createBallPool() {
  var pool = game.add.graphics(0, 0);

// set a fill and line style
  pool.beginFill(0xFFFFFF);
  pool.lineStyle(10, 0xffd900, 1);
  pool.drawRect(POOL_CORNER_X, POOL_CORNER_Y, POOL_WIDTH, POOL_HEIGHT);
  pool.endFill();
}

function createPlayerSprite() {
  if (player.sprite == undefined) {
      var playerSprite = game.add.sprite(player.x, player.y, 'ball');
      var playerScale = 2*player.radius/playerSprite.width;
      playerSprite.scale.setTo(playerScale);
      playerSprite.anchor.x = 0.5;
      playerSprite.anchor.y = 0.5;
      playerSprite.tint = 0xff9001;
      player.sprite = playerSprite;
  }
}

function createBallSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    if (ball.sprite == undefined) {
        var ballSprite = game.add.sprite(ball.x, ball.y, 'ball');
        var ballScale = 2*ball.radius/ballSprite.width;
        ballSprite.scale.setTo(ballScale);
        ballSprite.anchor.x = 0.5;
        ballSprite.anchor.y = 0.5;
        ballSprite.tint = Math.random() * 0xffffff;
        ball.sprite = ballSprite;
    }
  }
}

function updateSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    ball.sprite.x = ball.x+POOL_CORNER_X;
    ball.sprite.y = ball.y+POOL_CORNER_Y;
  }

  player.sprite.x = player.x+POOL_CORNER_X;
  player.sprite.y = player.y+POOL_CORNER_Y;
}
