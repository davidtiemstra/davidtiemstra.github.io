let phase = -1;

let screens = [];

let naam;
let jaren;
let hoevaakGebeld;
let hoevaakLogin;
let snelsteDecla;

let movePhase = false;

const TEXTBIG = 24;
const TEXTSTD = 18;
const TEXTSMLL = 14;

const cloudColors = [
    "",
    "#E0FBFF",
    "#ffeac0",
    "#adf5ff",//lichtgrijs
    "#FFE8D3",
    "#dafeef",//blauw ofzo
    "#ffaea9",

]

const ALWAYSTEXT = [
    [],
    ["Jouw reis aan het bouwen..."],
    [
        "We zijn met", 
        "verzekerden!", 
        "en jij bent al", 
        "jaar deel van de familie"
    ],
    ["Dat is hoevaak jij ingelogd hebt op de app! Jij blijft graag op de hoogte!"],
    [
        "We hebben met zijn allen voor", 
        "euro aan zorgkosten vergoed!", 
        "Dit is waar het naartoe ging:"
    ],
    ["Je kan ons altijd bellen! Dit is hoevaak jij met de klantenservice van DSW gepraat hebt! Hopelijk wordt volgend jaar net zo gezellig!"],
    ["We wensen je een gezond 2024!"]
];

//define as fractions of the full width/height
const ALWAYSTEXTBOXES = [
    [], //button
    [[0.35, 0.4, 0.3, 0.1]], //loading text
    [
        [0.35, 0.41, 0.3, 0.2],
        [0.45, 0.45, 0.25, 0.2],
        [0.25, 0.49, 0.3, 0.1],
        [0.34, 0.53, 0.4, 0.1]
    ], // hoeveel verzekerden 
    [[0.23, 0.45, 0.5, 0.4]], // personal: standard center box
    [
        [0.11, 0.09, 0.5, 0.2],
        [0.41, 0.13, 0.5, 0.1],
        [0.2, 0.20, 0.4, 0.3],
    ], // zorgkosten waarheen
    [[0.23, 0.45, 0.5, 0.4]], // personal: standard center box
    [[0.25, 0.45, 0.5, 0.4]], //jaarwens: center box
]

const VARIABLEBOXES = [
    [],
    [],
]

let alwaysData = [
    null, //app homepage
    null, //loading
    {
        totaal: 570000,
    }, //aantal verzekerden
    null, //persoonlijk
    {
        totaal: "1,7 miljard",
        ziekenhuis: 67.8,
        farmacie: 13.8,
        huisarts: 10.3,
        hulpmiddelen: 4.9,
        fysio: 3.1
    }, //verdeling zorgkosten (totaal-> per ding)
    null, //persoonlijk
    {
        schiedam: 60,
    }, //link naar heatmap plaatje met verzekerden verdeling i guess????
    ["gerda", "mark", "viktor"], //de namen waar we uit kiezen
    null, //jaarwens
    null, //profiel
];

let alwaysVariables = [
    null,
    null,
    0, //jaar lid
    null,
    null,
    null,
    null, //weet ik nog niet
    null,
    null, //weet ik nog niet
];

const SOMETIMESTEXT = [
    [],
];

let sometimesVariables = [

];

let backgrounds = [];
let bgs=[];
let bgar=[];

function preload() {
    for(let i=0; i<ALWAYSTEXT.length; i++){
        backgrounds.push(loadImage("backgrounds/"+i+".jpg"))
    }
    bgs.push(loadImage("backgrounds/tekening1.png"));
    bgs.push(loadImage("backgrounds/tekening2.png"));
    bgs.push(loadImage("backgrounds/tekening3.png"));
}

function setup() {
    createCanvas(min(windowWidth, windowHeight*(9/16)), windowHeight - 4);

    bgar.push(bgs[0].width/bgs[0].height);
    bgar.push(bgs[1].width/bgs[1].height);
    bgar.push(bgs[2].width/bgs[2].height);
    //prepare setup for personal data
    randomButton = createButton("Vul willekeurige waarden in").mousePressed(randomizeVariables);
    randomButton.position(20,40);
    
    naamInput = createInput("verzekerde");
    naamInput.position(20, 100);

    jarenInput = createSlider(1, 40, round(random()*39+1));
    jarenInput.position(20, 220);

    hoevaakGebeldInput = createSlider(0, 40, round(random()*40));
    hoevaakGebeldInput.position(20, 280);

    hoevaakLoginInput = createSlider(0, 200, round(random()*200));
    hoevaakLoginInput.position(20, 340);

    submitButton = createButton("Start prototype!").mousePressed(initializeScreens);
    submitButton.position(20, 440);

    //calculate variables for always shown screens


    // 
}

function draw() {
    background(255);

    if(phase>0 && millis() - screens[phase].startTime > 2000 && !movePhase){
        nextScreen();
    }

    if(movePhase){
        if(screens[phase].cloudBalls.length <1){
            phase++
            movePhase = false;
            screens[phase].startTime = millis();
        }
    }

    // during setup everything is gonna be DOM so dont show shit
    if(phase == -1){
        textSize(TEXTSTD);
        text("Naam: ", 
            20, 95);
        text("Aantal jaar verzekerd bij DSW: " + jarenInput.value() + " jaar", 
            20, 215);
        text("Aantal keer gebeld met DSW: " + hoevaakGebeldInput.value() + " keer", 
            20, 275);
        text("Aantal keer ingelogd bij de app: " + hoevaakLoginInput.value() + " keer", 
            20, 335);
        return;
    }

    // display screens!
    if(phase == 0 ){
        image(backgrounds[phase],0,0,width,height)
    }
    else{
        image(bgs[phase%3],millis()*-0.0001,0,height*bgar[phase%3],height)
        background(255,40)
    }

    screens[phase].animation();
    screens[phase].displayText();

    textAlign(LEFT)
    // text(floor(frameRate()),10,10)

}

function mouseClicked(){
    nextScreen();
}

function nextScreen(){
    if(phase>=0 && phase<6){
        if(!movePhase){
            screens[phase].ballDensity = 0.0001;
            movePhase=true;
        }else{
            phase++
            movePhase = false;
            screens[phase].startTime = millis();
        }
    }
}

function keyPressed(){
    if(keyCode===ENTER){
        nextScreen();
    }
}

function randomizeVariables(){
    naamInput.value(alwaysData[7][floor(random()*alwaysData[7].length)]);
    jarenInput.value(round(random()*39+1));
    hoevaakGebeldInput.value(round(random()*40));
    hoevaakLoginInput.value( round(random()*200));

}

function initializeScreens(){
    // set values and delete all the setup bullshit
    naam = naamInput.value();
    jaren = jarenInput.value();
    hoevaakGebeld = hoevaakGebeldInput.value();
    hoevaakLogin = hoevaakLoginInput.value();

    randomButton.remove()
    naamInput.remove();
    jarenInput.remove();
    hoevaakGebeldInput.remove();
    hoevaakLoginInput.remove();
    submitButton.remove();


    // calculate which screens to show & put in the data (index, text, textVariables, textBoxes)
    
    alwaysVariables[2] = {
        totaal: alwaysData[2].totaal,
        jaren: jaren
    }
    alwaysVariables[3] = [
        //persoonlijk 1
        hoevaakLogin
    ]
    alwaysVariables[5] = [
        //persoonlijk 2
        hoevaakGebeld
    ]
    
    for(let i=0; i< ALWAYSTEXT.length; i++){
        screens.push(new DataScreen(
            i,
            ALWAYSTEXT[i],
            alwaysData[i],
            alwaysVariables[i],
            ALWAYSTEXTBOXES[i]
        ));
    }

    console.log(screens);

    // start!!!
    phase = 0;
}