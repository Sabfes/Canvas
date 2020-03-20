const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = 'black';
ctx.font = '30px arial';

let WIDTH = 500;
let HEIGHT = 500;
let timeWhenGameStarted = Date.now();
let frameCount = 0;
let gameScore = 0;

// объект с картинками
let image = {};
// Картинка Героя\Игрока 
image.player = new Image();
image.player.src = 'image/hero.png';
// Картинка карты
image.map = new Image();
image.map.src = 'image/map.png';
// Картинка врага
image.enemy = new Image();
image.enemy.src = 'image/enemy.png';
// Картинка +опыт
image.xp = new Image();
image.xp.src = 'image/xp.png';
// Картинка +атакспид
image.atkspd = new Image();
image.atkspd.src = 'image/atkspd.png';
// Картинка пули
image.bullet = new Image();
image.bullet.src = 'image/bullet.png';

const player = {
  type: 'player',
  x: 0,
  y: 0,
  name: 'P',
  hp: 20,
  width: 80,
  height: 80,
  color: 'green',
  atkSpd: 1,
  attackCounter: 0,
  pressingDonw: false,
  pressingUp: false,
  pressingLeft: false,
  pressingRight: false,
  aimAngle: 0,
  image: image.player,
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
  enemyCreate(id, x, y, speedX, speedY, width, height, image.enemy)
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

function enemyCreate(id, x, y, speedX, speedY,width, height, image) {
  const enemy = {
    type: 'enemy',
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    color: 'red',
    id: id,
    aimAngle: 0,
    atkSpd: 1,
    attackCounter: 0,
    image: image,
  };
  enemyList[id] = enemy;
}

// Добавление 100 баллов
function upgrade(id, x, y, speedX, speedY,width, height, category, img, image ) {
  const asd = {
    type: 'upgrade',
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    id: id,
    category: category,
    img: img,
    image: image,
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
  let img = image.xp;
  if (Math.random() < 0.5) {
    category = 'atkSpd';
    img = image.atkspd;
  }
  upgrade(id, x, y, speedX, speedY, width, height, category, img, image.xp);
}
// Создание пули 
function bulletsCreate(id, x, y, speedX, speedY,width, height, image) {
  const asd = {
    type: 'bullet',
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
    image: image,
  };
  bulletList[id] = asd;
}
function generateBullet(actor, overwriteAngle) {
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
  bulletsCreate(id, x, y, speedX, speedY, width, height, image.bullet)
}

function updateEntity(entity){
  updateEntityPosition(entity);
  drawEntity(entity);
}

function updateEntityPosition(entity) {
  if (entity.type === 'player') {
    if (player.pressingRight) {
      player.x += 10;
    }
    if (player.pressingLeft) {
      player.x -= 10;
    }
    if (player.pressingDonw) {
      player.y += 10;
    }
    if (player.pressingUp) {
      player.y -= 10;
    }
  
    if (player.x < player.width/2) 
      player.x = player.width/2;
    if (player.x > WIDTH - player.width/2)
      player.x = WIDTH - player.width/2;
    if (player.y < player.height/2) 
      player.y = player.height/2;
    if (player.y > HEIGHT - player.height/2) 
      player.y = HEIGHT - player.height/2;
  } else {
    entity.x += entity.speedX;
    entity.y += entity.speedY;
  
    if (entity.x < 0 || entity.x > WIDTH) {
      entity.speedX = -entity.speedX;
    }
    if (entity.y < 0 || entity.y > HEIGHT) {
      entity.speedY = -entity.speedY;
    }
  }
};

function drawEntity(entity) {
  ctx.save();
  let x = entity.x - entity.width/2;
  let y = entity.y - entity.height/2;
  ctx.drawImage(entity.image, x, y, entity.width, entity.height);
  ctx.restore();
}

document.onmousemove = function(move) {
  let mouseX = move.clientX - canvas.getBoundingClientRect().left;
  let mouseY = move.clientY - canvas.getBoundingClientRect().top;
  
  mouseX -= player.x;
  mouseY -= player.y;
  player.aimAngle = Math.atan2(mouseY, mouseX) / Math.PI * 180;
}

document.onclick = function(mouse) {
  perfomAttack(player);
}

function perfomAttack(actor) {
  if (actor.attackCounter > 25) {
    generateBullet(actor);
    actor.attackCounter = 0;
  }
}



document.oncontextmenu = function(event) {
  event.preventDefault();
  perfomSpecialAttack(player);
}

function perfomSpecialAttack(actor) {
  if (actor.attackCounter > 50) {
    generateBullet(actor, actor.aimAngle - 5);
    generateBullet(actor, actor.aimAngle);
    generateBullet(actor, actor.aimAngle + 5);
    actor.attackCounter = 0;
  }
}

document.onkeydown = function(event) {
  if (event.keyCode === 68) {
    player.pressingRight = true;
  } else if (event.keyCode === 83) {
    player.pressingDonw = true;
  } else if (event.keyCode === 65) {
    player.pressingLeft = true;
  } else if (event.keyCode === 87) {
    player.pressingUp = true;
  }
}

document.onkeyup = function(event) {
  if (event.keyCode === 68) {
    player.pressingRight = false;
  } else if (event.keyCode === 83) {
    player.pressingDonw = false;
  } else if (event.keyCode === 65) {
    player.pressingLeft = false;
  } else if (event.keyCode === 87) {
    player.pressingUp = false;
  }
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
  player.attackCounter += player.atkSpd


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
    let isColliding = testCollisionEntity(player, upgradeList[key]);
    if (isColliding) {
      if (upgradeList[key].category === 'score') {
        gameScore += 1000;
      }
      if (upgradeList[key].category === 'atkSpd') {
        player.atkSpd += 1;
      }
      delete upgradeList[key];
    }
  }

  for (let key in enemyList) {
    updateEntity(enemyList[key]);

    let isColliding = testCollisionEntity(player, enemyList[key]);
    if (isColliding) {
      player.hp -= 1;
    }
    if (player.hp <= 0) {
      const timeSurv = Date.now() - timeWhenGameStarted;
      console.log('You surv ' + timeSurv/1000 + "s");
      console.log('You score ' + gameScore + "point");
      startNewGame();
    }
  }
  updateEntity(player);
  ctx.fillText(player.hp + ' HP',0,30)
  ctx.fillText('Score: ' + gameScore ,100,30)
};


function startNewGame() {
  player.hp = 20;
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