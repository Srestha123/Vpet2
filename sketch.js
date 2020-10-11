
var database,dog2,foodS,foodStock,dog,happyDog,tm,hr,dn;
function preload()
{
 dog1=loadImage("images/dogImg.png");
 dog2=loadImage("images/dogImg1.png");
}
function setup() {
  createCanvas(500, 500);
  feed=createButton("FEED THE DOG");
  feed.position(700,70);
  refill=createButton("ADD FOOD");
  refill.position(700,95);
  refill.mousePressed(addFood);
  database=firebase.database();
  dog=createSprite(250,400,10,10);
  dog.scale=0.2;
  ground=createSprite(250,490,500,10);
  ground.visible=false;
  dog.addImage(dog1);
  hr=hour();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  timefed=database.ref('lastfed');
  timefed.on("value",readtm);
  
  milk=new Food();
}
function draw() {  
background(46,139,87);
dog.collide(ground);
milk.display();
mp();
  drawSprites();
 fill("yellow");
 textSize(15); 
 text("FOOD REMAINING:"+foodS,10,15);
 if(hr===0){
   text("LAST-FED:"+tm+"AM",10,30)
 }
if(hr<12){
 text("LAST-FED:"+tm+"AM",10,30); 
}
if(hr>=12){
  text("LAST-FED:"+tm+"PM",10,30);
}
text(dn,100,100);
}
function readStock(data){
  foodS=data.val();
  console.log(foodS);
}
function writeStock(){
  if(foodS<=0){
    foodS= 0;
  }
  else{
    foodS=foodS-1
  }
    database.ref('/').update({
        Food:foodS
      })
      writetm(tm);
      if(foodS!=0&&foodS>=1){
      dog.velocityY=-20;
      }
     dog.addImage(dog2);
}
function addFood(){
  if(foodS>=30){
    foodS=30;
  }
  else{
    foodS=foodS+1;
  }
  database.ref('/').update({
   Food:foodS 
  })
  dog.addImage(dog1);
}
function readtm(data){
tm=data.val();
}
function writetm(z){
  z=hour();
  if(z>12){
    z=z-12;
  }
  if(z===0){
    z=12;
  }
  database.ref('/').update({
    lastfed:z
  })
}
function mp(){
  feed.mousePressed(writeStock);
  if (dog.y<=130){
dog.velocityY=dog.velocityY+30;
  }
  }
 