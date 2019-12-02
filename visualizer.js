let orbo;
var timer=60;
function preload() {
orbo= loadModel('assets/orbo.obj');
}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {
background(200,0,255);
rotateX(frameCount*.1);
rotateY(frameCount*.1);
timer--;
if( note == 48) {
  if(timer>0){
let c = color(255, 204, 0); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(10);
model(orbo);
}else{timer=60;
note=0;

}

}


}
