let margin;
let shift=0.5;

function setup() {
  pixelDensity(1);
  createCanvas(1920, 1000);
  margin = round(0.05*height);
}

function draw() {
  background(255);
  
  line(margin,round(0.2*height)+shift,width-margin,round(0.2*height)+shift);
  line(margin,height-margin,width-margin,height-margin);
}

function mouseClicked(){
  shift++;
}