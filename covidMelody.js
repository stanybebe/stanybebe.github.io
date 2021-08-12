

function setup(){
  noLoop();
var canvasDiv = document.getElementById('myCanvas2');
var width = myCanvas2.offsetWidth;

var sketchCanvas = createCanvas(width,500, WEBGL);
sketchCanvas.parent("myCanvas2");

loadJSON('/covid.json',gotData,'jsonp');


}


function gotData(data){

 for(var i = data.length; i > 0; i --){
    var osc = new Tone.Oscillator(data.death[i], "sine").toMaster().start();
 }


}
