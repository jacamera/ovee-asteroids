var state = -1;

var bullets;
var goodObjects;
var badObjects;
var font;
var ship;
var shipImage, bulletImage, particleImage;
var collectibles = [];
var badImages = [];
var heart;
var table;
var hText = [];
var sad, happy, finger;

var finishedTutorial = false;
var numObjects = 10;
var twoDArray = [];
var MARGIN = 40;
var w, h;
var numGood = 10;

var startTime;
var elapsedTime;

var score = 0;
var life = 5;

var laser, boo, yay;

var introImage1, introImage2;

function preload(){
  laser = loadSound("assets/gameAssets/laser.wav");
  for (var i = 0; i< 10; i++){
    collectibles[i]= loadImage("assets/gameAssets/" + i + ".png");
  }

  for (var i = 0; i< 10; i++){
    badImages[i]= loadImage("assets/gameAssets/bad" + i + ".png");
  }
  boo = loadSound("assets/gameAssets/boo.wav");
  yay = loadSound("assets/gameAssets/yay.wav");

  introImage1 = loadImage("assets/gameAssets/3.png");
  introImage2 = loadImage("assets/gameAssets/bad5.png");
  bulletImage = loadImage("assets/gameAssets/asteroids_bullet.png");
  shipImage = loadImage("assets/gameAssets/asteroids_ship0001.png");
  particleImage = loadImage("assets/gameAssets/asteroids_particle.png");

  heart = loadImage("assets/gameAssets/heart.png");
  sad = loadImage("assets/gameAssets/sad.png");
  happy = loadImage("assets/gameAssets/sparkleHeart.png");
  finger = loadImage("assets/gameAssets/middleFinger.png");

  font = loadFont("assets/gameAssets/Gamegirl.ttf");

  table = loadTable("assets/gameAssets/gameHeadlines.csv", 'csv', 'header');
}

function setup() {
    w= windowWidth;
    h = windowHeight;
    
    createCanvas(w, h);

    ship = createSprite(w/2, h/2);
    ship.maxSpeed = 6;
    ship.friction = .98;
    ship.setCollider("circle", 0,0, 20);

    ship.addImage("normal", shipImage);
    ship.addAnimation("thrust", "assets/gameAssets/asteroids_ship0002.png", "assets/gameAssets/asteroids_ship0007.png");

    goodObjects = new Group();
    bullets = new Group();
    badObjects = new Group();

    var cellWidth = w/numObjects;
    var cellHeight = h/numObjects;

    for (var r = 0; r<table.getRowCount(); r++){
      hText[r] = table.getString(r, 0);
      // console.log(hText[r]);
    }

}

var interval = 200;
function draw() {
      w = windowWidth;
      h = windowHeight;

      background(0, 0, 153);
      textFont(font);

      //add state for collecting objects
      //add state for shooting objects
      //add skip tutorial button
      //

      if(state>=-1 && state < 2){
        drawSprites();
        spriteMovement();
      }

      if(state == -1){
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("WELCOME ESTROGEN ALLY! Join us in fighting the good fight", w/11, h*.15,w/1.2,h);

        var pulse = int(sin(frameCount/10)*1.5);
        var opacity = map(pulse, -1, 1, 0, 255);
        fill(255);
        textSize(24);
        text("ARROW KEYS TO NAVIGATE", w*.5, h*.65);
        text("SPACE BAR TO BLAST", w*.5, h*.71);

        fill(153, 255, 153, opacity);
        text("GOT IT? press C to continue", w/2, h*.9);
        if(keyWentDown("C")){
          state = 0;
          createGood(floor(random(0,numGood)), w*.26, h*.53, 0, 0);
          createBad(floor(random(0,numGood)), w*.32, h*.27, 0, 0);
        }
      }

      if(state === 0){
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Collect the sexy objects and stand up to the haters", w/11, h*.15,w/1.2,h);
        textSize(24);

        introImage1.resize(0, 100);
        introImage2.resize(450, 0);

        fill(153, 255, 153);
        // image(introImage1, w*.26, h*.45);
        // image(introImage2, w*.45, h*.46);
        text("SEXY", w*.26, h*.43);

        text("HATER", w*.64, h*.43);

        textSize(18);
        text("Run into me", w*.26, h*.67);
        text("Blast me by pressing Space", w*.65 , h*.67);




        var pulse = int(sin(frameCount/10)*1.5);
        var opacity = map(pulse, -1, 1, 0, 255);
        fill(255, opacity);
        textSize(24);
        text("press S to start", w/2, h*.9);

        if(keyWentDown("S")){
          state = 1;
          startTime = millis();
          life = 5;
          score = 0; 
        }
      }
      else if(state === 1){
        state1();
        elapsedTime = (millis() - startTime)/1000;
        // console.log(elapsedTime);
        if(frameCount%interval === 0){
          console.log("thisHappened");
          createGood(floor(random(0,numGood)), random(0, w), random(0, h), random(.5, 1), random(360));
          createBad(floor(random(0,numGood)), random(0, w), random(0, h), random(.5, 1), random(360));
          if(interval>120){
            interval -=1;
          }
        }
        if(elapsedTime>60){
          state = 2;
        }
        if(life<0){
          state = 3;
        }
      }
      else if (state === 2){
        fill(255);
        textAlign(CENTER);
        textSize(32);
        text("you had " + score + " wins!", 0, h*.35, w,h)
        text("Keep fighting the good fight", 0, h*.5, w, h);
        // var button;
        // button = createButton("Stay informed! Read more about what's happening in women's health");
        // button.position(w*.2, h*.6);
        // button.mousePressed(openWindow);
        var pulse = int(sin(frameCount/10)*1.5);
        var opacity = map(pulse, -1, 1, 0, 255);
        fill(255, opacity);
        textSize(18);
        text("press SPACE to play again", w/2, h*.8);

        if(keyWentDown("SPACE")){
          restart();
        }
      }
      else if (state === 3){
        fill(255);
        textAlign(CENTER);
        textSize(32);
        text("you let the haters get the best of you :(", 0, h*.35, w,h);
        text("Keep fighting the good fight",0, h*.5, w, h);
        // var button;
        // button = createButton("Stay informed! Read more about what's happening in women's health");
        // button.position(w/2, h*.6);
        // button.mousePressed(openWindow);
        textSize(18);
        var pulse = int(sin(frameCount/10)*1.5);
        var opacity = map(pulse, -1, 1, 0, 255);
        fill(255, opacity);
        text("press SPACE to play again", w/2, h*.8);

        if(keyWentDown("SPACE")){
          restart();
        }
      }
}

function openWindow(){
  window.location.href = '<a href="https://www.google.com" target="_blank" rel="nofollow">http://www.google.com</a>';
}

function spriteMovement(){
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
      if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
      if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
      if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
      if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
  shipMovement();

  ship.overlap(goodObjects, goodHit);

  goodObjects.bounce(goodObjects);
  goodObjects.bounce(badObjects);
  badObjects.bounce(badObjects);
  ship.bounce(badObjects, loseLife);

  goodObjects.overlap(bullets, goodShot);
  badObjects.overlap(bullets, badShot);
}

function state1(){
//boundaries for objects moving

  textSize(18);
  noStroke();

  fill(255);
  text("Wins: " + score, w*.6, h*.15);
  text("MORALE: ", w*.6, h*.1);
  text("TIME: " + round(60 - elapsedTime), w*.05, h*.1);

  fill(153, 255, 153);
  text("ARROW KEYS TO MOVE", w*.05, h*.85);
  text("SPACE BAR TO SHOOT", w*.05, h*.9);
  for(var i = 0; i<life; i++){
    heart.resize(25,25);
    image(heart, w*.73+ i*30, h*.075);
  }
}

function shipMovement(){
    if(keyIsDown(LEFT_ARROW)){
      ship.rotation -=4;
    }
    if(keyIsDown(RIGHT_ARROW)){
      ship.rotation += 4;
    }
    if(keyIsDown(UP_ARROW)){
      ship.addSpeed(.2, ship.rotation);
      ship.changeAnimation("thrust");
    }

    if(keyWentDown("SPACE"))
      {
      var bullet = createSprite(ship.position.x, ship.position.y);
      bullet.addImage(bulletImage);
      bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
      bullet.life = 30;
      bullets.add(bullet);
      laser.play();
      }
}


function badShot(badObjects, bullet) {
    for(var i=0; i<10; i++) {
      var p = createSprite(bullet.position.x, bullet.position.y);
      p.addImage(finger);
      p.scale = .2;
      p.setSpeed(random(3,5), random(360));
      p.friction = 0.95;
      p.life = 40;
    }
    yay.play();
    score ++;
    bullet.remove();
    badObjects.remove();
}

function goodShot(goodObjects, bullet){
    for(var i=0; i<10; i++) {
      var p = createSprite(bullet.position.x, bullet.position.y);
      p.addImage(sad);
      p.scale = .2;
      p.setSpeed(random(3,5), random(360));
      p.friction = 0.95;
      p.life = 40;
    }
    boo.play();
    bullet.remove();
    goodObjects.remove();
    life --;

}

function goodHit(ship, asteroid) {
    asteroid.remove();
    score++;
    yay.play();
    for(var i=0; i<10; i++) {
      var p = createSprite(ship.position.x, ship.position.y);
      p.addImage(happy);
      p.scale = .2;
      p.setSpeed(random(3,5), random(360));
      p.friction = 0.95;
      p.life = 40;
    }
}

function loseLife(){
  life --;
  boo.play();
  for(var i=0; i<5; i++) {
    var p = createSprite(ship.position.x, ship.position.y);
    p.addImage(sad);
    p.scale = .2;
    p.setSpeed(random(3,5), random(360));
    p.friction = 0.95;
    p.life = 40;
  }
}

function createGood(type, x, y, speed, rotation) {
  var a = createSprite(x, y);

  a.addImage(collectibles[type]);
  a.addSpeed(speed, rotation);
  a.scale = .3;
  a.type = type;
  a.setCollider("rectangle", 0, 0, collectibles[type].width, collectibles[type].height);
  goodObjects.add(a);
  return a;
}

function createBad(type, x, y, speed, rotation){
  var b = createSprite(x, y);

  b.draw = function(){
    stroke(0);
    fill(255);
    rect(x, y, w*.35, h*.1);
    fill(0);
    textFont('Avenir');
    textSize(18);
    text(hText[type], x-10, y, w*.3, h*.1);

  }

  b.addSpeed(speed, rotation);
  // random(.5, 1), random(360)
  b.setCollider("rectangle", x, y, w*.35, h*.1);

  b.type = type;
  badObjects.add(b);
  return b;
}

function restart(){
  location.reload();
}
