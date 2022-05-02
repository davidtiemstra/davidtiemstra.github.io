window.onload = startup;

let windows = ["education","experience","projects","about"];
let windowsBool = [false,false,false,false];
let buttons = ["edubut","expbut","probut","abobut"];

let symbolNames = ["edusym","expsym","prosym","abosym"];
let newSymbols = [];
let numSymbols = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];
let allSymbols = ["📚","📓","🎓","💼","📎","📐","📄","📂","💻","🤷","❤","✎","📫","📌","📞"];

function startup(){
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