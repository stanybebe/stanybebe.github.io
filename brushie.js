var num = 0;
var t = 0;
var c = false;
var saw = 0;
var sinee = 0;
let img;
let frame = [];
var cframe = 0;
let gr;
let initgr;
let loadgr;
let loadFlag=false;
let initFlag=false;
let fr,fg,fb;
let count=12;
let gifCount =false;
    class Frame {
        constructor(height, width) {
            this.width = width;
            this.height = height;
            this.graphics = createGraphics(this.width,this.height); 
        }
    
        draw(alpha){
            push();

            // rect(0,0,this.height,this.width);
            // tint(alpha);
            pop();
        }
    
        update(graphics){
            this.graphics = graphics;
        }
    
        erase(){
            push();
            changeColor();
            rect(0,0,this.width,this.height);
            pop();
        }
    }    

function noiseimg() {
  gr.push();

  let ran = random(0, 255);
  g = createGraphics(width, height);
  g.fill(ran, ran, ran);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (random(0, height) < i) {
        if (random(0, 6) > 1) {
          g.noStroke();

          g.rect(i, j, 0.6, 0.6);
        }
      }
    }
  }

  g.tint(1200, 1200);
  g.image(g, 0, 0);
  // g.noFill();
  g.copy(g, 0, 0, random(100, width), random(100, height), 0, 0, width, height);
  g.copy(g, 0, 0, random(100, width), random(100, height), 0, 0, width, height);
  g.copy(g, 0, 100, random(10, width), random(0, height), 0, 0, width, height);
  // g.filter(BLUR, 1);

  gr.blendMode(SOFT_LIGHT);
  gr.tint(30);
  gr.image(g, 0, 0);
//   changeColor();
  gr.pop();
}

function shade() {
    let c = gr.get();
    gr.push();
  
    gr.blendMode(SCREEN);
    gr.tint(255, 0, 0,  20-random(0,5));
    gr.image(c, -2, 0, 605, 605);
    gr.tint(255, 255, 0, 10-random(0,5));
    gr.image(c, 0, 2, 605, 605);
    gr.tint(0, 0, 255, 20-random(0,5));
    gr.image(c, 5, 0, 605, 605);
    gr.pop();
  }

function preload() {
  myShader = loadShader("brv.vert", "brf.frag");
}
function setup() {
  createCanvas(1200, 600);
  changeColor();
  initgr = createGraphics(600,600);
  
  background(r, g, b);
  fr=r;
  fg=g;
  fb=b;

  changeColor();
  gr = createGraphics(600,600);
  gr.noStroke();
  gr.fill(fr,fg,fb);
  gr.rect(0,0,width,height);


  for (let index = 0; index < 4; index++) {
     let f = new Frame(600,600);
     
     frame.push(f);
     frame[index].update(get());
  }

  gGif = createGraphics(600,600);
}
function save() {
  saveCanvas("Brushy_", "jpg");
}
function sgn(n) {
  if (n < 0) {
    return 1;
  } else if (n > 0) {
    return -1;
  } else {
    return 0;
  }
}
function changeColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  rA = random(0, 1);
  gA = random(0, 1);
  bA = random(0, 1);
  var element = document.getElementById("color");
  element.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

document.querySelector('#button4').addEventListener('click',function() {
  nextFrame();

   });

   document.querySelector('#button5').addEventListener('click',function() {
prevFrame();

   });

   document.querySelector('#button8').addEventListener('click',function() {
    initFrame();
    initFlag=true;
    
       });

    


function draw() {
//   background(220);
   document.getElementById("frame").innerHTML = cframe;  
  t++;
  let val = document.getElementById("slider").value;
  let val2 = document.getElementById("slider2").value;
  let val3 = document.getElementById("slider3").value;
  let val4 = document.getElementById("slider4").value;
  let val5 = document.getElementById("slider5").value;
  let type = document.getElementById("type");
  let play = document.getElementById("play");

 
  let nMouseX = lerp(mouseX, pmouseX, 0.9);
  let nMouseY = lerp(mouseY, pmouseY, 0.9);
  num = round(abs(sin(t * val) * 5));
  saw++;
  if (t % 6 == 0) {
    saw = 0;
  }
  if (type.checked == 1) {
    num = 4;
  } else {
    num = 5;
  }

  if (play.checked == 1) {
    count--;
    if (count ==0){
        count=12;
        cframe = (cframe+1)%4;
    }
  }
  
  sine = sin(t * val) * 200;
  let rr = random(0, -val3);
  let size = (random(-40, 0) + 60) * val;
  if (mouseIsPressed === true && mouseX < width && mouseY < height) {
    switch (num) {
      case 0:
        gr.push();

        gr.noStroke();
        gr.fill(r + rr, g + rr, b + rr);
        gr.ellipseMode(CENTER);
        gr.ellipse(
          nMouseX,
          nMouseY,
          ((100 * saw) / 5) * val,
          ((100 * saw) / 5) * val
        );
        gr.pop();
        break;

      case 1:
        gr.push();

        gr.noStroke();
        gr.fill(r + rr, g + rr, b + rr);
        gr.rectMode(CENTER);
        gr.rect(
          nMouseX,
          nMouseY,
          ((100 * saw) / 5) * val,
          ((100 * saw) / 5) * val
        );
        gr.pop();
        break;
      case 2:
        gr.push();
        gr.stroke(50);
        gr.noStroke();
        gr.fill(r + rr, g + rr, b + rr);
        gr.ellipseMode(CENTER);
        gr.ellipse(
          nMouseX + sinee,
          nMouseY,
          ((10 * saw) / 5) * val,
          ((10 * saw) / 5) * val
        );
        gr.pop();
        break;
      case 3:
        gr.push();

        gr.stroke(r + rr, g + rr, b + rr);
        gr.strokeWeight(saw);

        gr.line(
          nMouseX,
          nMouseY,
          nMouseX + ((100 * saw) / 10) * val,
          nMouseY - ((100 * saw) / 10) * val
        );

        gr.pop();
        break;

      case 4:
        gr.push();
        gr.translate(nMouseX, nMouseY);
        gr.noStroke();
        let newang = val5;
        let offsetx = 4;
        let offsety = 6;
        let m = val4;
        gr.beginShape();
        for (let i = 0; i < 128; i++) {
          let n = map(
            gr.noise(t * i * 0.03, 1),
            0,
            1,
            size * 0.6 * val2,
            size * val2 * 0.4
          );

          // curveVertex(4*sin(i*.3)*size-sin(4*i*.3)*size,4*cos(i*.3)*size-cos(4*i*.3)*size)

          gr.fill(r + rr, g + rr, b + rr);

          let x1 = (pow(abs(sin(i)), 2 / m) * offsetx * sgn(sin(i)) * size) / 2;
          let y1 = pow(abs(cos(i)), 2 / m) * offsety * sgn(cos(i));
          let x2 = x1 * cos(newang) - y1 * sin(newang);
          let y2 = x1 * sin(newang) + y1 * cos(newang);
          // curveVertex(
          // pow(abs(sin(i)),2/m)*offsetx*sgn(sin(i)),
          // pow(abs(cos(i)),2/m)*offsety*sgn(cos(i))
          // )

          gr.curveVertex(x2 * size, y2 * size);
        }
        gr.endShape();
        gr.pop();
        break;

      case 5:
        size = size * 5;
        gr.push();
        gr.fill(r + rr, g + rr, b + rr);
        gr.noStroke();
        gr.translate(nMouseX - size / 2, nMouseY - size / 2);
        gr.beginShape();

        t++;

        for (let i = 0; i < 24; i++) {
          let n = map(
            gr.noise(t * i * 0.03, 1),
            0,
            1,
            -size * 0.3 * val2,
            size * val2 * 0.3
          );
          if (i != 0) {
            gr.curveVertex(sin(i * 0.3 + n) * size, cos(i * 0.3 + n) * size);
          }
        }

        gr.endShape();
        gr.pop();
        gr.break;
    }
  }
  document.querySelector('#button9').addEventListener('click',function() {
    loadFlag = true;
    
       });

  console.log("cframe");
  if(loadFlag==true){
    gr=frame[cframe].graphics
    loadFlag = false;
  }

  if(initFlag==true){
    image(initgr,0,0,600,600);
    initFlag = false;
    gr = initgr;
  }

  image(gr,0,0,600,600);



  if(gifCount ==true){
    image(frame[cframe].graphics,0,0,600,600);  
  }else{
  image(frame[cframe].graphics,600,0,600,600);
  gGif = frame[cframe].graphics;
  }
  } 




function setFrame(){
    let setCurrent = createGraphics(600,600);
    setCurrent.copy(gr,0,0,600,600,0,0,600,600);
    frame[cframe].update(setCurrent);

}

function setAllFrame(){
    for (let index = 0; index < 3; index++) {
        let setAllCurrent = createGraphics(600,600);
        setAllCurrent.copy(gr,0,0,600,600,0,0,600,600);

        frame[index].update(setAllCurrent);
        
    }
  
}

function nextFrame(){
    cframe = (cframe+1)%4;
    
  }
  
    function prevFrame(){
       cframe = cframe-1;
       if(cframe<0){cframe=0;}
   }

function initFrame(){
    frame[cframe].update(initgr);
    initgr.noStroke();
    initgr.fill(fr,fg,fb);
    initgr.rect(0,0,width,height);

}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
  gifCount = true;
  resizeCanvas(600, 600);
  image(frame[cframe].graphics,0,0,600,600);
  saveGif('brushieLoop', 4);

  }
  if (key === 'r'){
    resizeCanvas(1200, 600);
    gifCount = false;
  }

}