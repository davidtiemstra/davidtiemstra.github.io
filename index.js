window.onload = startup;

let windows = ["education","experience","projects","about"];
let windowsBool = [false,false,false,false];
let buttons = ["edubut","expbut","probut","abobut"];

let symbolNames = ["edusym","expsym","prosym","abosym"];
let newSymbols = [];
let numSymbols = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];
let allSymbols = ["📚","📓","🎓","💼","📎","📐","📄","📂","💻","🤷","❤","✎","📫","📌","📞"];

const PH1 = "Hello.<br> My name is David.<br><br>Click one of the buttons on the left to learn more about me.";
const PH2 = "Hello.<br> My name is David, and this is me up here ↑ .<br><br>Click one of the buttons on the left to learn more about me.";

let checksize = 21;
let checkers;
let grid = [];
let gridsize = [];
let checkerTime = 2500;
let checkerInterval;
let checkerCount = 0;
let changeCheckers;

function startup(){

    //DELETE THIS!!
    document.addEventListener('keypress', keyPressed);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (let p of urlParams) {
        if(windows.includes(p[0])){
            windowsBool[windows.indexOf(p[0])] = true;
        }
    }

    for(let i=0;i<windows.length;i++){
        if(!windowsBool[i]){
            document.getElementById(windows[i]).setAttribute("style", "display:none");
        } else{
            document.getElementById('placeholder').setAttribute("style", "display:none");
            document.getElementById(buttons[i]).setAttribute("style", "background:black; color:white");
        }
        
    }

    createChecker();

}

function toggleWindow(buttonName){

    if(windowsBool[windows.indexOf(buttonName)]){
        document.getElementById(buttonName).setAttribute("style", "display:none");
        document.getElementById(buttons[windows.indexOf(buttonName)]).setAttribute("style", "background:white; color:black");
        windowsBool[windows.indexOf(buttonName)] = false;

        let checker = false;
        for(let i=0;i<windows.length;i++){
            if(windowsBool[i]){
                checker = true;
            }
        }
        if(!checker){
            document
                .getElementById('placeholder')
                .setAttribute("style", "display:normal");
        }

    } else{
        document.getElementById(buttonName).setAttribute("style", "display:normal");
        document.getElementById(buttons[windows.indexOf(buttonName)]).setAttribute("style", "background:black; color:white");
        document
            .getElementById('placeholder')
            .setAttribute("style", "display:none");
        windowsBool[windows.indexOf(buttonName)] = true;
    }
}

function scrambleSymbols(buttonTag, mouseIn){
    const buti = symbolNames.indexOf(buttonTag);
    if(mouseIn){
        newSymbols = [numSymbols[buti][0],numSymbols[buti][1],numSymbols[buti][2]];
        symbolInterval = setInterval(function() {changeSymbol(buttonTag)}, 50);
    } else{
        clearInterval(symbolInterval);
        document.getElementById(buttonTag).innerHTML = allSymbols[numSymbols[buti][0]] + allSymbols[numSymbols[buti][1]] + allSymbols[numSymbols[buti][2]];
    }
    
}

function changeSymbol(buttonTag){
    newSymbols[Math.floor(3*Math.random())] = Math.floor(allSymbols.length*Math.random())
    document.getElementById(buttonTag).innerHTML = allSymbols[newSymbols[0]] + allSymbols[newSymbols[1]] + allSymbols[newSymbols[2]];
}

function createChecker(){
    gridsize = [Math.ceil(1.4 * window.innerWidth/checksize), Math.ceil(168/checksize)];
    for(let i=0; i<gridsize[0]; i++){
        // grid.push([]);
        
        let col = document.createElement('div');
        col.className = "checkercolumn";
        col.setAttribute("style", "width:" + checksize + "px;");
        document.getElementById("checkerboard").append(col);

        for(let j=0; j<gridsize[1]; j++){
            // grid[i].push(1);

            let div = document.createElement('div');
            div.className = "checkerdiv";
            div.id = "c" + (i*gridsize[1] + j);
            div.setAttribute("style", "width:" + checksize + "px; height:" + checksize + "px; background-color:rgba(255, 255, 255, 1);");
            col.append(div);
        }
    }
    checkerInterval = Math.floor(checkerTime / (gridsize[0]*gridsize[1]));

    document.getElementById("checkerboard").style.setProperty("background-color", "rgba(255, 255, 255, 0)");
    checkers = false;
    setTimeout(triggerCheckers, 10000);
}

function triggerCheckers(){
    if(!checkers){
        checkers = true;
        const order = shuffledNumbers(gridsize[0]*gridsize[1]);
        changeCheckers = setInterval(function(){changeCheck(order, 0.0)}, checkerInterval);
        document.getElementById("placeholder").innerHTML = PH2;
        setTimeout(triggerCheckers, 15000);
    } else{
        checkers = false;
        const order = shuffledNumbers(gridsize[0]*gridsize[1]);
        changeCheckers = setInterval(function(){changeCheck(order, 1.0)}, checkerInterval);
        document.getElementById("placeholder").innerHTML = PH1;
        setTimeout(triggerCheckers,45000);
    }
}

function changeCheck(order, opac){
    document.getElementById("c" + order[checkerCount]).style.setProperty("background-color", "rgba(255, 255, 255, "+ opac + ")");
    checkerCount++;
    if(checkerCount>=order.length){
        clearInterval(changeCheckers);
        checkerCount = 0;
        changeCheckers = undefined;
    }
}

function shuffledNumbers(length) {
    let array = [];
    for(let i=0; i<length; i++){
        array.push(i);
    }

    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function keyPressed(e){
    if(e.code=='KeyQ'){
        console.log('q');
    }

    if(e.code=='KeyW'){
        console.log('w');
    }
  }
