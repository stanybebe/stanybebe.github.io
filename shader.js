var canvasDiv = document.getElementById('myCanvas');
var width = myCanvas.clientWidth;
function preload() {
  // note that we are using two instances
  // of the same vertex and fragment shaders
  redGreen = loadShader('assets/bkg.vert','assets/shdbkg.frag');
}

function setup() {
var canvasDiv = document.getElementById('myCanvas');
var width = myCanvas.offsetWidth;
 var sketchCanvas = createCanvas(width,230, WEBGL);
 sketchCanvas.parent("myCanvas");

}

function draw() {
  shader(redGreen);
  redGreen.setUniform("u_resolution", [width, height]);
  redGreen.setUniform("u_time", frameCount *.05);
  rect(0,0,width, height);

}
