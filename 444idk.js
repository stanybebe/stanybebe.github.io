
let video;

let tex,tex2;


function preload(){
    myShader = loadShader("444.vert", "444.frag");
 
    img = loadImage('idk.png');


}
function setup() {
  createCanvas(1920, 1080,WEBGL);
  tex = createGraphics(1920, 1080);
  tex2 = createGraphics(1920, 1080, WEBGL);

}


function draw() {
//   image(video, 0, 0);
background(0);

translate(-width/2,-height/2);

tex.image(img,0,0, width, height);

//   tex.push();

//   tex.background(0);

//   tex.textFont(font);
//   tex.textSize(width / 10);
//   tex.textAlign(CENTER, CENTER);
//   tex.fill(255);
//   tex.text(quotes[0],0,0);

//   tex.pop();
 
 shader(myShader);
 myShader.setUniform("u_time", frameCount * 0.01);
myShader.setUniform("u_resolution", [width, height]);
 myShader.setUniform("tex", tex);
  myShader.setUniform('texelSize', [1.0/width, 1.0/height]);
 rect(0,0,width,height);

}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}