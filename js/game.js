const GAME = document.getElementById('game');
const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;
const PLAYER = document.getElementById('player');
const START = document.getElementById('start');
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const SPACEBAR = 32;
var map = {};
var shotTimer = true;

function start() {
  START.style.display = 'none';
  PLAYER.style.display = 'inline-block';
  window.addEventListener('keydown', function(e){
    getKeys(e);
    movePlayer(e);
    createShot(e);
  });
  window.addEventListener('keyup', removeKeys);
}

function movePlayer(e){
  if (map[LEFT_ARROW] || e.which == LEFT_ARROW) {
    movePlayerLeft();
  }
  if (map[RIGHT_ARROW] || e.which == RIGHT_ARROW) {
    movePlayerRight();
  }

  if (map[DOWN_ARROW] || e.which == DOWN_ARROW) {
    movePlayerDown();
  }

  if (map[UP_ARROW] || e.which == UP_ARROW) {
    movePlayerUp();
  }
}

function getKeys(e){
  e.preventDefault();
  e.stopPropagation();
  e = e || event;
  map[e.which] = e.type == 'keydown';
}

function removeKeys(e){
  e = e || event;
  map[e.which] = e.type == 'keydown';
}

function movePlayerLeft(){
  window.requestAnimationFrame(function(){
    var left = convertStyleToInteger(PLAYER.style.left);
    if (left > 0) {
      PLAYER.style.left = `${left - 10}px`;
    }
  });
}

function movePlayerRight(){
  window.requestAnimationFrame(function(){
    var left = convertStyleToInteger(PLAYER.style.left);
    if (left < GAME_WIDTH - 20) {
      PLAYER.style.left = `${left + 10}px`;
    }
  });
}

function movePlayerUp(){
  window.requestAnimationFrame(function(){
    var bottom = convertStyleToInteger(PLAYER.style.bottom);
    if (bottom < 200) {
      PLAYER.style.bottom = `${bottom + 10}px`;
    }
  });
}

function movePlayerDown(){
  window.requestAnimationFrame(function(){
    var bottom = convertStyleToInteger(PLAYER.style.bottom);
    if (bottom > 0) {
      PLAYER.style.bottom = `${bottom - 10}px`;
    }
  });
}

function checkShotCollision(){

}

function checkPlayerCollision(){

}

function shotReady(){
  window.setTimeout(function(){
    shotTimer = true;
  }, 500)
}

function createShot(e){
  if ((map[SPACEBAR] || e.which == SPACEBAR) && shotTimer){
    const playerTop = convertStyleToInteger(PLAYER.style.bottom) + 40;
    const playerLeft = convertStyleToInteger(PLAYER.style.left);
    var shot = document.createElement('div');
    shot.className = 'shot';
    shot.style.left = `${playerLeft + 7}px`;
    shot.style.bottom = `${playerTop + 5}px`;
    var bottom = convertStyleToInteger(shot.style.bottom);
    GAME.appendChild(shot);
    function fireShot(){
      shot.style.bottom = `${bottom += 4}px`;

      if(bottom < GAME_HEIGHT) {
        window.requestAnimationFrame(fireShot);
      } else {
        shot.remove();
      }
    }
    window.requestAnimationFrame(fireShot);
    shotTimer = false;
    shotReady();
  }
}

function convertStyleToInteger(position){
  return parseInt(position.split('px')[0], 10);
}
