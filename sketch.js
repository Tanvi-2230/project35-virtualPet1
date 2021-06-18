//Create variables here
var dog, database, foodS, foodStock;
var dogImg, happyDogImg;
var backgroundImg;


function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");

}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);


  dog = createSprite(230,270, 50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  
}


function draw() {  
  background(46, 139, 87);
  
  if(foodS !== undefined){

    textSize(20);
    fill(0);
    text("NOTE: Press UP_ARROW to feed the Drago milk!", 40, 50 );
    text("Food left:"+ foodS, 180, 130);

    if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
   }
    if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg)
   }
   if(foodS === 0){
     foodS =  20;
   }
}
  drawSprites();

}

function readStock(data){
  foodS = data.val();
}


function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  })
  }
  


