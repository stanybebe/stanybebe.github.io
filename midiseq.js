var isOn;
var count=0;

var tempo = document.getElementById('tempo');
var checkbox = document.getElementById('play');

checkbox.addEventListener('change',async function() {
  if (this.checked) {
        await Tone.start()
        isOn = true;
  } else {
    Tone.stop;
  }
});
const refreshRate = 1000 / 63;
var index=0;
 document.getElementById('play').checked = false;
 document.querySelector('play')?.addEventListener('checked', async () => {
	await Tone.start()
	console.log('audio is ready')
})
var notes =['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4', 'A#4', "B4"];   
var notesB =['C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2', 'A#2', "B2"]; 

var notesToPlay = [];
var notesToPlayB = [];
const synth = new Tone.Synth().toDestination();
const synthB = new Tone.Synth().toDestination();
const sampler = new Tone.Sampler({
    urls: {
      "C4": "test.mp3"
    },
    attack:0,
    release: .5,
    baseUrl: "https://tristanwhitehill.com/audio/",
    }).toDestination();

const samplerB = new Tone.Sampler({
    urls: {
      "C3": "bass.mp3"
    },
    attack:0,
    release: .5,
    baseUrl: "https://tristanwhitehill.com/audio/",
    }).toDestination();    
var selected = document.getElementById('div'+index);
var selectedB = document.getElementById('divB'+index);
function printBtn() {

   
    for (var i = 0; i < 16; i++) {
        let div = document.createElement("div")
        div.setAttribute("style", "display: block;width:270px;");
        div.setAttribute("id","div"+i);
        document.body.appendChild(div);
        

        for (var j = 0; j < 12; j++) {
       var btn = document.createElement("input");
       btn.setAttribute("type", "radio");
       btn.setAttribute("name", "group"+i);
       btn.setAttribute("class", "btn");
       btn.setAttribute("id","btn"+j);
       btn.setAttribute("value",notes[j]);
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
    console.log(notesToPlay);
    }
      
  
  }


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
    index++;
    var prevIndex = index -1;
    
    if(notesToPlay.length === 1){
        synth.triggerAttackRelease(notesToPlay[0],'64n');
 
    }   

    if(notesToPlayB.length === 1){
        synthB.triggerAttackRelease(notesToPlayB[0],'64n');

    }   



    if(index>=16){
        index = 0;
    }
    if(index != prevIndex){
      
        notesToPlay.length = 0;
        notesToPlayB.length = 0;
        

        var selected = document.getElementById('div'+index);
        selected.style.backgroundColor = "red";
        var selectedB = document.getElementById('divB'+index);
        selectedB.style.backgroundColor = "red";
    

    }


}}}
,refreshRate);


console.log(index);


