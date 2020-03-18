const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = 'black';
ctx.font = '30px arial';

let WIDTH = 500;
let HEIGHT = 500;
let timeWhenGameStarted = Date.now();
let frameCount = 0;
let gameScore = 0;

const player1 = {
  x: 0,
  y: 0,
  name: 'P',
  hp: 20,
  width: 20,
  height: 20,
  color: 'green',
  atkSpd: 1,
  attackCounter: 0,
  pressingDonw: false,
  pressingUp: false,
  pressingLeft: false,
  pressingRight: false,
  aimAngle: 0,
};

let enemyList = {};
let upgradeList = {};
let bulletList = {};

function randomGenerateEnemy() {
  const x = Math.random() * WIDTH;
  const y = Math.random() * HEIGHT;
  const height = 10 + Math.random() * 30;
  const width = 10 + Math.random() * 30;
  const speedX = 5 + Math.random() * 5;
  const speedY = 5 + Math.random() * 5;
  const id = Math.random();
  enemyCreate(id, x, y, speedX, speedY, width, height)
}

function getDistanceBetweenEntity(entity1, entity2) {
  const vx = entity1.x - entity2.x;
  const vy = entity1.y - entity2.y;
  return Math.sqrt(vx*vx + vy*vy);
}

function testCollisionEntity(entity1, entity2) {
  let rect1 = {
    x: entity1.x - entity1.width/2,
    y: entity1.y - entity1.height/2,
    width: entity1.width,
    height: entity1.height,
  }
  let rect2 = {
    x: entity2.x - entity2.width/2,
    y: entity2.y - entity2.height/2,
    width: entity2.width,
    height: entity2.height,
  }
  return testcollisionRectRect(rect1, rect2);
}

function testcollisionRectRect(rect1, rect2) {
  return rect1.x <= rect2.x + rect2.width
    && rect2.x <= rect1.x + rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height;
}

function enemyCreate(id, x, y, speedX, speedY,width, height) {
  const enemy = {
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: 'red',
    id: id,
    aimAngle: 0,
  };
  enemyList[id] = enemy;
}

// Добавление 100 баллов
function upgrade(id, x, y, speedX, speedY,width, height, category, color ) {
  const asd = {
    x: x,
    y: y,
    name: 'E',
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: color,
    id: id,
    category: category,
  };
  upgradeList[id] = asd;
}
function randomGenerateEnemyUpgrade() {
  const x = Math.random() * WIDTH;
  const y = Math.random() * HEIGHT;
  const height = 10;
  const width = 10;
  const speedX = 0;
  const speedY = 0;
  const id = Math.random();
  let category = 'score'; 
  let color = 'orange';
  if (Math.random() < 0.5) {
    category = 'atkSpd';
    color = 'green';
  }
  upgrade(id, x, y, speedX, speedY, width, height, category, color);
}
// Создание пули 
function bulletsCreate(id, x, y, speedX, speedY,width, height) {
  const asd = {
    x: x,
    y: y,
    name: 'E',
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: 'black',
    id: id,
    timer: 0,
  };
  bulletList[id] = asd;
}
function randomGenerateBulletsUpgrade(actor, overwriteAngle) {
  const x = actor.x;
  const y = actor.y;

  let angle = actor.aimAngle;
  if (overwriteAngle !== undefined) {
    angle = overwriteAngle;
  }

  const height = 10;
  const width = 10;
  const speedX = Math.cos(angle/180 * Math.PI) * 5;
  const speedY = Math.sin(angle/180 * Math.PI) * 5;
  const id = Math.random();
  bulletsCreate(id, x, y, speedX, speedY, width, height)
}

function updateEntity(something){
  updateEntityPosition(something);
  drawEntity(something);
}

function updateEntityPosition(something) {
  something.x += something.speedX;
  something.y += something.speedY;

  if (something.x < 0 || something.x > WIDTH) {
    something.speedX = -something.speedX;
  }
  if (something.y < 0 || something.y > HEIGHT) {
    something.speedY = -something.speedY;
  }
};

function drawEntity(something) {
  ctx.save();
  ctx.fillStyle = something.color;
  ctx.fillRect(something.x-something.width/2, something.y-something.height/2, something.width, something.height);
  ctx.restore();
}

document.onmousemove = function(move) {
  let mouseX = move.clientX - canvas.getBoundingClientRect().left;
  let mouseY = move.clientY - canvas.getBoundingClientRect().top;
  
  mouseX -= player1.x;
  mouseY -= player1.y;
  player1.aimAngle = Math.atan2(mouseY, mouseX) / Math.PI * 180;
}

document.onclick = function(mouse) {
  if (player1.attackCounter > 25) {
    randomGenerateBulletsUpgrade(player1);
    player1.attackCounter = 0;
  }
}

document.oncontextmenu = function(event) {
  if (player1.attackCounter > 50) {
    for (let angle=0; angle<360; angle++) {
      randomGenerateBulletsUpgrade(player1, angle);
    }
    player1.attackCounter = 0;
  }
  event.preventDefault();
}

document.onkeydown = function(event) {
  if (event.keyCode === 68) {
    player1.pressingRight = true;
  } else if (event.keyCode === 83) {
    player1.pressingDonw = true;
  } else if (event.keyCode === 65) {
    player1.pressingLeft = true;
  } else if (event.keyCode === 87) {
    player1.pressingUp = true;
  }
}

document.onkeyup = function(event) {
  if (event.keyCode === 68) {
    player1.pressingRight = false;
  } else if (event.keyCode === 83) {
    player1.pressingDonw = false;
  } else if (event.keyCode === 65) {
    player1.pressingLeft = false;
  } else if (event.keyCode === 87) {
    player1.pressingUp = false;
  }
}

function updatePlayerPosition() {
  if (player1.pressingRight) {
    player1.x += 10;
  }
  if (player1.pressingLeft) {
    player1.x -= 10;
  }
  if (player1.pressingDonw) {
    player1.y += 10;
  }
  if (player1.pressingUp) {
    player1.y -= 10;
  }

  if (player1.x < player1.width/2) 
    player1.x = player1.width/2;
  if (player1.x > WIDTH - player1.width/2)
    player1.x = WIDTH - player1.width/2;
  if (player1.y < player1.height/2) 
    player1.y = player1.height/2;
  if (player1.y > HEIGHT - player1.height/2) 
    player1.y = HEIGHT - player1.height/2;
}

function update() {
  ctx.clearRect(0,0, WIDTH, HEIGHT);
  
  frameCount++;
  gameScore++;

  if (frameCount % 100 === 0) {
    randomGenerateEnemy();
  }
  if (frameCount % 75 === 0 ) {
    randomGenerateEnemyUpgrade();
  }
  player1.attackCounter += player1.atkSpd


  for (let key in bulletList) {
    updateEntity(bulletList[key]);


    let toRemove = false;
    bulletList[key].timer++;
    if (bulletList[key].timer > 75) {
      toRemove = true;
    }
    for (let key2 in enemyList) {
      let isColliding = testCollisionEntity(bulletList[key], enemyList[key2]);

      if (isColliding) {
        toRemove = true;
        delete enemyList[key2];
        break;
      }
    }
    if (toRemove) {
      delete bulletList[key];
    }


  }
  for (let key in upgradeList) {
    updateEntity(upgradeList[key]);
    let isColliding = testCollisionEntity(player1, upgradeList[key]);
    if (isColliding) {
      if (upgradeList[key].category === 'score') {
        gameScore += 1000;
      }
      if (upgradeList[key].category === 'atkSpd') {
        player1.atkSpd += 1;
      }
      delete upgradeList[key];
    }
  }

  for (let key in enemyList) {
    updateEntity(enemyList[key]);

    let isColliding = testCollisionEntity(player1, enemyList[key]);
    if (isColliding) {
      player1.hp -= 1;
    }
    if (player1.hp <= 0) {
      const timeSurv = Date.now() - timeWhenGameStarted;
      console.log('You surv ' + timeSurv/1000 + "s");
      console.log('You score ' + gameScore + "point");
      startNewGame();
    }
  }
  updatePlayerPosition();
  drawEntity(player1);
  ctx.fillText(player1.hp + ' HP',0,30)
  ctx.fillText('Score: ' + gameScore ,100,30)
};


function startNewGame() {
  player1.hp = 20;
  timeWhenGameStarted = Date.now();
  frameCount = 0;
  gameScore = 0;
  enemyList = {};
  upgradeList = {};
  bulletList = {};
  randomGenerateEnemy();
  randomGenerateEnemy();
}

startNewGame();

setInterval(update, 40);