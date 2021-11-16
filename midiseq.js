



var isOn;
var count=0;
var vol;
var tempo = document.getElementById('tempo');
const refreshRate = 1000 / 63;
var index=0;
 document.getElementById('play').checked = false;

var notes =['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4', 'A#4', "B4"];   

var notesToPlay = [];
const synth = new Tone.MonoSynth({
    volume: vol
}).toDestination();
var selected = document.getElementById('div'+index);
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




   
       
    //    var t = document.createTextNode(listB[i]);
    //    btn.appendChild(t);
       div.appendChild(btn);
     
        }
      
    }
 
}
function updateSeq(){
   
    var selected = document.getElementById('div'+index);
    
    selected.style.backgroundColor = "red";
    selected.style.backgroundColor = "white";
     



 for (let i = 0; i < selected.children.length; i++) {
    if(selected.children[i].checked){
    notesToPlay.push(selected.children[i].value);
    console.log(notesToPlay);
    }else{
   
    }
      
  
  }

 console.log(notesToPlay);


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
    
    updateSeq();
    index++;
    var prevIndex = index -1;
   
    synth.triggerAttackRelease(notesToPlay[0],'32n');
    
    synth.volume.value=0 ;
    if(index>=16){
        index = 0;
    }
    if(index != prevIndex){
        notesToPlay.length = 0;
        synth.volume.rampTo(0, .5);

        var selected = document.getElementById('div'+index);
        selected.style.backgroundColor = "red";
    

    }


}}}
,refreshRate);



console.log(index);


