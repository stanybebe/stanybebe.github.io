let data = {};

var midiNotes = [   'C4', 'D4', 'Eb4',  'F4',  'G4',  'A4',  'Cb5',
                    'C5', 'D5', 'Eb5',  'F5',  'G5',  'A5',  'Cb6',
                    'C6', 'D6', 'Eb6',  'F6','G6',  'A6',  'Cb7',
                    'C7', 'D7', 'Eb7',  'F7', 'G7',  'A7',  'Cb8',
                    'C8', 'D8', 'Eb8',  'F8',  'G8',  'A8',  'Cb9',
                    'C9', 'D9', 'Eb9',  'F9', 'G9'];
function preload(){
 myFont = loadFont('https://raw.githubusercontent.com/stanybebe/stanybebe.github.io/master/vcr.ttf');
 data = loadJSON('https://raw.githubusercontent.com/stanybebe/stanybebe.github.io/master/covid.json');
}

function setup(){
  noLoop();
var canvasDiv = document.getElementById('myCanvas2');
var width = myCanvas2.offsetWidth;

var sketchCanvas = createCanvas(width,500, WEBGL);
sketchCanvas.parent("myCanvas2");

}

var mapRange = function(from, to, s) {
  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};




function draw(){
  background(50,150,255);
 var isOn =false;

 if (isOn ==false){
    Tone.stop;
 }
  document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
    isOn = true;

  Tone.Transport.start();
	console.log('audio is ready')
})


const sampler = new Tone.Sampler({
urls: {
  "C4": "pluck.mp3"
},
attack:20,
release: 5,
baseUrl: "https://tristanwhitehill.com/audio/",
});

const sampler2 = new Tone.Sampler({
urls: {
  "C4": "violin.mp3"
},
attack:50,
release: 1,
baseUrl: "https://tristanwhitehill.com/audio/",
});

const sampler3 = new Tone.Sampler({
urls: {
  "C4": "pluck2.mp3"
},
attack:30,
release:5,

baseUrl: "https://tristanwhitehill.com/audio/",
});


  const synth = new Tone.Synth().toDestination();
  const synth2 = new Tone.Synth().toDestination();
//   for(var i = data.length; i > 0; i --){
//
//
// //play a middle 'C' for the duration of an 8th note
//
//   }
 var d = [];
 var d2 = [];
 var d3 = [];
 var mN = [];
 var mN2 = [];
 var mN3 = [];
 console.log(d2);
  for(k in data){

    d.push(Number(data[k].deathIncrease));
    d2.push(Number(data[k].positiveIncrease));
    d3.push(Number(data[k].inIcuCumulative));
  }
  var invertd = d.reverse();
  var invertd2 = d2.reverse();
  var invertd3 = d3.reverse();


  for (var i = 0; i < invertd.length; i++) {
    invertd[i] = mapRange([0, 10000], [0, 24], invertd[i]);
    invertd2[i] = mapRange([0, 700000], [0, 16], invertd2[i]);
    invertd3[i] = mapRange([0, 70000], [0, 24], invertd3[i]);

  }
  for(n in invertd){
    mN.push(midiNotes[round(invertd[n])]);
    mN2.push(midiNotes[round(invertd2[n])]);
    mN3.push(midiNotes[round(invertd3[n])]);
  }

 console.log(d);
 console.log(mN);
 console.log(d2);
 console.log(mN2);
 console.log(midiNotes.length);

  const loopA = new Tone.Sequence((time,note) => {
     loopA.loop=false;

    Tone.Draw.schedule(function(){
  		//this callback is invoked from a requestAnimationFrame
  		//and will be invoked close to AudioContext time


     noStroke();


  //   console.log(tick);

  	}, time) //use AudioContext time of the event
    sampler.triggerAttackRelease(note, "8n",time);},mN).start(0);
  const loopB = new Tone.Sequence((time,note) => {
      loopB.loop=false;

    sampler2.triggerAttackRelease(note, "4n",time);},mN2).start(0);
  const loopC = new Tone.Sequence((time,note) => {
      loopC.loop=false;
    sampler3.triggerAttackRelease(note, "4n",time);},mN3).start(0);

    const freeverb = new Tone.FeedbackDelay("4n", 0.7).toDestination();
    const filter = new Tone.Filter(100, "lowpass").connect(freeverb);
    filter.frequency.rampTo(20000, 100);




   console.log(Tone.Transport.time);
    sampler.connect(filter);
    sampler2.connect(filter);
    sampler3.connect(filter);

 Tone.Transport.bpm.value =95;
 // Tone.Transport.start();
  for(j in data){
   console.log(data[j].deathIncrease);
}

push();

translate(-width/2,0);
for (var i = 0; i < invertd.length; i++){
  let c = color(255, 0, 0);
fill(c);
noStroke();
  rect(i*2.8,100,1,-invertd[i]*20);
}
pop()

push();

translate(-width/2+1,30);
for (var i = 0; i < invertd2.length; i++){
  let c = color(0);

fill(c);
noStroke();
  rect(i*2.8,100,1,-invertd2[i]*20);
}
pop()

push();

translate(-width/2+2,60);
for (var i = 0; i < invertd3.length; i++){

    let c = color(255, 255, 255);
fill(c);
noStroke();
  rect(i*2.8,100,1,-invertd3[i]*20);
}
pop()
textSize(15);
textFont(myFont);
text(' x:days(0-420)',-width/2,185);
let c = color(255, 0, 0);
fill(c);
text(' y:death increase per day(0-10000)',-width/2,200);
let c2 = color(0, 0, 0);
fill(c2);
text(' y:positive increase per day(0-700000)',-width/2,215);
let c3 = color(255);
fill(c3);
text(' y:cumulative in ICU(0-70000)',-width/2,230);

 }
