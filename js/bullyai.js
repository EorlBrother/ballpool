function distance(a,b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
};

function generateBullies() {
  bullies = [];
  
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
    patrolSpeed:2,
    engageSpeed:4,
    mode:0,
    eyeingRad: 200,
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
    patrolSpeed:1,
    engageSpeed:3,
    mode:0,
    eyeingRad: 200,
  });
  startPatrol(bullies[1]);
}

function startPatrol(bully) {
  var nextPatrolIndex=0;
  var minDist = 1000000;
  for (var i=0;i<bully.patrolPath.length;i++) {
    var dist = distance(bully,bully.patrolPath[i]);
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

function engage(bully) {
    var deltaX = bully.engagePosition.x-bully.x;
    var deltaY = bully.engagePosition.y-bully.y;
    var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    if (dist<bully.engageSpeed) {
      bully.mode = 0;
      return;
    }
    var speedX = bully.engageSpeed*deltaX/dist;
    var speedY = bully.engageSpeed*deltaY/dist;
    bully.x += speedX;
    bully.y += speedY;
}

function lookForMovement(bully) {
  var minDistance = 1000000;
  var minBallIndex = -1;
  for (var i=0;i<balls.length;i++) {
    if (balls[i].moving && distance(balls[i],bully)<bully.eyeingRad) {
      if (distance(balls[i],bully)<minDistance)
        minDistance = distance(balls[i],bully);
        minBallIndex = i;
    }
  }
  if ( minBallIndex>-1) {
    bully.mode = 1;
    bully.engagePosition = {x:balls[minBallIndex].x,y:balls[minBallIndex].y};
  }
}

function lookForPlayer(bully) {
  for (var i=0;i<balls.length;i++) {
    if (distToSegment(balls[i],bully,player)<balls[i].radius) {
      if (bully.mode == 2) {
        bully.mode == 0;
      }
    }
  }
  bully.mode = 2;
}

function chase(bully) {
    var deltaX = player.x-bully.x;
    var deltaY = player.y-bully.y;
    var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    if (dist<bully.chaseSpeed) {
      bully.mode = 0;
      return;
    }
    var speedX = bully.chaseSpeed*deltaX/dist;
    var speedY = bully.chaseSpeed*deltaY/dist;
    bully.x += speedX;
    bully.y += speedY;
}

function distToSegmentSquared(p, v, w) {
  var l2 = distance(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return distance(p, {
    x:v.x + t * (w.x - v.x),
    y:v.y + t * (w.y - v.y) });
}

function distToSegment(p,v,w) {
  var d = Math.sqrt(distToSegmentSquared(p, v, w));
  return d;
}


function handleBullies() {
  for (var i=0;i<bullies.length;i++) {
    var bully = bullies[i];
    lookForMovement(bully);
    lookForPlayer(bully);
    //patrol
    if (bully.mode == 0) {
      patrol(bully);
    }
    //engage
    if (bully.mode == 1) {
      engage(bully);
    }
    //chase
    if (bully.mode == 2) {
      chase(bully);
    }
  }
}
