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
scale(120);
model(orbo);
note=0;
}


}
