


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
  game.load.image('telescope', 'assets/sprites/telescope.png');
}

var cursors;
var player;
var bullies = [];
var overTime = 0;
var state = 0;
var stateText;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();
  game.stage.backgroundColor = 0xAAAACC; //'#f46f0a';

  var telescope = game.add.sprite(OBSERVATORY_X, OBSERVATORY_Y, 'telescope')
  telescope.scale.setTo(0.25,0.25);

  startLevel();
}

function startLevel() {
  state = 0;

  player = new Ball(POOL_CORNER_X+100,POOL_HEIGHT+POOL_CORNER_Y-100);

  generateBalls();
  generateBullies();
  createBallPool();
  createBallSprites();
  createBullySprites();
  createPlayerSprite();

  stateText = game.add.text(POOL_CORNER_X+POOL_WIDTH/2 ,POOL_CORNER_Y+POOL_HEIGHT/2,' ', { font: '84px Arial', fill: '#fff' });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;
}

function destroyEverything() {
  for (var i = 0; i < balls.length; i++)
  {
    balls[i].sprite.kill();
  }
  for (var i = 0; i < bullies.length; i++)
  {
    bullies[i].sprite.kill();
    bullies[i].x = 0;
    bullies[i].y = 0;
  }
  player.sprite.kill();
  player.x = 10000;
  player.y = 10000;

}

function render() {
}


function update() {
  var elapsed = overTime + this.game.time.elapsed;
  if (state == 0) {
    while (elapsed / 16 >= 1) {
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
        if (balls[i].movingCounter <= 0) {
          balls[i].moving = false;
        }
        balls[i].movingCounter--;
      }
      if (checkPlayerAtObservatory(player)) {
        gameOver(true);
      }
      for (var i=0;i<bullies.length;i++) {
        if (checkCircleCollision(player, bullies[i])) {
          gameOver(false);
        }
      }
      handleInput();
      handleBullies();
      updateSprites();
      elapsed -= 16;
    }
    overTime = elapsed;
  } else {
    game.input.onTap.addOnce(startLevel);
  }
}

function handleInput() {
  // if (game.input.mousePointer.isDown)
  // {
  //   if (player.x < game.input.x)  {
  //     player.x += PLAYER_SPEED;
  //   } else if (player.x > game.input.x) {
  //     player.x -= PLAYER_SPEED;
  //   }
  //   if(player.y < game.input.y) {
  //     player.y += PLAYER_SPEED;
  //   } else if (player.y > game.input.y) {
  //     player.y -= PLAYER_SPEED;
  //   }
  // } else {
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
  // }
}

function createBallPool() {
  var pool = game.add.graphics(0, 0);

// set a fill and line style
  pool.beginFill(0x2233BB);
  pool.lineStyle(10, 0xAACCFF, 1);
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
    var playerScale = 2*bully.radius/bully.sprite.width;
    bully.sprite.scale.setTo(playerScale);
    bully.sprite.anchor.x = 0.5;
    bully.sprite.anchor.y = 0.5;

  }
}

function createBallSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    if (ball.sprite == undefined) {
        var ballSprite = game.add.sprite(ball.x, ball.y, 'ball');
        ball.sprite = ballSprite;
    }
    var ballScale = 2*ball.radius/ball.sprite.width;
    ball.sprite.scale.setTo(ballScale);
    ball.sprite.anchor.x = 0.5;
    ball.sprite.anchor.y = 0.5;
    ball.sprite.tint = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
}

function updateSprites() {
  for (var i=0;i<balls.length;i++) {
    var ball = balls[i];
    ball.sprite.x = ball.x;
    ball.sprite.y = ball.y;
  }
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    bully.sprite.x = bully.x;
    bully.sprite.y = bully.y;
  }

  player.sprite.x = player.x;
  player.sprite.y = player.y;
}

function gameOver(won) {
  if (won) {
    stateText.text=" YOU WON \n Click to restart";
  } else {
    stateText.text=" GAME OVER \n Click to restart";
  }
  stateText.visible = true;
  destroyEverything();
  state = 1;
}
