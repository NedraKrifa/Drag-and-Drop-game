let count=0;
const totalDraggableItems = 9;

let draggableElements=document.querySelectorAll('.draggable');
let droppableElements=document.querySelectorAll('.droppable');
let playAgainBtn = document.getElementById("play-again-btn");

initiateGame();

function initiateGame(){
    draggableElements.forEach(item => {
        item.addEventListener("dragstart", dragStart);
    });
    droppableElements.forEach(item => {
        item.addEventListener("dragenter",dragEnter);
        item.addEventListener("dragover",dragOver);
        item.addEventListener("dragleave",dragLeave);
        item.addEventListener("drop",drop);
    });
}

playAgainBtn.addEventListener('click',playAgain);

//Drag and Drop Functions
function dragStart(event){
    event.dataTransfer.setData("Text", event.target.id);
}
function dragEnter(event){
    if(!event.target.classList.contains("dropped")){
        event.target.classList.add('droppable-hover');
    }
}
function dragOver(event){
    if(!event.target.classList.contains("dropped")){
        event.preventDefault();
    }
}
function dragLeave(event){
    if(!event.target.classList.contains("dropped")){
        event.target.classList.remove('droppable-hover');
    }
}
function drop(event){
    event.preventDefault();
    event.target.classList.remove('droppable-hover');
    const draggableElementData = event.dataTransfer.getData('text');
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    if(draggableElementData === droppableElementData){
        const draggableElement = document.getElementById(draggableElementData);
        event.target.classList.add("dropped");
        event.target.style.backgroundColor = draggableElement.style.color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        //event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
        event.target.innerHTML=`<i class="fas fa-${draggableElementData}"></i>`;
        count++;    
    }
    if(count === totalDraggableItems){
        playAgainBtn.style.display = "block";
    }
}

function playAgain(){
    playAgainBtn.style.display = "none";
    draggableElements.forEach(draggableElement => {
        draggableElement.classList.remove("dragged");
        draggableElement.setAttribute("draggable", "true");
    });
    droppableElements.forEach(droppableElement => {
        droppableElement.classList.remove("dropped");
        droppableElement.style.backgroundColor='#fff';
        droppableElement.removeChild(droppableElement.firstChild);
        droppableElement.innerHTML=`<span>${droppableElement.getAttribute("data-draggable-id")}</span>`;
    });
    count=0;
    initiateGame();
 
}