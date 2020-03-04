const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = 'black';
ctx.font = '30px arial';

let width = 500;
let height = 500;
const timeWhenGameStarted = Date.now();

document.onmousemove = function(move) {
  const mouseX = move.clientX;
  const mouseY = move.clientY;
  
  player1.x = mouseX;
  player1.y = mouseY;
  
}
// player1
const player1 = {
  name: 'P',
  hp: 20,
};

const enemyList = {};

enemyCreate('E1', 150, 350, 10, 15);
enemyCreate('E2', 250, 350, 10, -15);
enemyCreate('E3', 350, 150, 10, -5);

function getDistanceBetweenEntity(entity1, entity2) {
  const vx = entity1.x - entity2.x;
  const vy = entity1.y - entity2.y;
  return Math.sqrt(vx*vx + vy*vy);
}
function testCollisionEntity(entity1, entity2) {
  const distance = getDistanceBetweenEntity(entity1, entity2);
  return distance < 30;
}

function enemyCreate(id, x, y, speedX, speedY) {
  const enemy = {
    x: x,
    y: y,
    name: 'E',
    speedX: speedX,
    speedY: speedY,
  };
  enemyList[id] = enemy;
}
function updateEntity(something){
  updateEntityPosition(something);
  drawEntity(something);
}
function updateEntityPosition(something) {
  something.x += something.speedX;
  something.y += something.speedY;

  if (something.x < 0 || something.x > width) {
    something.speedX = -something.speedX;
  }
  if (something.y < 0 || something.y > height) {
    something.speedY = -something.speedY;
  }
};
function drawEntity(something) {
  ctx.fillText(something.name , something.x, something.y);
}
function update() {
  ctx.clearRect(0,0, width, height);
  
  for (let key in enemyList) {
    updateEntity(enemyList[key]);

    let isColliding = testCollisionEntity(player1, enemyList[key]);
    if (isColliding) {
      player1.hp -= 1;
      if (player1.hp <= 0) {
        const timeSurv = Date.now() - timeWhenGameStarted;
        console.log('You surv ' + timeSurv/1000 + "s");
        timeWhenGameStarted = Date.now();
        player1.hp = 20;
      }
    }
  }

  drawEntity(player1);
  ctx.fillText(player1.hp + ' HP',0,30)
};
setInterval(update, 40);

// document.addEventListener('keydown', function(event) {
//     if (x === test.posX && y === test.posY) {
//         console.log('asd');
//     }
//     if (event.code == 'ArrowRight') {
//     ctx.clearRect(x, y, w, h);
//     x += 10;
//     ctx.fillRect(x, y, w, h);
//   }
//   if (event.code == 'ArrowLeft') {
//     ctx.clearRect(x, y, w, h);
//     x -= 10;
//     ctx.fillRect(x, y, w, h);
//   }
//   if (event.code == 'ArrowUp') {
//     ctx.clearRect(x, y, w, h);
//     y -= 10;
//     ctx.fillRect(x, y, w, h);
//   }
//   if (event.code == 'ArrowDown') {
//     ctx.clearRect(x, y, w, h);
//     y += 10;
//     ctx.fillRect(x, y, w, h);
//   }
// });
