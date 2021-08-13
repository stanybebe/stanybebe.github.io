let data = {};

var midiNotes = ['C_1', 'Db_1', 'D_1', 'Eb_1', 'Fb_1', 'F_1', 'Gb_1', 'G_1', 'Ab_1', 'A_1', 'Bb_1', 'Cb0',
                    'C0', 'Db0', 'D0', 'Eb0', 'Fb0', 'F0', 'Gb0', 'G0', 'Ab0', 'A0', 'Bb0', 'Cb1',
                    'C1', 'Db1', 'D1', 'Eb1', 'Fb1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'Cb2',
                    'C2', 'Db2', 'D2', 'Eb2', 'Fb2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'Cb3',
                    'C3', 'Db3', 'D3', 'Eb3', 'Fb3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'Cb4',
                    'C4', 'Db4', 'D4', 'Eb4', 'Fb4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'Cb5',
                    'C5', 'Db5', 'D5', 'Eb5', 'Fb5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'Cb6',
                    'C6', 'Db6', 'D6', 'Eb6', 'Fb6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'Cb7',
                    'C7', 'Db7', 'D7', 'Eb7', 'Fb7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'Cb8',
                    'C8', 'Db8', 'D8', 'Eb8', 'Fb8', 'F8', 'Gb8', 'G8', 'Ab8', 'A8', 'Bb8', 'Cb9',
                    'C9', 'Db9', 'D9', 'Eb9', 'Fb9', 'F9', 'Gb9', 'G9'];
function preload(){
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
  document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})

  const synth = new Tone.Synth().toDestination();
//   for(var i = data.length; i > 0; i --){
//
//
// //play a middle 'C' for the duration of an 8th note
//
//   }
 var d = [];
 var mN = [];
 var invertd = d.reverse();
  for(k in data){

    d.push(Number(data[k].deathIncrease));

  }
  var invertd = d.reverse();

  for (var i = 0; i < invertd.length; i++) {
    invertd[i] = mapRange([0, 10000], [63, 127], invertd[i]);
  }
  for(n in invertd){
    mN.push(midiNotes[round(invertd[n])]);

  }

 console.log(d);
 console.log(mN);

  const loopA = new Tone.Sequence((time,note) => {

    synth.triggerAttackRelease(note, "8n",time);},mN).start(0);

 Tone.Transport.start();

  for(j in data){
   console.log(data[j].deathIncrease);
}


 }
// Number(data[k].deathIncrease)
