// declaring variables
const newTask = document.getElementById("newToDo");
const toDoForm = document.getElementById("inputForm");
const toDoSection = document.getElementById("toDos");
const doneSection = document.getElementById("slate");
const clearDone = document.getElementById("cleanDoneButton");
const divToDel = document.getElementById("toDoMainDiv");
const clearActiveList = document.getElementById("cleanListButton");
const doneDivSection = document.getElementById("slateDone");

let toDoTasksArray = [];

//getting pre-existing items from local storage
if (localStorage.length === 0) {
	toDoTasksArray = [];
} else {
	toDoTasksArray = JSON.parse(localStorage.getItem("tasks"));
}

// (function declaration) adding array to local storage
function toLocalStorage(array) {
	localStorage.setItem("tasks", JSON.stringify(array));
}
//(function declaration) parsing data from local storage
function fromLocalStorage(array) {
	let parsedArray = JSON.parse(localStorage.getItem("tasks"));
	return parsedArray;
}

// (function declaration) creates and renders new elements in a (new) div
function createDiv(element) {
	const newMainDiv = document.createElement("div");
	newMainDiv.id = "toDoMainDiv";
	toDoSection.appendChild(newMainDiv);
	const newDiv = document.createElement("div");
	newDiv.className = "row d-flex align-items-center justify-content-center";
	newDiv.setAttribute("name", "openDiv");
	newDiv.innerHTML = ` <i class="bi bi-calendar2 col-1 m-auto pb-2"></i>
    <p class="col-8 mt-2 p-2">${element}</p>
    <div class="form-check col-2">
        <input class="form-check-input" type="checkbox" value="" id="done" name = "done">
        <label class="form-check-label" for="done">
          Scho gmachdes?
        </label>
    </div>
    <button class="activeToDosButtons col-1" id="deleteSmall"><i class="bi bi-trash"></i></button>`;
	newMainDiv.appendChild(newDiv);

	//const newMainDoneDiv = document.createElement('div');
	const newMainDoneDiv = document.createElement("div");
	newMainDoneDiv.id = "doneMainDiv";
	doneDivSection.appendChild(newMainDoneDiv);
	const newDoneDiv = document.createElement("div");
	newDoneDiv.className = "row d-none align-items-center justify-content-center";
	newDoneDiv.setAttribute("name", "newDoneDiv");
	
	newDoneDiv.innerHTML = ` <i class="bi bi-calendar2 col-1 m-auto pb-2"></i>
    <p class="col-8 mt-2 p-2 text-decoration-line-through" name="text">${element}</p>
    <div class="form-check col-2 doneElement">
        <input class="form-check-input doneElements" type="checkbox" value="" id="done" name = "doneDone" checked disabled>
        <label class="form-check-label" for="done">
          Scho gmachd!
        </label>
    </div>
    <button class="activeToDosButtons col-1 doneButtons" id="deleteSmall" disabled><i class="bi bi-trash"></i></button>`;
	newMainDoneDiv.appendChild(newDoneDiv);
}


// (function declaration) Getting Values/Texts from Input Form and saving it to the array.
function inputIntake(event) {
	//event.preventDefault();
	if (newTask.value === "" || newTask.value === " ") {
		event.preventDefault();
		alert("Leere Aufgabe zählt nischd!");
	} else {
		toDoTasksArray.push(newTask.value);
	}
	newTask.value = "";
	newTask.focus();

	// Saving the array to local storage
	toLocalStorage(toDoTasksArray);
	//Getting the items from local storage
	let toDoTasksSavedArray = fromLocalStorage(toDoTasksArray);
	//Clearing the pre-rendered section elements

	toDoSection.replaceChildren();
	//Taking each element from local Storage and presenting as tasks
	toDoTasksSavedArray.forEach((element) => {
		createDiv(element);
	});
}

//if clause for "preexisting" local Storage + "for the items to stay on the page upon reload"
if (localStorage.length !== 0) {
	let localStorageSaved = fromLocalStorage(localStorage);
	localStorageSaved.forEach((element) => {
		createDiv(element);
	});
}

toDoForm.addEventListener("submit", inputIntake);

//adding button to clean entire section of done items
clearDone.addEventListener("click", () => {
	doneDivSection.replaceChildren();
});
// delete button for the entire list of active and done  to Dos
clearActiveList.addEventListener("click", () => {
	toDoSection.replaceChildren();
    doneDivSection.replaceChildren();
	localStorage.clear();
	toDoTasksArray = [];
});

// delete singular items
let smallDelete = document.getElementsByClassName("activeToDosButtons col-1");
for (let i = 0; i < smallDelete.length; i++) {
	smallDelete[i].addEventListener("click", () => {
		let currentArray = fromLocalStorage(toDoTasksArray);
		currentArray.splice(i, 1);
		toLocalStorage(currentArray);
		smallDelete[i].parentElement.remove();
		location.reload();
	});
}

//5. checking the "checkbox" as "done" -> if so, taking the item from "Open toDos Section" to a lower "Done Section"

let doneTicked = document.getElementsByName("done");
let openDivs = document.getElementsByName("openDiv");
let doneDivs = document.getElementsByName("newDoneDiv");
let tickedArray = [];
let doneDivsArray = [];

for (let i = 0; i < doneTicked.length; i++) {
    doneTicked[i].addEventListener("change", () => { 
    openDivs[i].className =
        "row d-none align-items-center justify-content-center";
    doneDivs[i].className =
        "row d-flex align-items-center justify-content-center";

    let currentArray = fromLocalStorage(toDoTasksArray);
    currentArray.splice(i, 1);
	toLocalStorage(currentArray);
    
    
});
}

