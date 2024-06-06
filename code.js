/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */

// Initialize variables

var bg1 ={x:0,y:0,w:320,h:450,s:2,img:"bg1"};
var bg2 ={x:-320,y:0,w:320,h:450,s:2,img:"bg2"};
var rocket = {x:160, y:360, w:30, h:50, s:10, img:"rocket"};
var asteroid = {x:randomNumber(30,290), y:-100, w:60, h:60, s:randomNumber(3,5), img:"meteor"};
var asteroid2 = {x:randomNumber(30,290), y:-100, w:60, h:60, s:randomNumber(3,5), img:"meteor2"};
var asteroid3 = {x:randomNumber(30,290), y:-100, w:60, h:60, s:randomNumber(3,5), img:"rock"};
var score = 0;

drawBackground();
drawRocket();
drawAsteroids();
drawScore();
  
timedLoop(50, function() {
  scrollBackground();
  moveAsteroid(asteroid) ;
  moveAsteroid(asteroid2) ;
  moveAsteroid(asteroid3);
  checkCollision(asteroid, rocket);
  checkCollision(asteroid2, rocket);
  checkCollision(asteroid3, rocket);
  checkRestart(asteroid);
  checkRestart(asteroid2);
  checkRestart(asteroid3);
  if(score>=25){
    stopTimedLoop();
    playSound("assets/category_achievements/melodic_win_1.mp3")
  }
});

onEvent("screen1", "keydown", function(event) {
    if (event.key === "Left") {
        rocket.x -= rocket.s; 
    }
    else if (event.key === "Right") {
        rocket.x += rocket.s;
    }
    else if (event.key === "Down") {
        rocket.y += rocket.s; 
    }
    else if (event.key === "Up") {
        rocket.y -= rocket.s;
    }
setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
});

function drawBackground() {
  image(bg1.img, "assets/6062b.png");
  image(bg2.img, "assets/6062a.png");
  setProperty(bg1.img, "fit", "cover");
  setProperty(bg2.img, "fit", "cover");
}

function drawScore(){
  textLabel("score", "Score: ");
  setPosition("score",200,20,110,30);
  setProperty("score", "text-color","green");
  setProperty("score", "border-color","green");
  setProperty("score", "border-width",5);
  setProperty("score", "border-radius",5);
}
function drawRocket() {
  image(rocket.img, "assets/rocket.gif");
  setProperty(rocket.img, "fit","fill");
  setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
}
function drawAsteroids() {
  image(asteroid.img, "assets/meteor.png");
  setProperty(asteroid.img, "fit","fill");
  setPosition(asteroid.img, asteroid.x, asteroid.y, asteroid.w, asteroid.h);
  image(asteroid2.img, "assets/meteor2.png");
  setProperty(asteroid2.img, "fit","fill");
  setPosition(asteroid2.img, asteroid2.x, asteroid2.y, asteroid2.w, asteroid2.h);
  image(asteroid3.img, "assets/rock.png");
  setProperty(asteroid3.img, "fit","fill");
  setPosition(asteroid3.img, asteroid3.x, asteroid3.y, asteroid3.w, asteroid3.h);
}



function moveAsteroid(asteroid) {
  asteroid.y += asteroid.s;
  setPosition(asteroid.img, asteroid.x, asteroid.y, asteroid.w, asteroid.h);
}

function checkCollision(obj1, obj2) {
  var xOv = Math.max(0, Math.min(obj1.x+obj1.w, obj2.x+obj2.w) - Math.max(obj1.x,obj2.x));
  var yOv = Math.max(0, Math.min(obj1.y+obj2.w, obj2.y+obj2.w) - Math.max(obj1.y,obj2.y));
  if (xOv>0 && yOv>0){
    startOver(obj1);
    score = score +2;
    playSound("assets/category_explosion/playful_game_explosion_5.mp3")
    setText("score", "Score: " + score);
  }
}

function scrollBackground(){
  bg1.x += bg1.s;
  bg2.x += bg2.s;
  setPosition(bg1.img, bg1.x,bg1.y,bg1.w,bg1.h);
  setPosition(bg2.img, bg2.x,bg2.y,bg2.w,bg2.h);
  if (bg1.x >= 319) {
    bg1.x = -320;
  }
  if (bg2.x >= 320) {
    bg2.x = -320;
  }
}

function startOver(obj1){
  obj1.y = randomNumber(-100, 0);
  obj1.x = randomNumber(10,300);
  obj1.s = randomNumber(3,8)
  setPosition(obj1.img, obj1.x, obj1.y, obj1.w, obj1.h);  
}

function checkRestart(obj1) {
  if (obj1.y >= 450) {
    startOver(obj1)
    score -= 1;
    playSound("assets/category_retro/retro_game_echo_error_2.mp3")
    setText("score", "Score: " + score);
  }  
}