


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    render: render,
    update: update
  },
  false, false);


function preload() {
  game.load.image('ball', 'assets/sprites/ball.png');
  game.load.image('bully', 'assets/sprites/bully.png');
  game.load.image('nerd', 'assets/sprites/nerd.png');
}

var cursors;
var player;
var bullies = [];

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();

  player = new Ball(0,POOL_HEIGHT);

  game.stage.backgroundColor = '#000000'; //'#f46f0a';
  generateBalls();
  generateBullies();
  createBallPool();
  createBallSprites();
  createBullySprites();
  createPlayerSprite();
}


function render() {
}



function update() {
  for (var i = 0; i<BALL_AMOUNT; i++) {
    for (var j = i+1; j<BALL_AMOUNT; j++) {
      var overlap = checkCircleCollision(balls[i], balls[j])
      if(overlap) {
        handleCollision(balls[i], balls[j], overlap, false);
      }
    }
    var overlap = checkCircleCollision(balls[i],player);
    if(overlap) {
      handleCollision(balls[i], player, overlap, true);
    }
    handleWallCollision(balls[i]);
  }
  handleInput();
  handleBullies();
  updateSprites();
}

function handleInput() {
  if (game.input.mousePointer.isDown)
  {
    if (player.x < game.input.x - POOL_CORNER_X)  {
      player.x += PLAYER_SPEED;
    } else if (player.x > game.input.x - POOL_CORNER_X) {
      player.x -= PLAYER_SPEED;
    }
    if(player.y < game.input.y - POOL_CORNER_Y) {
      player.y += PLAYER_SPEED;
    } else if (player.y > game.input.y - POOL_CORNER_Y) {
      player.y -= PLAYER_SPEED;
    }
  } else {
    if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
      player.y -= PLAYER_SPEED;
      player.moving = true;
    }
    if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
      player.y += PLAYER_SPEED;
      player.moving = true;
    }
    if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      player.x += PLAYER_SPEED;
      player.moving = true;
    }
    if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      player.x -= PLAYER_SPEED;
      player.moving = true;
    }
  }
}

function createBallPool() {
  var pool = game.add.graphics(0, 0);

// set a fill and line style
  pool.beginFill(0x2233BB);
  pool.lineStyle(1, 0xAACCFF, 1);
  pool.drawRect(POOL_CORNER_X, POOL_CORNER_Y, POOL_WIDTH, POOL_HEIGHT);
  pool.endFill();
}

function createPlayerSprite() {
  if (player.sprite == undefined) {
      var playerSprite = game.add.sprite(player.x, player.y, 'nerd');
      player.radius=20;
      var playerScale = 2*player.radius/playerSprite.width;
      playerSprite.scale.setTo(playerScale,playerScale*1.2);
      playerSprite.anchor.x = 0.5;
      playerSprite.anchor.y = 0.5;
      player.sprite = playerSprite;
  }
}

function createBullySprites() {
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    if (bully.sprite == undefined) {
      var bullySprite = game.add.sprite(bully.x, bully.y, 'bully');
      bully.sprite = bullySprite;
    }
    var playerScale = 2*bully.radius/bullySprite.width;
    bullySprite.scale.setTo(playerScale);
    bullySprite.anchor.x = 0.5;
    bullySprite.anchor.y = 0.5;

  }
}

function createBallSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    if (ball.sprite == undefined) {
        var ballSprite = game.add.sprite(ball.x, ball.y, 'ball');
        ball.sprite = ballSprite;
    }
    var ballScale = 2*ball.radius/ballSprite.width;
    ballSprite.scale.setTo(ballScale);
    ballSprite.anchor.x = 0.5;
    ballSprite.anchor.y = 0.5;
    ballSprite.tint = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
}

function updateSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    ball.sprite.x = ball.x+POOL_CORNER_X;
    ball.sprite.y = ball.y+POOL_CORNER_Y;
  }
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    bully.sprite.x = bully.x;
    bully.sprite.y = bully.y;
  }

  player.sprite.x = player.x+POOL_CORNER_X;
  player.sprite.y = player.y+POOL_CORNER_Y;
}
