let orbo;
let blkh;
let orange;
let leaf;
let dbox;
let cloud;
var wheel;

var timer=20;
var sine;

function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('assets/1.mp3');
mySoundb = loadSound('assets/2.mp3');
mySoundc = loadSound('assets/3.mp3');
mySoundd = loadSound('assets/4.mp3');
orbo= loadModel('assets/orbo.obj');
blkh = loadImage('assets/black heart.png');
orange = loadImage('assets/orange wheel.png');
leaf = loadImage('assets/leaf.png');
dbox = loadImage('assets/double box.png');
cloud = loadImage('assets/cloud.png');
wheel = loadImage('assets/wheel.png');


}

function setup() {
 createCanvas(700, 700,WEBGL);
 player = MIDI.Player;

 player.loadFile('test.mid', player.start);
 player.playing =true;
}

function draw() {


background(254,116,47);
sine = sin(frameCount*.003)*200;

timer--;



if(keyIsPressed === true){
if(key === 'a') {
  mySound.setVolume(0.1);
  mySound.play();
  if(timer>0){

push();
rotateX(frameCount*.1);
rotateY(frameCount*.1);
let c = color(255,208,175); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(10);
model(orbo);
pop();
}else{timer=20;
return false;

}
}


if( key ==='s') {
  mySoundb.setVolume(0.1);
  mySoundb.play();
  if(timer>0){
    console.log('hey');
    push();
    rotateZ(sine);
    rotateY(sine);
let ci = color(104,56,183); // Define color 'c'
fill(ci); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes

torus(sine,10);
pop();
}else{timer=60;
;
return false
}

}

if( key ==='d') {
  mySoundc.setVolume(0.1);
  mySoundc.play();
  if(timer>0){
    push();
rotateZ(frameCount*.1);
texture(wheel);
plane(sine);

pop();
}else{timer=20;
return false;

}

}

if( key ==='f') {
  mySoundd.setVolume(0.1);
  mySoundd.play();
  if(timer>0){
    push();
for (var i = 0; i < 200; i=i+30) {
  fill(0,0,0,0);
  texture(leaf);

  translate(i,i);
  rotateZ(frameCount*.05);
  rotateY(frameCount*.05);
  plane(i);

}


pop();
}else{timer=20;
return false;

}

}



}


}