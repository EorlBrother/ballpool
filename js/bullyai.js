function distance(a,b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
};

function generateBullies() {
  bullies.push({
    x:50,
    y:50,
    radius:20,
    patrolPath: [
      {x:50,y:50},
      {x:50,y:700},
      {x:1000,y:700},
      {x:1000,y:50},
    ],
    nextPatrolIndex:0,
    patrolSpeed:3,
    mode:0,
    eyeingRad: 100,
  });

  startPatrol(bullies[0]);
  bullies.push({
    x:1000,
    y:600,
    radius:20,
    patrolPath: [
      {x:50,y:50},
      {x:1000,y:50},
      {x:1000,y:700},
      {x:50,y:700},
    ],
    nextPatrolIndex:0,
    patrolSpeed:2,
    mode:0,
    eyeingRad: 100,
  });
  startPatrol(bullies[1]);
}

function startPatrol(bully) {
  var nextPatrolIndex=0;
  var minDist = 1000000;
  for (var i=0;i<bully.patrolPath.length;i++) {
    var dist = Math.sqrt((bully.x-bully.patrolPath[i].x)*(bully.x-bully.patrolPath[i].x)+(bully.y-bully.patrolPath[i].y)*(bully.y-bully.patrolPath[i].y));
    if (dist<minDist) {
      minDist = dist;
      nextPatrolIndex = i;
    }
  }
  bully.nextPatrolIndex = nextPatrolIndex;
  bully.mode = 0;
}

function patrol(bully) {
    var deltaX = bully.patrolPath[bully.nextPatrolIndex].x-bully.x;
    var deltaY = bully.patrolPath[bully.nextPatrolIndex].y-bully.y;
    var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    if (dist<bully.patrolSpeed) {
      bully.nextPatrolIndex = (bully.nextPatrolIndex+1)%bully.patrolPath.length;
      return;
    }
    var speedX = bully.patrolSpeed*deltaX/dist;
    var speedY = bully.patrolSpeed*deltaY/dist;
    bully.x += speedX;
    bully.y += speedY;
}

function lookForMovement(bully) {
  for (var i=0;i<balls.length;i++) {
    if (distance(balls[i],bully)<bully.eyeingRad) {
      console.log("dsdsd");
    }
  }
}


function handleBullies() {
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    lookForMovement(bully);
    if (bully.mode == 0) {
      patrol(bully);
    }

  }
}
