var sword, bomb, fruit, edges;
var swordImg, bombImg;
var fruit1, fruit2, fruit3, fruit4;
var gameOverSound, hitSound;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOverImg;
var score = 0;
var fruitGrp, bombGrp

function preload() {
  swordImg = loadImage("sword.png");
  bombImg = loadImage("bomb.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameOver.mp3");
  hitSound = loadSound("sword.mp3");
  song = loadSound("Song.mp3")
}

function setup() {
  createCanvas(400, 400)

  sword = createSprite(200, 200, 20, 20)
  sword.addImage(swordImg)
  sword.scale = 0.3
  sword.debug = true
  var score = 0
  var x = createEdgeSprites();
  fruitGrp = createGroup();
  bombGrp = createGroup();
  song.play();
}



function draw() {
  background(rgb(160, 219, 229))

  if (gameState === PLAY) {
    sword.y = World.mouseY
    sword.x = World.mouseX

    fruits();
    bombs();
  } else if (gameState === END) {
    sword.x = 200
    sword.y = 200
    sword.addImage(gameOverImg)
    sword.scale = 1
    fruitGrp.destroyEach();
    bombGrp.destroyEach();
    if (mousePressedOver(sword)) {
      gameState = PLAY
      sword.addImage(swordImg)
      sword.scale = 0.4
      song.play()
    }
  }
  if (fruitGrp.isTouching(sword)) {
    fruitGrp.destroyEach();
    score = score + 2
    hitSound.play();
  }
  if (bombGrp.isTouching(sword)) {
    gameState = END
    gameOverSound.play();
    song.stop();
    score = 0
  }

  drawSprites();
  fill("red")
  textSize(12)
  text("score : " + score, 350, 15)
}

function fruits() {
  if (World.frameCount % 10 === 0) {
    fruit = createSprite(random(20, 380), random(20, 380), 10, 10)
    fruit.scale = 0.1
    r = Math.round(random(1, 4))
    if (r === 1) {
      fruit.addImage(fruit1)
    } else if (r === 2) {
      fruit.addImage(fruit2)
    } else if (r === 3) {
      fruit.addImage(fruit3)
    } else {
      fruit.addImage(fruit4)
    }
    fruit.lifetime = 100
    fruit.setVelocity(random(-5, 5), random(-5, 5))
    fruitGrp.add(fruit)



  }

}

function bombs() {
  if (World.frameCount % 30 === 0) {
    bomb = createSprite(random(75, 325), random(75, 325), 10, 10);
    bomb.addImage(bombImg);
    bomb.scale = 0.5;
    bomb.lifetime = 60;
    bomb.setVelocity(random(-5, 5), random(-5, 5))
    bombGrp.add(bomb)
    bomb.velocityX = -(8 + (score / 10));
  }
}