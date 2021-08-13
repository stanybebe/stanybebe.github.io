let data = {};

var midiNotes = [   'C4', 'D4', 'Eb4',  'F4',  'G4',  'A4',  'Cb5',
                    'C5', 'D5', 'Eb5',  'F5',  'G5',  'A5',  'Cb6',
                    'C6', 'D6', 'Eb6',  'F6','G6',  'A6',  'Cb7',
                    'C7', 'D7', 'Eb7',  'F7', 'G7',  'A7',  'Cb8',
                    'C8', 'D8', 'Eb8',  'F8',  'G8',  'A8',  'Cb9',
                    'C9', 'D9', 'Eb9',  'F9', 'G9'];
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
const sampler = new Tone.Sampler({
urls: {
  "C4": "C4.mp3"
},
release: 1,
baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

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
 var mN = [];
 var mN2 = [];
 console.log(d2);
  for(k in data){

    d.push(Number(data[k].deathIncrease));
    d2.push(Number(data[k].positiveIncrease));
  }
  var invertd = d.reverse();
  var invertd2 = d2.reverse();

  for (var i = 0; i < invertd.length; i++) {
    invertd[i] = mapRange([0, 10000], [0, 24], invertd[i]);
    invertd2[i] = mapRange([0, 600000], [0, 24], invertd2[i]);
  }
  for(n in invertd){
    mN.push(midiNotes[round(invertd[n])]);
    mN2.push(midiNotes[round(invertd2[n])]);
  }

 console.log(d);
 console.log(mN);
 console.log(d2);
 console.log(mN2);
  console.log(midiNotes.length);

  const loopA = new Tone.Sequence((time,note) => {

    sampler.triggerAttackRelease(note, "8n",time);},mN).start(0);
  const loopB = new Tone.Sequence((time,note) => {

      synth2.triggerAttackRelease(note, "4n",time);},mN2).start(0);

 Tone.Transport.start();

  for(j in data){
   console.log(data[j].deathIncrease);
}


 }
// Number(data[k].deathIncrease)
