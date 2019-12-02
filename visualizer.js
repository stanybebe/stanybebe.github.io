//let orbo;
//function preload() {
//orbo= loadModel('https://github.com/stanybebe/stanybebe.github.io/blob/master/assets/orbo.obj');
//}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {
background(200,0,255);
rotateX(frameRate*.001);
if( note == 48) {
box(100);

}else {
  note=0;
}

}
