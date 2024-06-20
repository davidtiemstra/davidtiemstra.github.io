class DataScreen {
    constructor(index, text, constants, variables, textBoxes){
        this.index = index;
        this.text = text;
        this.constants = constants;
        this.variables = variables;

        // for each text thing give the coordinates and width/height
        this.textBoxes = textBoxes;
        
        this.startTime = millis();

        this.cloudBalls = [];
        this.maxBall = 0.2*width;
        this.ballDensity = 100;
        this.ballSpeed = 0.25;
        this.ballTime = 150;
        this.maxBalls = 0;
    }

    // startAnimation(){
    //     //idk best way to make this phase dependent. probably if loop.
    //     if(this.index == 1){

    //     }
    // }

    animation(){

        if(this.index == 0){
            noStroke();
            fill("orange");
            rect(0.2*width,0.75*height,0.6*width,0.08*height);
            textSize(TEXTBIG);
            textStyle(BOLD);
            fill(0)
            textAlign(CENTER);
            text("DSWeetjes!", 0.5*width,0.8*height)
            // textAlign(LEFT);
        }

        if(this.index == 1){
            //loading screen
            this.drawCloud(0.5*width,0.43*height,0.2*width,0.1*height, "circle");

        }

        if(this.index == 2){
            // zoveel verzekerden
            this.drawCloud(0.5*width,0.46*height,0.3*width,0.15*height, "circle");

            textAlign(CENTER);
            textSize(TEXTBIG);
            textStyle(BOLD);
            //this is fucked
            fill(0, 255*((this.cloudBalls.length-this.maxBalls*0.1)/this.maxBalls*5));
            text(min(423*round(millis()-this.startTime),this.constants.totaal), 0.34*width, 0.47*height)
            text(this.variables.jaren, 0.57*width, 0.51*height)
        }
        
        if(this.index == 3){
            // persoonlijk 1
            this.drawCloud(0.5*width,0.46*height,0.3*width,0.15*height, "circle");

            textAlign(CENTER);
            textSize(TEXTBIG);
            textStyle(BOLD);
            //this is fucked
            fill(0, 255*((this.cloudBalls.length-this.maxBalls*0.1)/this.maxBalls*5));
            text(this.variables[0], 0.48*width, 0.4*height);

        }
        
        if(this.index == 4){
            // verdeling zorgkosten
            this.drawCloud(0.1*width,0.06*height,0.8*width,0.2*height, "rect");

            textAlign(CENTER);
            textSize(TEXTBIG);
            textStyle(BOLD);
            //this is fucked
            fill(0, 255*((this.cloudBalls.length-this.maxBalls*0.1)/this.maxBalls*5));
            text(this.constants.totaal, 0.72*width, 0.11*height)

            let i = 0;
            let total=0;
            for(const cost in this.constants){
                if(this.constants[cost] == this.constants.totaal){
                    continue;
                }

                const val = min(0.1*(millis()-this.startTime), this.constants[cost])
                
                const startAngle = total/103 * 2*PI;
                total+=val;
                const endAngle = total/103 * 2*PI;
                total+=0.5;

                const colOffset = noise(i*100)*100+40;
                fill(13+colOffset,105+colOffset,55+colOffset);
                stroke(0);
                strokeWeight(2);
                let pieSize = 0.4;
                let pos=createVector(0.5,0.65);

                beginShape();
                vertex(
                    pos.x*width + cos((endAngle-startAngle)*0.5+startAngle)*width*0.01,
                    pos.y*height+ sin((endAngle-startAngle)*0.5+startAngle)*width*0.01
                );
                const res = val*2;
                for(let j=0;j<res;j++){
                    vertex(
                        pos.x*width + cos((endAngle-startAngle)*j/res+startAngle)*width*pieSize*(0.9+0.1*noise(i,0.15*j,0.001*millis())),
                        pos.y*height+ sin((endAngle-startAngle)*j/res+startAngle)*width*pieSize*(0.9+0.1*noise(i,0.15*j,0.001*millis())));
                }
                vertex(
                    pos.x*width + cos(endAngle)*width*pieSize,
                    pos.y*height+ sin(endAngle)*width*pieSize
                );
                
                endShape(CLOSE);

                noStroke();
                fill(0);
                
                textAlign(CENTER);
                textSize(TEXTBIG);
                textStyle(BOLD);
                let textPos=createVector(
                    pos.x*width + cos((endAngle-startAngle)*(0.4+i/6)+startAngle)*width*pieSize*(0.3+i/8),
                    pos.y*height+ sin((endAngle-startAngle)*(0.4+i/6)+startAngle)*width*pieSize*(0.3+i/8));
                text(this.constants[cost] + "%",
                    textPos.x,
                    textPos.y - 12
                );

                textSize(TEXTSMLL);
                textStyle(NORMAL);
                textAlign(CENTER);
                text(cost,
                    textPos.x,
                    textPos.y);
            
                i++;
            }

        }
        
        if(this.index == 5){
            // persoonlijk 2
            this.drawCloud(0.5*width,0.5*height,0.3*width,0.15*height, "circle");

            textAlign(CENTER);
            textSize(TEXTBIG);
            textStyle(BOLD);
            //this is fucked
            fill(0, 255*((this.cloudBalls.length-this.maxBalls*0.1)/this.maxBalls*5));
            text(this.variables[0], 0.48*width, 0.4*height);
            
        }
        
        if(this.index == 6){
            // jaarwens
            this.drawCloud(0.5*width,0.46*height,0.3*width,0.15*height, "circle");
            
        }
        
    }

    displayText(){
        textSize(TEXTSTD);
        textStyle(NORMAL);
        textAlign(CENTER);
        fill(0, 255*((this.cloudBalls.length-this.maxBalls*0.1)/this.maxBalls*5));

        for(let i=0; i< this.text.length;i++){
            text(
                this.text[i], 
                this.textBoxes[i][0] * width, 
                this.textBoxes[i][1] * height, 
                this.textBoxes[i][2] * width, 
                this.textBoxes[i][3] * height
            )
        }
    }

    drawCloud(x,y,width,height,shape){

        if(shape=="rect"){
            this.maxBalls = this.ballDensity * (width*height) / (PI*this.maxBall*this.maxBall);
        }
        if(shape=="circle"){
            const surface = ((PI*width*width) + (PI*height*height))/2
            this.maxBalls = this.ballDensity * (surface) / (PI*this.maxBall*this.maxBall);
        }

        // if(this.cloudBalls.length<this.maxBalls && random()>this.ballSpeed){
        if(random()>(this.cloudBalls.length+0.01)/this.maxBalls){
            if(shape=="rect"){
               this.cloudBalls.push({
                    x:x+random()*width,
                    y:y+random()*height,
                    size:0,
                    time:0
                }); 
            }
            if(shape=="circle"){
                let angle = random()*360;
                let dist = random();
                this.cloudBalls.push({
                    x:x+cos(angle)*dist*width,
                    y:y+sin(angle)*dist*height,
                    size:0,
                    time:0
                }); 
            }
            
        }

        fill(0);
        for(let i=this.cloudBalls.length-1; i>=0; i--){
            if(this.cloudBalls[i].time++ < this.ballTime){
                this.cloudBalls[i].size += (this.maxBall - this.cloudBalls[i].size) * 0.05;
            }
            else{
                this.cloudBalls[i].size += (-1*this.maxBall - this.cloudBalls[i].size) * 0.025;
                if(this.cloudBalls[i].size<0){
                    this.cloudBalls.splice(i,1);
                    continue;
                }
            }
            
            circle(this.cloudBalls[i].x,this.cloudBalls[i].y,this.cloudBalls[i].size+4);
        }
        // fill(252)
        fill(cloudColors[phase]);
        for(let i=this.cloudBalls.length-1; i>=0; i--){
            circle(this.cloudBalls[i].x,this.cloudBalls[i].y,this.cloudBalls[i].size);
        }


    }

}