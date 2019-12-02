let orbo;
function preload() {
orbo= loadModel('assets/orbo.obj');
}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {
background(200,0,255);
rotateX(frameCount*.01);
if( note == 48) {
let c = color(255, 204, 0); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(10);
model(orbo);
note=0;
}


}
