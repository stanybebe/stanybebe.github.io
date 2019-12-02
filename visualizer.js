let orbo;
function preload() {
orbo= loadModel('https://github.com/stanybebe/stanybebe.github.io/blob/master/assets/orbo.obj');
}

function setup() {
 createCanvas(700, 700,WEBGL);
}

function draw() {

if(note.number == 48) {
model(orbo);


}

}
