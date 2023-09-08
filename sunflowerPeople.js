let obj;
let myShader;
let tex;
let r;
let g;
let b;
let rA;
let gA;
let bA;
let WingA;
let WingB;
let WingC;
let WingD;
let t = 0;
let cam;
let val = 8;
let playerx = 0;
let playery = 0;
let ene = [];
let wav = [];
let speedE =20;
let c=0;
let cb=0;
let particles = [];
let etype;
let explode = false;
let numFlowers= 0;
let divison = [8,16,32,64];
let currDiv = 0;
let widthy;
const bpm = 132;
const quarterNoteDuration = 60 / bpm;
//bpm 132//
let delta = 0.4;
let gameState =0;
let win=0;
function preload() {
  obj = loadModel("eubee.obj", true);
  myShader = loadShader("sunflower.vert", "sunflower.frag");
  song = loadSound('Sunflower People.mp3');
  tex = loadImage("eutex.png");
  myFont = loadFont('vcr.ttf');
}
function changeColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  rA = random(0, 1);
  gA = random(0, 1);
  bA = random(0, 1);
}

function setup() {
  if (windowWidth<1000){
    win = 1
  }
  else {
    win = 0
  }

if(win==1){
 widthy = window.innerWidth;

}else{
  widthy = 800;
}
 console.log(widthy)
 var sketchCanvas = createCanvas(widthy,widthy,WEBGL);
 sketchCanvas.parent("myCanvas");


  getAudioContext().suspend();
  noStroke();
  fft = new p5.FFT(.2,64);

  buttonB = createButton("play");
  buttonB.style("display", "inline-block");
  buttonB.style("text-align", "center");
  buttonB.style("padding", "20px");
  buttonB.style("border-radius", "50%");
  buttonB.position(windowWidth/2, height-100);


  WingA = new Wing(-8, -10, 90, 1.2);
  WingB = new Wing(8, -10, -90, 1.2);
  WingC = new Wing(-8, 0, 90, 0.5);
  WingD = new Wing(8, 0, -90, 0.5);
  e= new Enemy(100,0,100,30,);
  cam = createCamera();
  cam.tilt(-0.8);
  changeColor();

  

}

function draw() {
  t++;
  c++;
  cb++;
  // orbitControl();
  buttonB.mousePressed(handleButton)
  song.onended(handleSongEnd);

  let sine = sin(t * 30) * 15;
  switch (gameState){
   case 0:
    cam.setPosition(0, 150, 150);
    background(r, b, g);
    directionalLight(255, 255, 255, -1, 1, -2);
    push();
    rotateZ(t);
 
    eug(0, 0, sine,0);
    pop();
    makeIntroText();
   break;

   case 1:
  
    cam.setPosition(0, 700, 550);
    background(r, b, g);
    push();



    let textString = "sunflowers ="+numFlowers;

    let fontSize = 30;
  
    
    textAlign(CENTER, CENTER);
    textSize(fontSize);
    textFont(myFont)
   
    text(textString, 0, 500);

    pop();
    // makeWaves();
    directionalLight(255, 255, 255, -1, 1, -2);

    if (cb>60/(128*bpm)*1000){
      cb=0;
     wav.push( makeWaves());
    
    }
  
    if (c>60/(divison[currDiv]*bpm)*1000){
      c=0;
     ene.push( makeEnemies());
      // drawEnemies();
      console.log(ene);
    }
    if(wav.length>0){
      for (let w of wav){
        w.changeColor(g+20,r+20,b+20);
  
        w.drawMe(speedE);
       
  
      }
       for(ww in wav){
  
        wav[ww].checkBounds();
        if(wav[ww].deleteMe==1){
          wav.splice(ww,1);
        }
       }
    }
    if(ene.length>0){
      for (let e of ene){
        if(e.rt==3){
          console.log("hi");
          e.changeColor(g,r,b);
        }else{
        e.changeColor(255,255,255);
        }
        e.drawMe(speedE,30,sine,0,0);
    
  
      }
       for(ee in ene){
        ene[ee].checkHit(playerx,playery);
        ene[ee].checkBounds();
  
  
        if(ene[ee].explodeMe==1&&ene[ee].rt!=3){
          explode = 1;
          etype =0;
          numFlowers=numFlowers-1;
        
        }
        if(ene[ee].explodeMe==1&&ene[ee].rt==3){
          explode = 1;
          etype =1;
          numFlowers=numFlowers+1;
        }
  
        if(ene[ee].deleteMe==1){
          ene.splice(ee,1);
        }
  
       }
    }
    if(numFlowers<0){
      numFlowers=0;
      
    }
    if(numFlowers==0){
      currDiv =0;
      speedE = 15;
    }
    if(numFlowers>=2){
      currDiv =1;
      speedE = 25;
    }
    if(numFlowers>=4){
      currDiv =2;
      speedE = 30;
    }
    if(numFlowers>=6){
      currDiv =3;
      speedE = 35;
    }
    if (win==1) {
      console.log("ismobile");
      playerMoveMobile();
   } else {
    playerMoveDesktop();
   }
   
    
    makeExplosion(playerx,playery,etype);
     eug(playerx, playery, sine,0);
     
    
  
   break;

   case 2:
    cam.setPosition(0, 150, 150);
    background(r, b, g);
    directionalLight(255, 255, 255, -1, 1, -2);
    push();
    rotateZ(t);
 
    eug(0, 0, sine,0);
    pop();
    makeOutroText();
   break;

  }


  
  
  

 
}

function handleButton(){
  gameState = 1;
  buttonB.style("visibility", "hidden")
  playPressed();
}
function handleSongEnd(){
  gameState = 2;

}
//////////////////////////////////PLAYER CLASS ////////////////////////////////////
function eug(xin, yin, s,debug) {
  push();
    if(debug==true){
      noFill();
      stroke(255,255,0);
    rect(xin-50,yin-50,100,100);
  }
 pop();

  push();
  
  translate(xin, yin, 0);
  myShader.setUniform("fraction", 1.0);
  myShader.setUniform("colA", rA);
  myShader.setUniform("colB", bA);
  myShader.setUniform("colC", gA);
  myShader.setUniform("texture", tex);
  shader(myShader);

  WingA.changeColor(rA, bA, gA);
  WingB.changeColor(rA, bA, gA);
  WingC.changeColor(rA, bA, gA);
  WingD.changeColor(rA, bA, gA);

  WingA.drawMe(-8, -10, s + 40, 1.2);
  WingB.drawMe(8, -10, -s - 40, 1.2);
  WingC.drawMe(-8, 0, s + 40, 0.5);
  WingD.drawMe(8, 0, -s - 40, 0.5);

  ambientMaterial(255, 255, 255);
  // rotateY(frameCount * -0.4);
  push();
  scale(0.5);
  rotateX(90);
  rotateY(270);
  model(obj);
  pop();

  pop();
 
}

function makeIntroText(){
  push();



  let textString = "sunflower people";
  let textStringb = "by euglossine";
  let fontSize = 30;

  
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  textFont(myFont)
 
  text(textString, 0, -130);
  textSize(15);
  text(textStringb, 0, -100);
  pop();

  push();
  noLights();
  fill(b,g,r);

  translate(0,0,-20);
  rotateX(0);
  rotateZ(t)
  angleMode(DEGREES);
  for(let i = 0;i<8;i++){
     rotateZ(360/8)
      ellipse(0,70+sin(t*.3)*30, 30, 60);
  }
  pop();

}

function makeOutroText(){
  push();



  let textString = "thanks for playing";
  let textStringb = "final score: "+numFlowers;
  let fontSize = 30;

  
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  textFont(myFont)
 
  text(textString, 0, -130);
  textSize(15);
  text(textStringb, 0, -100);
  pop();

  push();
  noLights();
  fill(b,g,r);

  translate(0,0,-20);
  rotateX(0);
  rotateZ(t)
  angleMode(DEGREES);
  for(let i = 0;i<8;i++){
     rotateZ(360/8)
      ellipse(0,70+sin(t*.3)*30, 30, 60);
  }
  pop();

}


function makeEnemies(){
  let enemy = new Enemy(-height/2,30,0);
  console.log(enemy);
  return enemy;
}

function makeWaves(){
  let wavee = new Waves(0,-height/2);
  return wavee;
}

function makeExplosion(xin,yin,type){
push()
  if (explode) {
    if(type==0){
    for (let i = 0; i < 10; i++) {
      let angle = random(0,360);
      let speed = random(5, 15);
      let particle = new Particle(xin,yin, speed * cos(angle), speed * sin(angle),type);
      particles.push(particle);
    }}
    else{
      let angle = random(0,360);
      let speed = random(5, 15);
      let particle = new Particle(xin,yin, speed * cos(angle), speed * sin(angle),type);
       particles.push(particle);
    }
    explode = false; 
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display(xin,yin);
    if (p.isFinished()) {
      particles.splice(i, 1); 
    }
  }
pop()
}


//////////////////////////////////PLAYER CLASS END////////////////////////////////////

//////////////////////////////////Wing CLASS////////////////////////////////////
class Wing {
  constructor(x_, y_, rot, scl) {
    this.x_ = x_;
    this.y_ = y_;
    this.rot = rot;
    this.scl = scl;
    this.rA = 0;
    this.gA = 0;
    this.bA = 0;
    this.t =0;
  }

  drawMe(xin, yin, rotin, sclin) {
    
    this.x_ = xin;
    this.y = yin;
    this.rot = rotin;
    this.scl = sclin;

    push();

    noStroke();
    translate(0, 0, 20);
    angleMode(DEGREES);
    rotateZ(this.rot);

    scale(this.scl);
    beginShape();

    vertex(this.x_, this.y_);
    vertex(this.x_ - 10, this.y_ + 50);
    vertex(this.x_, this.y_ + 70);
    vertex(this.x_ + 10, this.y_ + 50);

    endShape();
    fill(this.rA, this.gA, this.bA);
    pop();
  }

  changeColor(r, g, b) {
    this.rA = r;
    this.gA = g;
    this.bA = b;
  }
}
//////////////////////////////////Wing CLASS END////////////////////////////////////

//////////////////////////////////ENEMYCLASS////////////////////////////////////
class Enemy {
  constructor( y_, rot, scl) {
    this.x_ = random(-width/2,width/2);
    this.y_ = -height/2;
    this.rot = rot;
    this.scl = scl;
    this.rA = 0;
    this.gA = 0;
    this.bA = 0;
    this.deleteMe = 0;
    this.explodeMe = 0;
    this.t=0;
    this.debug =0;
    this.enX;
    this.enY;
    this.rs= random(10);
    this.rr= random(10);
    this.rt = round(random(3));
    this.c = 0;
    this.lr = 0;
    
  }

  drawMe( speed, sclin, rotin, type, debugin) {
    this.t = this.t+1*speed;
   
    this.rot = rotin;
    this.scl = sclin;
    this.debug = debugin;
    
   
    switch (this.rt) {
      case 0:
        push();
        drawCone(this.x_,-height/2+this.t,30,this.t*.03,this.gA,this.bA,this.rA);
        if (this.debug==1){
         push();
          noFill();
          stroke(255,255,0);
          rect(this.x_-25,-height/2+this.t-25,60,60);
         pop();
        }
        pop();
        break;
      case 1:
        push();
        noFill();
        stroke(255,255,255);
        strokeWeight(2);
        let sine = sin(this.t*.9)*this.rs;
        this.x_ += sine;
        translate(this.x_-25,-height/2+this.t-25);

        box(50);
        if (this.debug==1){
          push();
          noFill();
          stroke(255,255,0);
          rect(this.x_,-height/2+this.t,60,60);
         pop();
        }
        pop();
        break;
      case 2:
        push();
        noFill();
        stroke(255,255,255);
        strokeWeight(2);
        this.c++;
        if (this.c>20){
          this.rr = random(10);
          this.c=0;
        }
        if (this.rr>4){
          this.lr = 10
        }else{
          this.lr = -10
        }
        this.x_ += this.lr;
        translate(this.x_-25,-height/2+this.t-25);

        sphere(40,5,5);
        if (this.debug==1){
          push();
          noFill();
          stroke(255,255,0);
          rect(this.x_,-height/2+this.t,50,50);
         pop();
        }
        pop();
        break;
        case 3:
          push();
          noLights();
          fill(this.bA,this.rA,this.gA);
          translate(this.x_-25,-height/2+this.t-25);
       
          // translate(this.x_-25,-height/2+this.t-25);
          rotateX(-50);
          rotateZ(t)
          angleMode(DEGREES);
          for(let i = 0;i<8;i++){
             rotateZ(360/8)
              ellipse(0,70, 30, 60);
          }
          pop();

          break;
    }
    if(-height/2+this.t-50>height/2){
      this.deleteMe =1;
    }else{
      this.deleteMe =0;
    }
  }

  checkHit(xin,yin){
    this.enX = this.x_-25;
    this.enY = -height/2+this.t;
    
    if(this.enX>xin-60 && this.enX<xin+60 && this.enY>yin-60 && this.enY<yin+60){
      this.deleteMe =1;
      changeColor();
      this.explodeMe = 1;
    }else{
      this.deleteMe =0;
      this.explodeMe = 0;
    }

   
    
  }

  checkBounds(){
  
    let eY = -height/2+this.t;
    if( eY>height/2 ){
      this.deleteMe =1;
   
    }
  }
    changeColor(r, g, b) {
    this.rA = r;
    this.gA = g;
    this.bA = b;
  }
}
//////////////////////////////////ENEMYCLASS END////////////////////////////////////
function playerMoveMobile(){

  if(touches.length>=1){
    playerx = -width/2+touches[0].x;
    playery = -height/2+touches[0].y;
  }


  if (playery < -height / 2 + 16) {
    playery = -height / 2 + 16;
  }

  if (playerx > width / 2 - 16) {
    playerx = width / 2 - 16;
  }

  if (playerx < -width / 2 + 16) {
    playerx = -width / 2 + 16;
  }
}
function playerMoveDesktop() {
  if (keyIsDown(UP_ARROW)) {
    playery = playery - val;
  }

  if (keyIsDown(DOWN_ARROW)) {
    playery = playery + val;
  }

  if (keyIsDown(LEFT_ARROW)) {
    playerx = playerx - val;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    playerx = playerx + val;
  }

  if (playery > height / 2 - 16) {
    playery = height / 2 - 16;
  }

  if (playery < -height / 2 + 16) {
    playery = -height / 2 + 16;
  }

  if (playerx > width / 2 - 16) {
    playerx = width / 2 - 16;
  }

  if (playerx < -width / 2 + 16) {
    playerx = -width / 2 + 16;
  }
}

function drawCone(xin,yin,scale,rot,r,g,b){
  push();
    let sides = 10;
  
  let coneRadius = 1*scale;

  let angleIncrement = TWO_PI / sides;
  angleMode(RADIANS);
  noFill();
  stroke(r,g,b);
  strokeWeight(2)
  translate(xin, yin);
  rotateX(1.5708);
  rotateZ(rot);
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle1 = i * angleIncrement;
    let angle2 = (i + 1) * angleIncrement;
    
    let x1 = cos(angle1) * coneRadius;
    let y1 = sin(angle1) * coneRadius;
    let x2 = cos(angle2) * coneRadius;
    let y2 = sin(angle2) * coneRadius;

    vertex(0, 0);
    vertex(x1, y1,50);
    vertex(x2, y2,50);
  }
  endShape(CLOSE);
  pop();
}
function playPressed() {
  if (song.isPlaying()) {
    
  
    song.pause(); 
   
  } else {
    userStartAudio();

    song.play();
   
   
  }
}
//////////////////////////////////explosionCLASS////////////////////////////////////
class Particle {
  constructor(x, y, vx, vy,type) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
    this.size = random(5, 15);
    this.rot = random(360);
    this.rx = random(-10,10);
    this.ry = random(-10,10);
    this.type = type;
    this.t = 0;
  }

  update() {
    
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  display(xin,yin) {
    if (this.type ==0){
    push();
    translate(xin,yin);
    angleMode(DEGREES);
    stroke(255,this.alpha);
    strokeWeight(2)
    rotateZ(this.rot);
    line(this.x,this.rx,this.y,this.ry)
    pop();
    }else{
   push();
   this.t++;
          noLights();
          fill(255,this.alpha);
          translate(xin,yin);
       
          // translate(this.x_-25,-height/2+this.t-25);
          rotateX(-50);
          rotateZ(frameCount)
          angleMode(DEGREES);
          push();
          for(let i = 0;i<8;i++){
             rotateZ(360/8)
              ellipse(0,70+this.t, 30, 60);
          }
          pop();
        
          pop();
    }
  }

  isFinished() {
   
    return this.alpha <= 0;
  }
}
//////////////////////////////////explosionCLASSEND////////////////////////////////////
//////////////////////////////////WAVECLASS////////////////////////////////////
class Waves{
  constructor(x,y){
    this.x = x;
    this.y = -height/2;
    this.deleteMe =0;
    this.t=0;
    this.rA = 0;
    this.gA = 0;
    this.bA = 0;
    this.setWave = 1;
    this.curw=[];

    
  }

 
  
  drawMe(speed){
    this.t = this.t+1*speed;
  push();
  let waveform = fft.waveform();

  if(this.setWave==1&& this.curw.length === 0){
   this.curw = Array.from(waveform);
   this.setWave =0;
  }
  translate(this.x,-height/2+this.t,-30)
  rotateX(120);
 
  
  noFill();
  stroke(this.rA,this.gA,this.bA);
  strokeWeight(5);
  beginShape();

  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, -width/3, width/3);
    let y = map( this.curw[i], -1, 1, -height/6, height/6);
    vertex(x,y);
  }
  endShape();
  pop();
}

checkBounds(){
  
  let eY = -height/2+this.t;
  if( eY>height/2 ){
    this.deleteMe =1;
 
  }
}

changeColor(r, g, b) {
  this.rA = r;
  this.gA = g;
  this.bA = b;
}
}
//////////////////////////////////WAVECLASSEND////////////////////////////////////
