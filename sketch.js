var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var jems,jems1;
var bg2 ;
var stone;
var sprite;
var bush;
var obstaclesGroup;

var gameOver, restart;


function preload(){
  bg1 = loadImage("images/background.jpg");
  jems = loadImage("images/d.png");
  jems1 = loadImage("images/d1.png");
  bush = loadImage("images/bush.png");
  sprite = loadAnimation("images/princess.gif");
  stone = loadImage("images/stone.png");
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  jumpSound = loadSound("images/jump.wav");
  collidedSound = loadSound("images/collided.wav");
}

function setup() {
  createCanvas(800, 400);

bg2 = createSprite(400,100,50,40);
bg2.addImage("bg",bg1);

sprite1= createSprite(400,90,50,40);
sprite1.addAnimation("s",sprite);
sprite1.scale = 0.2;
   
invisibleGround = createSprite(200,150,1600,10);
invisibleGround.visible = false;


gameOver = createSprite(400,100);
gameOver.addImage(gameOverImg);

restart = createSprite(550,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.1;

gameOver.visible = false;
restart.visible = false;

shrubsGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(225); 

  sprite1.x = World.mouseX

  if (gameState===PLAY){

  bg2.velocityY=-3 

  if(bg2.y<100)
    {
       bg2.y=400
    }

    sprite1.velocityX = sprite1.velocityX + 0.8

    spawnShrubs();
    spawnObstacles();

    sprite1.collide(invisibleGround);

    }

    if(obstaclesGroup.isTouching(sprite1)){
      obstaclesGroup.destroyEach();
      gameState = END;
  }

    if(shrubsGroup.isTouching(sprite1)){
      score = score + 1;
      shrubsGroup.destroyEach();
      jumpSound.play();
    }

  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    sprite1.visible = false;
    bg2.visible = false;
    obstaclesGroup.visible = false;
    shrubsGroup.visible = false;
  
    sprite1.velocityY= 0;
    bg2.velocityY= 0;
    obstaclesGroup.setVelocityYEach(0);
    shrubsGroup.setVelocityYEach(0);

     //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     shrubsGroup.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)) {
         reset();
     }
  }
 

  drawSprites();

  
}


function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.y+170,400,40,10);
  obstacle.scale = 0.1;
  obstacle.velocityY=-2 ;
 
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(bush);
              break;
      case 2: obstacle.addImage(stone);
              break;
      default: break;
    }
  
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}


function spawnShrubs() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.Y+800,200,40,10);
 
    shrub.scale = 0.15;

    shrub.velocityY=-2 ;


    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: shrub.addImage(jems);
              break;
      case 1: shrub.addImage(jems1);
              break;
      default: break;
    }
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
  }}

    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      sprite1.visible = true;
      bg2.visible = true;
      obstaclesGroup.visible = true;
      shrubsGroup.visible = true;
      obstaclesGroup.destroyEach();
      shrubsGroup.destroyEach();
      score = 0;
    }