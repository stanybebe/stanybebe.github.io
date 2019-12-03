

var timer=60;
var sine;

function preload() {
cnote= loadModel('assets/c.obj');
csharpnote= loadModel('assets/csharp.obj');
dnote= loadModel('assets/d.obj');
dsharpnote= loadModel('assets/dsharp.obj');
enote= loadModel('assets/e.obj');
fnote= loadModel('assets/f.obj');
fsharpnote= loadModel('assets/fsharp.obj');
gnote= loadModel('assets/g.obj');
gsharpnote= loadModel('assets/gsharp.obj');
anote= loadModel('assets/a.obj');
asharpnote= loadModel('assets/asharp.obj');
bnote= loadModel('assets/b.obj');



}

function setup() {
 var cvn = createCanvas(700, 700,WEBGL);
 var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
cnv.position(x, y);
 smooth();
}

function draw() {


background(0);
sine = sin(frameCount*.003)*200;

timer--;
fill(255);
noStroke();
sphere(30);



if( note == 0 || note == 12 || note == 24 || note == 36 || note==48 || note == 60 || note == 72 || note == 84 || note == 96 || note == 108 || note == 120){
  if(timer>0){
push();

rotateX(90);
let c = color(254, 111, 76); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(cnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 1 || note == 13 || note == 25 || note == 37 || note==49 || note == 61 || note == 73 || note == 85 || note == 97 || note == 109 || note == 121) {
  if(timer>0){
push();
rotateX(90);
let c = color(255,76,108); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(csharpnote);
pop();
}else{timer=60;
note=-1;

}
}


if( note == 2 || note == 14 || note == 26 || note == 38 || note==50 || note == 62 || note == 74 || note == 86 || note == 98 || note == 110 || note == 122) {
  if(timer>0){
push();
rotateX(90);
let c = color(255, 161, 177); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(dnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 3 || note == 15 || note == 27 || note == 39 || note==51 || note == 63 || note == 75 || note == 87 || note == 99 || note == 111 || note == 123) {
  if(timer>0){
push();
rotateX(90);
let c = color(255, 179, 161); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(dsharpnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 4 || note == 16 || note == 28 || note == 40 || note==52 || note == 64 || note == 76 || note == 88 || note == 100 || note == 112 || note == 124) {
  if(timer>0){
push();
rotateX(90);
let c = color(16, 209, 34); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(enote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 5 || note == 17 || note == 29 || note == 41 || note==53 || note == 65 || note == 77 || note == 89 || note == 101 || note == 113 || note == 125) {
  if(timer>0){
push();
rotateX(90);
let c = color(85, 208, 143); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(fnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 6 || note == 18 || note == 30 || note == 42 || note==54 || note == 66 || note == 78 || note == 90 || note == 102 || note == 114 || note == 126) {
  if(timer>0){
push();
rotateX(90);
let c = color(51, 255, 147); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(fsharpnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 7 || note == 19 || note == 31 || note == 43 || note==55 || note == 67 || note == 79 || note == 91 || note == 103 || note == 115 || note == 127) {
  if(timer>0){
push();
rotateX(90);
let c = color(102, 204, 150); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(gnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 8 || note == 20 || note == 32 || note == 44 || note==56 || note == 68 || note == 80 || note == 92 || note == 104 || note == 116) {
  if(timer>0){
push();
rotateX(90);
let c = color(0, 105, 209); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(gsharpnote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 9 || note == 21 || note == 33 || note == 45 || note==57 || note == 69 || note == 81 || note == 93 || note == 105 || note == 117) {
  if(timer>0){
push();
rotateX(90);
let c = color(69, 139, 209); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(anote);
pop();
}else{timer=60;
note=-1;

}
}

if( note == 10 || note == 22 || note == 34 || note == 46 || note==58 || note == 70 || note == 82 || note == 94 || note == 106 || note == 118) {
  if(timer>0){
push();
rotateX(90);
let c = color(76, 165, 178); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(asharpnote);
pop();
}else{timer=60;
note=-1;

}
}


if( note == 11 || note == 23 || note == 35 || note == 47 || note==59 || note == 71 || note == 83 || note == 95 || note == 107 || note == 119) {
  if(timer>0){
push();
rotateX(90);
let c = color(16, 35, 177); // Define color 'c'
fill(c); // Use color variable 'c' as fill color
noStroke(); // Don't draw a stroke around shapes
scale(140);
model(bnote);
pop();
}else{timer=60;
note=-1;

}
}









}
