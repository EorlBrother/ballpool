


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    render: render,
    update: update
  },
  false, false);


function preload() {
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#000000'; //'#f46f0a';

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
}
