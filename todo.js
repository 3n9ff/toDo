"use strict"
//Extracción de datos genèricos i creación de variables
const toDoItemsContent = document.getElementById("toDO-items-content");
const ItemsContent = document.querySelectorAll(".items-content");
const toDoLocalData = localStorage.getItem("toDoItemsContainer");
const doingLocalData = localStorage.getItem("doingItemsContainer");
const doingContent = document.getElementById("doing-items-content");
const toDoContent = document.getElementById("toDO-items-content");
let toDoCode = parseInt(localStorage.getItem("toDoCode"));
let inputActive = false;
let targetedInput;
let empty;
let toDoExample;

//Crear funcion que genera inputs
const createInput = ()=>{
    toDoCode ++;
    
    if(toDoExample){
        toDoContent.removeChild(toDoExample);
        toDoExample = null;
        empty = false;
    };

    toDoItemsContent.innerHTML += `
    <div class="items" id="item${toDoCode}" draggable="true">
        <input class="item-inputs item-input${toDoCode}" type="text">
        <div class="separators"></div>
    </div>`;

    inputActive = true;
    targetedInput = document.querySelector(`.item-input${toDoCode}`);
    targetedInput.focus(); 
};

//Funcion que convierte las respuestas de los inputs en elementos
const createToDo = ()=>{
    if (targetedInput.value){
        targetedInput.outerHTML = `
            <p class="items-value" >${targetedInput.value}</p>
             `;    
        inputActive = false;
    };
};

//Buscar si hay algun div o si esta el ejemplo dentro de los datos locales de ToDO
if(/draggable="true"/.test(toDoLocalData)){
    toDoContent.innerHTML = toDoLocalData;
    toDoExample = document.querySelector("#exampleItem");
    empty= false;

}else{
    toDoExample = null;
    toDoExample = document.querySelector("#exampleItem");
    empty= true;
};

//Buscar si hay algun div dentro de los datos locales de Doing
if(/div/.test(doingLocalData))doingContent.innerHTML = doingLocalData;

//Si hay algun error en el id de los todos se reinicia a -1
if(isNaN(toDoCode)) toDoCode=-1

//Guadar datos antes de cerrar el programa
addEventListener("beforeunload",()=>{
    if(toDoCode>-1){
        localStorage.setItem("toDoItemsContainer",document.getElementById("toDO-items-content").innerHTML);
        localStorage.setItem("doingItemsContainer",document.getElementById("doing-items-content").innerHTML);
        localStorage.setItem("toDoCode",toDoCode);
    }
});

//Funcionalidad de la teclas
addEventListener("keypress",(e)=>{
    if(e.code == "Enter" && inputActive == false){
        createInput();
    }else if(e.code == "Enter" && inputActive){
        createToDo();
    };
});

//Controlar el agarre i arrastre de un objeto
ItemsContent.forEach(el => {
    el.addEventListener("dragstart",e=>{
        e.dataTransfer.setData("text", e.target.id);
    });
    el.addEventListener("dragover",e=>{
        e.preventDefault();
    });
    el.addEventListener("drop",e=>{
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        if (e.target.classList.contains("items")){

            e.target.parentNode.appendChild(document.getElementById(data));

        }else if(e.target.classList.contains("items-content")){

            e.target.appendChild(document.getElementById(data));
        };
    });
});