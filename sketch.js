
var path,rider;
var riderimg;
var truck,car;
var gameover;
var win;
var pathImg;
var truckImg,carImg;
var fallIMG;

var gameOver;
var winimg;

var truckgroup;
var cargroup;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  
 
pathImg = loadImage("road.png");
riderimg = loadAnimation("mainPlayer1.png","mainPlayer2.png");
fallIMG = loadImage("mainPlayer3.png")
carImg = loadImage("Car.png");
truckImg = loadImage("truck.png");
gameOver=loadImage("gameOver.png");

}

function setup(){
  createCanvas(600,400);

  

path=createSprite(100,200);
path.addImage(pathImg);
path.depth=path.depth+1;
path.scale=0.9;


rider  = createSprite(100,150,20,20);
rider.addAnimation("bike",riderimg);
rider.addAnimation("fell",fallIMG);
rider.scale=0.08;
rider .setCollider("rectangle",0,0,1000,1500);

  

gameover= createSprite(250,50,60,20);  
gameover.addImage("over",gameOver);
gameover.scale=0.7;
gameover.visible=false;
gameover.depth=gameover.depth+1;


cargroup= new Group(); 
truckgroup= new Group();  

}

function draw() {
  background(0);
  
  drawSprites();
  
 
  textSize(20);
  fill("yellow");
  text("Distance: "+ distance,350,30);

  
  if(gameState===PLAY){
    
  
    rider.changeAnimation("bike",riderimg); 

  rider.y = World.mouseY;
    

    edges= createEdgeSprites();
    
  
  rider .collide(edges);
   

   

  var select_opp=Math.round(random(1,2));
  if(frameCount%150==0){
  switch(select_opp){
        case 1: vehicle1();
              break;
      case 2: vehicle2();
              break;
      default: break;
    }
    }   
  
 
  if(rider.isTouching(cargroup)){
    gameState=0;
    rider.changeImage(fallIMG);
    gameover.visible=true;
    }
  if(rider.isTouching(truckgroup)){
    gameState=0;
    rider.changeImage(fallIMG);
    gameover.visible=true;
    }
 
  

  if(path.x < 0 ){
    path.x = path.width/2;
    
  }
    
 
  distance=distance+Math.round(getFrameRate()/55); 
  }
  
  if(gameState==END){

    gameover.visible=true;

    rider.changeAnimation("fell",fallIMG);

    path.velocityX=0;
    cargroup.setVelocityXEach(0);
    cargroup.setLifetimeEach(-1);
 
    truckgroup.setVelocityXEach(0);
    truckgroup.setLifetimeEach(-1);



    if(keyDown("UP_ARROW")){
      reset();
    }
  } 
  
  }  
    


function vehicle1(){
  car= createSprite(500,Math.round(random(125,320)),10,10);
  car.addImage(carImg);
  car.scale=0.7;
  car.velocityX=-(6+2*distance/150);
  car.setLifeTime=100;
  cargroup.add(car);
}

function vehicle2(){
  truck= createSprite(500,Math.round(random(125,320)),10,10);
  truck.addImage(truckImg);
  truck.scale=0.7;
  truck.velocityX=-(6+2*distance/150);
  truck.setLifeTime=100;
  truckgroup.add(truck);
  
}


//creating the reset function
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  truckgroup.destroyEach();
  cargroup.destroyEach();
  distance=0;
}