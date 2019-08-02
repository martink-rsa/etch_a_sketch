let gridElementColourDefault = "gray";
let userColourChoice = "black";
let mouseDown = 0;

document.getElementById("container-eas-main").onmousedown = function() {mouseDown = 1};
document.getElementById("container-eas-main").onmouseup = function() {mouseDown = 0};

document.getElementById("btn-reset-grid").onclick = function() {resetGridElementColours()};

function generateGridDivs(numGridElements){

    let gridContainer = document.getElementById("container-eas-main");

    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.firstChild);
    }

    let numRowsColumns = Math.floor(Math.sqrt(numGridElements));
    numGridElements = numRowsColumns * numRowsColumns;
    gridContainer.style.gridTemplateColumns = `repeat(${numRowsColumns}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${numRowsColumns}, 1fr)`;

    let gridDiv = document.createElement("div");

    for(let i = 0; i < numGridElements; i++){
        let gridDiv = document.createElement("div");
        gridDiv.style.background = gridElementColourDefault;
        gridDiv.setAttribute("class", "grid-element");
        gridDiv.addEventListener('mousemove', () => {changeGridElementColour(gridDiv)});
        document.getElementById("container-eas-main").appendChild(gridDiv);   
    }
}

function changeGridElementColour(d){
    if(mouseDown == 1)
        d.style.background = userColourChoice;
}

document.getElementById("slider-num-elements").oninput = function() {

    let gridDivs = document.body.getElementsByClassName("grid-element");
    generateGridDivs(document.getElementById("slider-num-elements").value);
    for(let i = 0; i < gridDivs.length; i++){
        gridDivs[i].style.border = "1px solid black";
    }

    setTimeout( () => { 
        for(let i = 0; i < gridDivs.length; i++){
            gridDivs[i].style.border = "none";
        }
    }, 2000);   
}



function resetGridElementColours(){
    let gridDivs = document.body.getElementsByClassName("grid-element");
    for(let i = 0; i < gridDivs.length; i++){
        gridDivs[i].style.background = gridElementColourDefault;
    }
}


colourChangeDivs = document.getElementsByClassName("eas-colour-choice");
for(let i = 0; i < colourChangeDivs.length; i++){
    colourChangeDivs[i].onclick = function(){
        changeUserColour(i);
    }
}



function changeUserColour(divIndex){

    userColourChoice = window.getComputedStyle(colourChangeDivs[divIndex], null).getPropertyValue("background-color");
    for(let i = 0; i < colourChangeDivs.length; i++){
        if(i != divIndex)
            colourChangeDivs[i].classList.remove("colour-choice-selection");
    }
    colourChangeDivs[divIndex].classList.add("colour-choice-selection");
}

/*
function initColours(){
    for(let i = 1; i < colourChangeDivs.length; i++){
        colourChangeDivs[i].classList.toggle("colour-choice-selection");
    }   
}

initColours();
*/



//window.getComputedStyle(colourChangeDivs[0], null).getPropertyValue("background-color");








generateGridDivs(document.getElementById("slider-num-elements").value);



// Draw the grids
// Add the divs
// Add events to the divs for hover (highlight cell) and click (colour in cell)

// CONSIDERATION: To change the div colours dynamically during runtime, 
//      consider looping through all of the elements using DOM controls.


