
let video;
let poseNet;
let pose;
let skeleton;
let tex,tex2;
let font;
let quotes = [
    "SAMSARA",
    "",
    "",
    "",
    "",
    "",
    "",
]
function preload(){
    myShader = loadShader("samsara.vert", "samsara.frag");
   
    font = loadFont('f.otf');
}
function setup() {
  createCanvas(1920, 1080, WEBGL);
  tex = createGraphics(1920, 1080, WEBGL);
  tex2 = createGraphics(1920, 1080, WEBGL);
//   video = createCapture(VIDEO);
//   video.hide();
//   let options ={
   
//     flipHorizontal: true
  
//   };
//   poseNet = ml5.poseNet(video,options, modelLoaded);
//   poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
//   image(video, 0, 0);
background(0);

translate(-width/2,-height/2);


  
  tex.push();
  // tex.tint(10);
  // tex.rect(-width/2,-height/2,width,height);
  tex.background(0);
//   tex.translate(-width/2,-height/2);
  tex.textFont(font);
  tex.textSize(width / 10);
  tex.textAlign(CENTER, CENTER);
  tex.fill(255);
  tex.text(quotes[0],0,0);


//   if (pose) {
 
    
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       tex.fill(255);
//       tex.noStroke()
//       tex.image(mySvg,x,y,186.5/2,300/2);
//     }
    
  //   for (let i = 0; i < skeleton.length; i++) {
  //     let a = skeleton[i][0];
  //     let b = skeleton[i][1];
  //     tex.strokeWeight(3);
  //     tex.stroke(255);
  //     tex.line(a.position.x, a.position.y,b.position.x,b.position.y);      
  //   }
//   }
  tex.pop();
 
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