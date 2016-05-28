function distance(a,b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
};

/*function distToSegmentSquared(p, v, w) {
  var l2 = distance(v, w);
  if (l2 == 0) return distance(p, v);
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
*/

function pDistance(p,v,w) {

  var x=p.x;
  var y=p.y;

  var x1=v.x;
  var y1=v.y;

  var x2=w.x;
  var y2=w.y;

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

function generateBullies() {
  bullies = [];

  bullies.push({
    x:150,
    y:150,
    radius:20,
    patrolPath: [
      {x:150,y:150},
      {x:150,y:700},
      {x:1000,y:700},
      {x:1000,y:150},
    ],
    nextPatrolIndex:0,
    patrolSpeed:3,
    engageSpeed:3,
    chaseSpeed:3,
    mode:0,
    eyeingRad: 120,
  });

  startPatrol(bullies[0]);
  bullies.push({
    x:1000,
    y:600,
    radius:20,
    patrolPath: [
      {x:150,y:150},
      {x:1000,y:150},
      {x:1000,y:700},
      {x:150,y:700},
    ],
    nextPatrolIndex:0,
    patrolSpeed:2,
    engageSpeed:2,
    chaseSpeed:3,
    mode:0,
    eyeingRad: 120,
  });
  startPatrol(bullies[1]);

  bullies.push({
    x:1000,
    y:50,
    radius:20,
    patrolPath: [
      {x:1000,y:150},
      {x:150,y:150},
      {x:150,y:700},
      {x:1000,y:700},
    ],
    nextPatrolIndex:0,
    patrolSpeed:3,
    engageSpeed:3,
    chaseSpeed:3,
    mode:0,
    eyeingRad: 120,
  });
  startPatrol(bullies[2]);
  bullies.push({
    x:50,
    y:700,
    radius:20,
    patrolPath: [
      {x:1000,y:150},
      {x:1000,y:700},
      {x:150,y:700},
      {x:150,y:150},
    ],
    nextPatrolIndex:0,
    patrolSpeed:2,
    engageSpeed:2,
    chaseSpeed:3,
    mode:0,
    eyeingRad: 120,
  });
  startPatrol(bullies[3]);
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
  if (bully.mode == 2)
    return;
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
    var d = pDistance(balls[i],bully,player);
    if (d<balls[i].radius*2) {
    //  if (bully.mode == 2) {
        bully.mode == 0;
    //  }
      return;
    }
  }
  bully.mode = 2;
}

function chase(bully) {
    var deltaX = player.x-bully.x;
    var deltaY = player.y-bully.y;
    var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    if (dist<bully.chaseSpeed*2) {
      bully.mode = 0;
      return;
    }
    var speedX = bully.chaseSpeed*deltaX/dist;
    var speedY = bully.chaseSpeed*deltaY/dist;
    bully.x += speedX;
    bully.y += speedY;
}



function handleBullies() {
  for (var i=0;i<bullies.length;i++) {
  //  console.log("mode:"+i + ":"+bullies[i].mode)
    var bully = bullies[i];
    lookForPlayer(bully);
    lookForMovement(bully);
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
