

//1. getting the input from the form
//2. saving the input in local storage
//3. clearing the input field

//select form, add listener, add a function which takes the message, and writes in localStorage + clears the form 

// declaring variables
const newTask = document.getElementById('newToDo');
const toDoForm = document.getElementById('inputForm');
const toDoSection = document.getElementById('toDos')
let toDoTasksArray = [];
let timeStamp;

// adding array to local storage
function toLocalStorage (array) {
    //timeStamp = Date.now();
    localStorage.setItem('tasks', JSON.stringify(array));  
}
//parsing data from local storage
function fromLocalStorage (array) {
   let parsedArray = JSON.parse(localStorage.getItem('tasks')); 
   return parsedArray;
};

//function which creates and renders new element
function createDiv (element) {
    const newDiv = document.createElement('div');
    newDiv.class = "row d-flex align-items-center";
    newDiv.innerHTML =`<i class="bi bi-bank col-1 m-auto pb-2"></i>
    <p class="col-8 mt-2 p-2">${element}</p>
    <div class="form-check col-2">
        <input class="form-check-input" type="checkbox" value="" id="done">
        <label class="form-check-label" for="done">
          Schon erledigt?
        </label>
    </div>
    <button class="activeToDosButtons col-1" id="deleteButton"><i class="bi bi-trash"></i></button>`;
    toDoSection.appendChild(newDiv);
}


// Getting Values/Texts from Input Form and saving it to the array.
function inputIntake (event) {
    event.preventDefault();
    toDoTasksArray.push(newTask.value);
    newTask.value=''; 
    newTask.focus();
    // Saving the array to local storage
toLocalStorage(toDoTasksArray);
//Getting the items from local storage
let toDoTasksSavedArray = fromLocalStorage(toDoTasksArray);
//Rendering the tasks in the "above" section
toDoTasksSavedArray.forEach((element)=> {
    
    createDiv(element);
    
   });
}

toDoForm.addEventListener('submit', inputIntake);








//4. presenting/getting the items from local storage and rendering them on the "open toDos section"
//gettingItems from localStorage + putting them in the "pre-prepared" Div container, appending the section



//5. checking the "checkbox" as "done" -> if so, taking the item from "Open toDos Section" to a lower "Done Section" - from local Storage?
//6. adding additional formatting for the "done items"

//7. adding functionality to delete Item buttons - clearing an item from local storage
//removeItem + remove() element method

//8. adding functionality to clear the "done items" section
//section content - remove()

// !!!adding dropdown with icons to choose from!!!//