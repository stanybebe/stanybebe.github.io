//code by Tristan Whitehill 2022 
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
var r;
var r2;
var r3;
var notes = ["C6","D5","E6","F5","G5","A5",];
var notesb = ["B5","D6","E6","F5","G5","C5",];
const beepreverb = new Tone.FeedbackDelay(0.4, 0.8).toMaster();
let tex;
let tex2;
let ping;
 let ping2;

const beepfilter= new Tone.Filter(1500.1,"lowpass").connect(beepreverb);

const beep = new Tone.Synth({
	"volume": -20,
	"detune": 0,
	"portamento": .4,
	"envelope": {
		"attack": .01,
		"attackCurve": "exponential",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 4.5,
		"releaseCurve": "exponential",
		"sustain": 0.2
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 8,
		"type": "amtriangle",
		"harmonicity": 0.014,
		"modulationType": "sine"
	}
}).connect(beepfilter);

const beepb = new Tone.Synth({
	"volume": -20,
	"detune": 0,
	"portamento": .01,
	"envelope": {
		"attack": 1.01,
		"attackCurve": "exponential",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 4.5,
		"releaseCurve": "exponential",
		"sustain": 0.2
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "amtriangle",
		"harmonicity": 0.006,
		"modulationType": "sine"
	}
}).connect(beepfilter);

function preload(){
     myShader = loadShader("v.vert", "f.frag");
  
}

function setup() {
  createCanvas(400, 400);
  tex = createGraphics(400, 400, WEBGL);
  tex2 = createGraphics(400, 400);


}

function draw() {

  var lpa = lerp(ping,ping,.1);
  var lpb = lerp(ping2,ping,.1);
    myShader.setUniform("u_time", frameCount * 0.01);
  myShader.setUniform("u_resolution", [width, height]);

 myShader.setUniform("ping", ping);
   myShader.setUniform("ping2", ping2);
    myShader.setUniform("tex", tex2);
// background(0);

  push();
  tex.shader(myShader);
  
  tex.rect(0, 0, 400,400);
  translate(0, 0);
  image(tex, 0, 0, 400, 400);
 
  
  pop();
 
   push();

  tex2.image(tex,0 , 0, 500, 500);
 
  pop();
  

   r = random(0,100);
   r2 = random(0,6);
  r3 = random(100,3000);
  if(r< 2){
    beep.triggerAttackRelease(notes[floor(r2)], "8n");
    beepfilter.set({cutoff:r3,});
   ping = .5;

    
  }
  else {ping = 1}
    if(r< 6){
    beepb.triggerAttackRelease(notesb[floor(r2)], "8n");
      ping2 = .5;
   
     
  }
    else {ping2 = 1}
   tex2.tint(255,8);
  image(tex2, 0, 0, 400, 400);
   
}
