var canvasDiv = document.getElementById('myCanvas');
var width = myCanvas.clientWidth;
function preload() {
  // note that we are using two instances
  // of the same vertex and fragment shaders
  redGreen = loadShader('bkg.vert','bkg.frag');
}

function setup() {
  createCanvas(width, 230, WEBGL);
 var sketchCanvas = createCanvas(width,450);
 sketchCanvas.parent("myCanvas");

}

function draw() {
  shader(redGreen);
  redGreen.setUniform("u_resolution", [width, height]);
  redGreen.setUniform("u_time", millis() / 1000.0);
  rect(0,0,width, height);

}
