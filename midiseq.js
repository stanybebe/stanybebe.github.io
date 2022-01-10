var isOn;
var count=0;

var tempo = document.getElementById('tempo');
var checkbox = document.getElementById('play');
var mapRange = function(s, from, to) {
    return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  };
checkbox.addEventListener('change',async function() {
  if (this.checked) {
        await Tone.start()
        isOn = true;
  } else {
    Tone.stop;
  }
});
const refreshRate = 1000 / 64;
var index=0;
 document.getElementById('play').checked = false;
 document.querySelector('play')?.addEventListener('checked', async () => {
	await Tone.start()
	console.log('audio is ready')
})
var notes =['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4', 'A#4', "B4","rest"];   
var notesB =['C1','C#1','D1','D#1','E1','F1','F#1','G1','G#1','A1', 'A#1', "B1"]; 
var notesD =['C1','D1','D#1','F#2']; 

var notesToPlay = [];
var notesToPlayB = [];
var notesToPlayK = [];
var notesToPlayS = [];
var notesToPlayH = [];
var notesToPlayC = [];
const reverb = new Tone.Reverb({
	"wet": .5,
	"decay": 2.5,
	"preDelay": 0.01
}).toDestination();

const filterLead = new Tone.Filter(2000, "lowpass").connect(reverb);
const filterBass = new Tone.Filter(500, "lowpass").toDestination();
const filterSnare = new Tone.Filter(3500, "bandpass").toDestination();
const filterClap = new Tone.Filter(5500, "bandpass").connect(reverb);
const filterHH = new Tone.Filter(6500, "highpass").toDestination();

const synth = new Tone.Synth({
    "oscillator": {
     "type": "sawtooth"
}
}).connect(filterLead);
synth.volume.value =-5;
const synthB = new Tone.Synth({
    "oscillator": {
    "type": "sawtooth"
    }
}).connect(filterBass);
synthB.volume.value =-5;
const synthK = new Tone.Synth({
    "oscillator": {
    "type": "sine"
    }
}).toDestination();

const synthSTone = new Tone.Synth({
    "oscillator": {
    "type": "sine"
    }
}).connect(filterSnare);
synthSTone.volume.value =-2;
const synthSN = new Tone.NoiseSynth().connect(filterSnare);
const synthC = new Tone.NoiseSynth().connect(filterClap);
const synthH = new Tone.NoiseSynth().connect(filterHH);

var selected = document.getElementById('div'+index);
var selectedB = document.getElementById('divB'+index);
var selectedD = document.getElementById('divD'+index);

function printBtn() {

   
    for (var i = 0; i < 16; i++) {
        let div = document.createElement("div")
        div.setAttribute("style", "display: block;width:300px;");
        div.setAttribute("id","div"+i);
        document.body.appendChild(div);
        

        for (var j = 0; j < 12; j++) {
       var btn = document.createElement("input");
       btn.setAttribute("type", "radio");
       btn.setAttribute("name", "group"+i);
       btn.setAttribute("class", "btn");
       btn.setAttribute("id","btn"+j);
       btn.setAttribute("value",notes[j]);
    //    if(j===12){
    //     btn.setAttribute("checked",true);
    // }
       div.appendChild(btn);
      
        }
      
    }

 
}

function printBtnB() {

    let br = document.createElement("br");
    document.body.appendChild(br);

    for (var i = 0; i < 16; i++) {
        let divB = document.createElement("div")
        divB.setAttribute("style", "display: block;width:270px;");
        divB.setAttribute("id","divB"+i);
        document.body.appendChild(divB);
        

        for (var j = 0; j < 12; j++) {
       var btnB = document.createElement("input");
       btnB.setAttribute("type", "radio");
       btnB.setAttribute("name", "groupB"+i);
       btnB.setAttribute("class", "btnB");
       btnB.setAttribute("id","btnB"+j);
       btnB.setAttribute("value",notesB[j]);
       divB.appendChild(btnB);
     
        }
      
    }
 
}

function printBtnD() {

    let brB = document.createElement("br");
    document.body.appendChild(brB);

    for (var i = 0; i < 16; i++) {
        let divD = document.createElement("div")
        divD.setAttribute("style", "display: block;width:270px;");
        divD.setAttribute("id","divD"+i);
        document.body.appendChild(divD);
        

        for (var j = 0; j < 4; j++) {
       var btnD = document.createElement("input");
       btnD.setAttribute("type", "checkbox");
       btnD.setAttribute("name", "groupD"+i);
       btnD.setAttribute("class", "btnD");
       btnD.setAttribute("id","btnD"+j);
       btnD.setAttribute("value",notesD[j]);
       divD.appendChild(btnD);
     
        }
      
    }
 
}



function updateSeq(){
   
    var selected = document.getElementById('div'+index);
    
    selected.style.backgroundColor = "red";
    selected.style.backgroundColor = "white";

 for (let i = 0; i < selected.children.length; i++) {
    
    if(selected.children[i].checked){
    notesToPlay.unshift(selected.children[i].value);
    console.log(notesToPlay);
    }
   
  }

}

function updateSeqB(){
   
    var selectedB = document.getElementById('divB'+index);
    
    selectedB.style.backgroundColor = "red";
    selectedB.style.backgroundColor = "white";


 for (let i = 0; i < selectedB.children.length; i++) {
    if(selectedB.children[i].checked){
    notesToPlayB.unshift(selectedB.children[i].value);
   
    }
      
  
  }


}

function updateSeqD(){
   
    var selectedD = document.getElementById('divD'+index);
    
    selectedD.style.backgroundColor = "red";
    selectedD.style.backgroundColor = "white";


    if(selectedD.children[0].checked){
        notesToPlayK.unshift(selectedD.children[0].value);
        }
        if(selectedD.children[1].checked){
            notesToPlayS.unshift(selectedD.children[1].value);
        }
        if(selectedD.children[2].checked){
            notesToPlayC.unshift(selectedD.children[2].value);
        }
        if(selectedD.children[3].checked){
            notesToPlayH.unshift(selectedD.children[3].value);
        }
      
        console.log(notesToPlayH);
  


}

var play = document.querySelector('input[id="play"]');
play.addEventListener('change', () => {
    if(play.checked) {
      isOn = true;
    } else {
      isOn = false;
    }
  });

    setInterval(() => {  
  
    
    count++;
    // console.log(count);
    if(count > document.getElementById('tempo').value){
    count = 0;
    if(isOn===true){  
    Tone.start();
    updateSeq();
    updateSeqB();
    updateSeqD();
    index++;
    var prevIndex = index -1;
    
    if(notesToPlay.length === 1){
       
        synth.triggerAttackRelease(notesToPlay[0],'64n');
    }   
    if(notesToPlayB.length === 1){
        synthB.triggerAttackRelease(notesToPlayB[0],'64n');

    } 
    if(notesToPlayK.length === 1){
        synthK.triggerAttackRelease(notesToPlayK[0],'64n');
        synthK.frequency.rampTo(50,.01);

    }   
    if(notesToPlayS.length === 1){
       
        synthSTone.triggerAttackRelease("500hz",'64n');
        synthSTone.frequency.rampTo(100,.002);

        synthSN.triggerAttackRelease(.001);
 
   
    }   
    if(notesToPlayC.length === 1){
        synthC.triggerAttackRelease(.001);

    }   
    if(notesToPlayH.length === 1){
        synthH.triggerAttackRelease(.001);

    }     



    if(index>=16){
        index = 0;
    }
    if(index != prevIndex){
      
        notesToPlay.length = 0;
        notesToPlayB.length = 0;
        notesToPlayK.length = 0;
        notesToPlayS.length = 0;
        notesToPlayC.length = 0;
        notesToPlayH.length = 0;
        

        var selected = document.getElementById('div'+index);
        selected.style.backgroundColor = "red";
        var selectedB = document.getElementById('divB'+index);
        selectedB.style.backgroundColor = "red";
        var selectedD = document.getElementById('divD'+index);
        selectedD.style.backgroundColor = "red";
    

    }


}}}
,refreshRate);


console.log(index);


function makeFile(){
    isOn = false;
    let leadDist=[];
    let leadNotes=[];
    let leadTime=[];
    var timeSumMap = [];
    let bassNotes=[];
    let kickNotes=[];
    let snareNotes=[];
    let clapNotes=[];
    let hhNotes=[];
    var selectedDiv=[];
    var time = 0;
    var ptimeA =0;
    var timeSum = 0;
    var sum =0;
  
    for (let i = 0; i < 16; i++) {
        selectedDiv.push(document.getElementById('div'+i));
    for (let j = 0; j < 12; j++) {
    if(selectedDiv[i].children[j].checked===true){  
    leadNotes.push(selectedDiv[i].children[j].value);
    }
    if(selectedDiv[i].children[j].checked!=true){
        console.log(time);
         time=time+1;
        //  leadTime.push[time];

    }else{
        ptimeA= time;
        leadDist.push(ptimeA);
        time = 0;
     
    }
   
    }
    
    }
    for (let j = 0; j < leadDist.length; j++){
        sum= sum + leadDist[j];      
    }
    // leadDist.push(192-sum);
    // leadDist.shift();
    for (let j = 0; j < leadDist.length; j++){
        timeSum= timeSum + leadDist[j];
        leadTime.push(timeSum); 
        timeSumMap.push(Math.round(leadTime[j]/12)*(j*4));
        
    }

// create a new midi file
var midi = new Midi();
// add a track
const track = midi.addTrack(
    {
        channel:1
    }
);
const trackB = midi.addTrack(
    {
        channel:2
    }
);

  const trackC = midi.addTrack(    {
    channel:10
});
console.log(selectedDiv);
console.log(leadNotes);
console.log(leadDist);
var pos =0;
for (let i = 0; i < 16; i++) {

// if(leadNotes[i]==="rest"){

// }
// track.addNote({
//   name : leadNotes[i],
//   time : i,
//   duration: 0.2
// })


}







console.log(leadTime);
console.log(timeSumMap); // 6
// fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
}


  