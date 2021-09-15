var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var heading,scoreboard,lifeboard;
var blast;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  heading = createElement ("h1");
  scoreboard = createElement ("h1");
  lifeboard = createElement ("h1");

  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y=mouseY  

    if(keyDown ("space")){
    shootBullet ();
    }
    drawBlueBubble();
    drawRedBubble();
    drawSprites();

    scoreboard.html("Score : " + score);
    scoreboard.style ('color:red');
    scoreboard.position (width-200,10);
     
    lifeboard.html("Life : "+life);
    lifeboard.style ('color:red');
    lifeboard.position(width-200,45);

    if(blueBubbleGroup.collide(bulletGroup)){
    handleBubbleCollision(blueBubbleGroup);
  }
  if(redBubbleGroup.collide(bulletGroup)){
    handleBubbleCollision(redBubbleGroup);
  }
    handleGameOver(blueBubbleGroup);
  
  
  handleGameOver(redBubbleGroup);

   
}}

function shootBullet (){
 
  bullet = createSprite (100,gun.position.y);
  bullet.addImage (bulletImg);
  bullet.scale = 0.2;
  bullet.lifetime = 800;
  bullet.velocityX = 9
  bulletGroup.add (bullet);


}

function drawBlueBubble (){
  if(frameCount % 80 === 0){
  bluebubble = createSprite (800,random(100,700));
  bluebubble.velocityX = -7;
  bluebubble.scale = 0.1
  bluebubble.lifetime = 115;
  bluebubble.addImage(blueBubbleImg);
  blueBubbleGroup.add (bluebubble);
 }
}
function drawRedBubble (){
  if(frameCount % 100 === 0){
  redbubble = createSprite (800,random(100,700));
  redbubble.velocityX = -7;
  redbubble.scale = 0.125
  redbubble.lifetime = 115;
  redbubble.addImage(redBubbleImg);
  redBubbleGroup.add (redbubble);
 }
}
function handleBubbleCollision(bubbleGroup){
  if (life > 0){
    score = score +1;

    blast = createSprite (bullet.x,bullet.y);
    blast.addImage  (blastImg);
    blast.lifetime = 20;
    blast.scale = 0.3
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach ();


  }
}

function handleGameOver(bubbleGroup){
  console.log("handleGameOver")

  if(bubbleGroup.collide (backBoard)){
      life = life-1;
    bubbleGroup.destroyEach();
      if(life <= 0){
        gameState = 2;
        swal ({
          title: "Game Over",
          text:" Oops You Lost The Game... ",
          text: "Your Score is :" + score,
          imageUrl: 
         " https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          confirmButtonText : "Thanks for Playing",
        });
      }
  }
}