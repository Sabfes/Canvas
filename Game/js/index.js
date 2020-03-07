const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = 'black';
ctx.font = '30px arial';

let WIDTH = 500;
let HEIGHT = 500;
let timeWhenGameStarted = Date.now();

document.onmousemove = function(move) {
  const mouseX = move.clientX - canvas.getBoundingClientRect().left;
  const mouseY = move.clientY - canvas.getBoundingClientRect().top;
  
  if (mouseX < player1.width/2) 
    mouseX = player1.width/2;
  if (mouseX > WIDTH - player1.width/2)
    mouseX = WIDTH - player1.width/2;
  if (mouseY < player1.height/2) 
    mouseY = player1.height/2;
  if (mouseY > HEIGHT - player1.height/2) 
    mouseY = HEIGHT - player1.height/2;

  player1.x = mouseX;
  player1.y = mouseY;
  
}
let frameCount = 0;
let gameScore = 0;
// player1
const player1 = {
  name: 'P',
  hp: 20,
  width: 20,
  height: 20,
  color: 'green',
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
    name: 'E',
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: 'red',
    id: id,
  };
  enemyList[id] = enemy;
}

// Добавление 100 баллов
function upgrade(id, x, y, speedX, speedY,width, height) {
  const asd = {
    x: x,
    y: y,
    name: 'E',
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: 'orange',
    id: id,
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
  upgrade(id, x, y, speedX, speedY, width, height)
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
  };
  bulletList[id] = asd;
}
function randomGenerateBulletsUpgrade() {
  const x = player1.x;
  const y = player1.y;
  const angle = Math.random() * 360;
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
  if (frameCount % 25 === 0) {
    randomGenerateBulletsUpgrade();
  }


  for (let key in bulletList) {
    updateEntity(bulletList[key]);
  }
  for (let key in upgradeList) {
    updateEntity(upgradeList[key]);
    let isColliding = testCollisionEntity(player1, upgradeList[key]);
    if (isColliding) {
      gameScore += 100;
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

  drawEntity(player1);
  ctx.fillText(player1.hp + ' HP',0,30)
  ctx.fillText('Score: ' + gameScore ,100,30)
};


function startNewGame() {
  player1.hp = 20;
  timeWhenGameStarted = Date.now();
  frameCount = 0;
  enemyList = {};
  upgradeList = {};
  bulletList = {};
  gameScore = 0;
  randomGenerateEnemy();
  randomGenerateEnemy();
}

startNewGame();

setInterval(update, 40);