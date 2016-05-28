function generateBullies() {
  bullies.push({
    x:50,
    y:50,
    radius:20,
    patrolPath = [
      {x:100,y:100},
      {x:100,y:800},
      {x:800,y:800},
      {x:800,y:100},
    ],
    nextPatrolIndex:0,
    patrolSpeed:3,
    mode:0,
  });
  startPatrol(bullies[0]);
  bullies.push({
    x:1000,
    y:600,
    radius:20,
    patrolPath = [
      {x:100,y:100},
      {x:800,y:100},
      {x:800,y:800},
      {x:100,y:800},
    ],
    nextPatrolIndex:0,
    patrolSpeed:2,
    mode:0,
  });
  startPatrol(bullies[1]);
}

function startPatrol(bully) {
  var nextPatrolIndex=0;
  var minDist = 1000000;
  for (var i=0;i<patrolPath.length;i++) {
    var dist = Math.sqrt((bully.x-patrolPath[i].x)*(bully.x-patrolPath[i].x)+(bully.y-patrolPath[i].y)*(bully.y-patrolPath[i].y)))
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
    var dist = Math.sqrt(deltaX+deltaY);
    var speedX = bully.patrolSpeed*deltaX/dist;
    var speedY = bully.patrolSpeed*deltaY/dist;
    bully.x += speedX;
    bully.y += speedX;
    if (dist<speed) {
      nextPatrolIndex = (nextPatrolIndex+1)%patrolPath.length;
    }
}

function handleBullies() {
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    if (bully.mode == 0) {
      patrol(bully);
    }

  }
}
