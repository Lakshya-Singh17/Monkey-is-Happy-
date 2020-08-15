var score;
var monkey,stoneGroup,bananaGroup; 
var monkey_walk,bananaImg,stoneImg,jungleImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  jungleImg = loadImage("jungle-1.png");
  
  monkey_walk = loadAnimation("Monkey_01.png","Monkey_02.png",
                        "Monkey_03.png","Monkey_04.png",
                        "Monkey_05.png","Monkey_06.png");
  
  bananaImg = loadImage("banana.png");
  
}
   
function setup() {
  createCanvas(600, 300);
  score = 0;
  
  jungle = createSprite(300,50);
  jungle.addImage("jungle", jungleImg);
  jungle.scale = 1.5;
  
  monkey = createSprite(50,230);
  monkey.addAnimation("monkeyWalking", monkey_walk);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(300,265,600,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  
}

function draw() {
  background(220);
  text("Score: " + score,550,50);
  
  console.log(monkey.y);
  
  jungle.velocityX = -4;
  
  spawnBananas();
  
  if(jungle.x < 150){
    jungle.x = 350;
  }
  
  if(keyDown("space") && monkey.collide(invisibleGround)){
     monkey.velocityY = -10;
  }
  
  monkey.collide(invisibleGround);
  monkey.velocityY += 0.6;
  drawSprites();
}

function spawnBananas(){
  if(frameCount % 50 === 0){
    var banana = createSprite(600,Math.round(random(140,250)));
    banana.addImage("Banana", bananaImg);
    banana.scale = 0.05;
    
    banana.velocityX = -5;
    banana.lifetime = 120;
    
    bananaGroup.add(banana);
    
    /*if (count>0 && count%100 === 0){
      banana.VelocityX -= 1;
    }*/
  }
}

function spawnStone(){
  if(frameCount % 150 === 0){
    var stone = createSprite(600,240);
    stone.addImage("Stone", stoneImg);
    stone.scale = 0.15;
    
    stone.velocityX = -6;
    stone.lifetime = 100;
   
    stoneGroup.add(stone);
    
    /*if (count>0 && count%100 === 0){
      stoneGroup.VelocityX -= 1;
    }*/
    
    stone.setCollider("circle",0,0,100);
    stone.depth = jungle.depth + 1;
  }
}