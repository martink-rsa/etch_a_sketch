let gridElementColourDefault = "gray";
let userColourChoice = "rgba(0,0,0,1)";
let userBackgroundChoice = "rgba(255,255,255,1)";
let mouseDown = 0;
let brushSelected = 0;
let currentColourPalette = 0;

let colourPalettes = [
     
    ["rgba(255,255,255,0.5)",
    "rgba(0,0,0,0.5)",
    "rgba(64, 164, 216, 0.5)",
    "rgba(51, 190, 184, 1)",
    "rgba(178, 194, 37, 1)",
    "rgba(254, 204, 47, 1)",
    "rgba(249, 162, 40, 1)",
    "rgba(246, 98, 31, 1)",
    "rgba(219, 56, 56, 1)",
    "rgba(238, 101, 122, 1)",
    "rgba(163, 99, 217, 1)",
    "rgba(102, 47, 147, 1)"],

    ["rgba(255,255,255,1)",
    "rgba(0,0,0,1)",
    "rgba(238,240,242,1)",
    "rgba(198,199,196,1)",
    "rgba(162,153,158,1)",
    "rgba(132,106,106,1)",
    "rgba(53,59,60, 1)",
    "rgba(117,244,244,1)",
    "rgba(144,224,243,1)",
    "rgba(184,179,233,1)",
    "rgba(217,153,185,1)",
    "rgba(209,123,136,1)"],

    ["rgba(255,255,255,1)",
    "rgba(0,0,0,1)",
    "rgba(150,187,187,1)",
    "rgba(97,137,133,1)",
    "rgba(65,69,53,1)",
    "rgba(242,227,188,1)",
    "rgba(193,152,117,1)",
    "rgba(204,251,254,1)",
    "rgba(205,214,221,1)",
    "rgba(205,202,204,1)",
    "rgba(205,172,161,1)",
    "rgba(205,137,135,1)"],

    ["rgba(255,255,255,1)",
    "rgba(0,0,0,1)",
    "rgba(255,255,242,1)",
    "rgba(102,102,110,1)",
    "rgba(153,153,161,1)",
    "rgba(230,230,233,1)",
    "rgba(244,244,249,1)",
    "rgba(255,252,242,1)",
    "rgba(204,197,185,1)",
    "rgba(64,61,57,1)",
    "rgba(37,36,34,1)",
    "rgba(235,94,40,1)"],

    ["rgba(255,255,255,1)",
    "rgba(0,0,0,1)",
    "rgba(194,0,251,1)",
    "rgba(236,8,104,1)",
    "rgba(252,47,0,1)",
    "rgba(236,125,16,1)",
    "rgba(255,188,10,1)",
    "rgba(176,208,211,1)",
    "rgba(192,132,151,1)",
    "rgba(247,175,157,1)",
    "rgba(247,227,175,1)",
    "rgba(243,238,195,1)"]
]

class etchSketch{
    constructor(){
        this._gridContainer = document.getElementById("container-eas-main");    
    }

    get gridContainer(){return this._gridContainer;}
}

sketch = new etchSketch();

document.getElementById("container-eas-main").onmousedown = function() {mouseDown = 1};
document.getElementById("container-eas-main").onmouseup = function() {mouseDown = 0};

document.getElementById("btn-brush-paint").onclick = () => { brushSelected = 0; switchPaintControls(0);}
document.getElementById("btn-brush-background").onclick = () => { brushSelected = 1; switchPaintControls(1);}
document.getElementById("btn-brush-erase").onclick = () => { brushSelected = 2; switchPaintControls(2); }

document.getElementById("btn-palette-up").onclick = function() {changeColourPalette(0)};
document.getElementById("btn-palette-down").onclick = function() {changeColourPalette(1)};

document.getElementById("paint-colour-selector").oninput = function() {userColourChoice = document.getElementById("paint-colour-selector").value};
document.getElementById("background-colour-selector").oninput = function() {userBackgroundChoice = document.getElementById("background-colour-selector").value};

document.getElementById("btn-reset-grid").onclick = function() {resetGridElementColours()};

function generateGridDivs(numGridElements, elementColour){
    let currentZindex = 500;

    while(sketch.gridContainer.hasChildNodes()){
        sketch.gridContainer.removeChild(sketch.gridContainer.firstChild);
    }

    let numRowsColumns = Math.floor(Math.sqrt(numGridElements));
    numGridElements = numRowsColumns * numRowsColumns;
    sketch.gridContainer.style.gridTemplateColumns = `repeat(${numRowsColumns}, 1fr)`;
    sketch.gridContainer.style.gridTemplateRows = `repeat(${numRowsColumns}, 1fr)`;

    let gridDiv = document.createElement("div");
    
    for(let i = 0; i < numGridElements; i++){
        let gridDiv = document.createElement("div");
        gridDiv.style.background = elementColour;
        gridDiv.ondragstart = () => false;

        gridDiv.setAttribute("class", "grid-element");
        gridDiv.addEventListener('mousemove', () => {changeGridElementColour(gridDiv)});
        document.getElementById("container-eas-main").appendChild(gridDiv);   
    }
}

function changeGridElementColour(d){
    if(mouseDown == 1){
        if(brushSelected == 0){
            d.style.background = userColourChoice;
        } else if (brushSelected == 1) {
            generateGridDivs(document.getElementById("slider-num-elements").value, userBackgroundChoice);
        } else if (brushSelected == 2) {
            d.style.background = userBackgroundChoice;   
        }
    }
}

document.getElementById("slider-num-elements").oninput = function() {
    let gridDivs = document.body.getElementsByClassName("grid-element");
    generateGridDivs(document.getElementById("slider-num-elements").value, userBackgroundChoice);
    for(let i = 0; i < gridDivs.length; i++){
        gridDivs[i].style.border = "1px solid black";
    }
    // TO-DO: Use a Mouse-up event to have the grids disappear instead of using a timer.
    setTimeout( () => { 
        for(let i = 0; i < gridDivs.length; i++){
            gridDivs[i].style.border = "none";
        } 
    }, 2500);   
}

function resetGridElementColours(){
    let gridDivs = document.body.getElementsByClassName("grid-element");
    for(let i = 0; i < gridDivs.length; i++){
        gridDivs[i].style.background = userBackgroundChoice;
    }
}

colourChangeDivs = document.getElementsByClassName("eas-colour-choice");
for(let i = 0; i < colourChangeDivs.length; i++){
    colourChangeDivs[i].onclick = function(){
        changeUserColour(i);
    }
}

function changeUserColour(divIndex){
    if(brushSelected == 0){
        userColourChoice = window.getComputedStyle(colourChangeDivs[divIndex], null).getPropertyValue("background-color");
        document.getElementById("paint-colour-selector").value = RGBAToHex(userColourChoice);
    } else if (brushSelected == 1) {
        userBackgroundChoice = window.getComputedStyle(colourChangeDivs[divIndex], null).getPropertyValue("background-color");
        document.getElementById("background-colour-selector").value = RGBAToHex(userBackgroundChoice);
    }
    for(let i = 0; i < colourChangeDivs.length; i++){
        if(i != divIndex)
            colourChangeDivs[i].classList.remove("colour-choice-selection");
    }
    colourChangeDivs[divIndex].classList.add("colour-choice-selection");
    // Glow Effect - Have to add an effect remover if wished to be used.
    //colourChangeDivs[divIndex].style.boxShadow = `inset -1px -2px 2px rgba(0,0,0,0.9),inset 1px 1px 1px rgba(255,255,255,0.7), 1px 1px 0px 1px rgba(0,0,0,0.4),0px 0px 5px ${userColourChoice}`;
}

/* TO DO: Add fix to mouse button being held down when exiting main container
div.addEventListener('mouseenter', function(){
    // stuff to do when the mouse enters this div
  }, false);
*/

/* TO-DO: Change the below to add a class to the button instead of changing the background colour*/
function switchPaintControls(controlSelected){
    if(controlSelected == 0){
        document.getElementById("btn-brush-paint").style.background = 'url("/assets/img/eas-btn-in.png") no-repeat';
        document.getElementById("btn-brush-background").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
        document.getElementById("btn-brush-erase").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
    } else if(controlSelected == 1){
        document.getElementById("btn-brush-paint").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
        document.getElementById("btn-brush-background").style.background = 'url("/assets/img/eas-btn-in.png") no-repeat';
        document.getElementById("btn-brush-erase").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
    } else if(controlSelected == 2){
        document.getElementById("btn-brush-paint").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
        document.getElementById("btn-brush-background").style.background = 'url("/assets/img/eas-btn-out.png") no-repeat';
        document.getElementById("btn-brush-erase").style.background = 'url("/assets/img/eas-btn-in.png") no-repeat';
    }
}

function changeColourPalette(direction){
    if(direction == 0)
        if(currentColourPalette  >= colourPalettes.length - 1)
            currentColourPalette = 0;
        else 
            currentColourPalette++;   
    else if (direction == 1)
        if(currentColourPalette <= 0)
            currentColourPalette = colourPalettes.length - 1;
        else
            currentColourPalette--;
    for(let i = 0; i < colourChangeDivs.length; i++)
            colourChangeDivs[i].style.background = colourPalettes[currentColourPalette][i];
}

function initApp(){
    document.getElementById("paint-colour-selector").value = RGBAToHex(userColourChoice);
    document.getElementById("background-colour-selector").value = RGBAToHex(userBackgroundChoice);
    switchPaintControls(0); 
    generateGridDivs(document.getElementById("slider-num-elements").value, userBackgroundChoice);  
}

/* Colour conversion functions taken from CSS-Tricks.com: ttps://css-tricks.com/converting-color-spaces-in-javascript/  */
function RGBAToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    if(rgb[3]=="a"){
        rgb = rgb.substr(5).split(")")[0].split(sep);
    } else {
        rgb = rgb.substr(4).split(")")[0].split(sep);
    }
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    return "#" + r + g + b;
}
function hexToRGBA(h) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return "rgb("+ +r + "," + +g + "," + +b + ",1)";
}

initApp();