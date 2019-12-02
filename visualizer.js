let orbo;
function preload() {
orbo= loadModel('file:///Users/mac/Documents/GitHub/stanybebe.github.io/orbo.obj');
}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {

if(note.number == 48) {
model(orbo);


}


}
