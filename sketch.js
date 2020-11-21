var dogS,dog,happyDog;
var database;
var foodS; 
var foodStock;

function preload() {
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dogS = createSprite(250,250,50,50);
  dogS.addImage(dog);
  dogS.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dogS.addImage(happyDog);
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  })
}