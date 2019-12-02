let orbo;
var timer=60;
function preload() {
orbo= loadModel('assets/orbo.obj');
}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {
background(254,116,47);

timer--;
if( note == 48) {
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
}else{timer=60;
note=0;

}

if( note == 49) {
  if(timer>0){
    push();
    rotateZ(frameCount*.1);
    rotateY(frameCount*.1);
let ci = color(104,56,183); // Define color 'c'
fill(ci); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes

torus(100,10);
pop();
}else{timer=60;
note=0;

}

}


}
}
