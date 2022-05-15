// select new task add button
let openPopupBtn = document.querySelector(".add-new-task-btn");
// open the new task form popup once the button is clicked
openPopupBtn.addEventListener("click", toggleNewTaskFormPopup);
// function to be used for opening the form popup
function toggleNewTaskFormPopup() {
    // select the new task form container
    let newTaskContainer = document.querySelector(".new-task-container");
    newTaskContainer.classList.toggle("d-none")
}

// select the cancel button
let cancelBtn = document.querySelector(".cancel-new-task-btn");
// close the popup and clear the values once cancel button is clicked
cancelBtn.addEventListener("click", cancelNewTask);
function cancelNewTask() {
    clearValues()
    // close the popup
    toggleNewTaskFormPopup()
}

function clearValues() {
    // select all new task inputs
    let newTaskInputs = document.querySelectorAll(".new-task-input");
    newTaskInputs.forEach((input) => {
        if (input.getAttribute("type") != "radio") {
            input.value = "";
        }
        else if (input.getAttribute("type") === "radio") {
            if (input.checked) {
                input.checked = false;
            }
        }
    })
}

// select overlay
let newTaskOverlay = document.querySelector(".new-task-overlay");
newTaskOverlay.addEventListener("click", ()=>{
    toggleNewTaskFormPopup()
    clearValues()
})

// delete the existing tasks
function deleteTasks() {
    let taskDelBtns = document.querySelectorAll(".del-btn");
    taskDelBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove()
        })
    })
}

// complete the tasks
function markTasksComplete() {
    let taskDoneBtns = document.querySelectorAll(".done-btn");
    taskDoneBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let taskParent = btn.parentElement.parentElement;
            taskParent.classList.add("completed");
            taskParent.children[3].innerHTML = `
            <span class="done">COMPLETED</span>
            `;
            taskParent.children[3].setAttribute("style", "text-decoration: none")
        })
    })
}

deleteTasks();
markTasksComplete()


// select add new task button
let addNewTaskBtn = document.querySelector(".done-new-task-btn");
addNewTaskBtn.addEventListener("click", addNewTask);
function addNewTask() {
    let tasksListContainer = document.querySelector(".tasks-table");
    let taskDate = document.querySelector("#taskDate");
    let taskDescription = document.querySelector("#taskDescription");
    let allPriorityInputs = document.querySelectorAll(".task-priority-input");
    let priorityError = true;
    let addTask = true;
    if (taskDate.value === "") {
        if (!taskDate.parentElement.lastElementChild.classList.contains("warning-msg")) {
            taskDate.parentElement.innerHTML += `
            <p class="warning-msg">Please select a date to continue.</p>
            `;
        }
        addTask = false;
    }
    else if (taskDate.value != "") {
        if (taskDate.parentElement.lastElementChild.classList.contains("warning-msg")) {
            taskDate.parentElement.lastElementChild.remove()
        }
    }
    if (taskDescription.value.trim() === "") {
        if (!taskDescription.parentElement.lastElementChild.classList.contains("warning-msg")) {
            taskDescription.parentElement.innerHTML += `
            <p class="warning-msg">Please enter the task description to continue.</p>
            `;
        }
        addTask = false;
    }
    else if (taskDescription.value.trim() != "") {
        if (taskDescription.parentElement.lastElementChild.classList.contains("warning-msg")) {
            taskDescription.parentElement.lastElementChild.remove()
        }
    }
    allPriorityInputs.forEach((input) => {
        if (input.checked) {
            priorityError = false;
        }
    })
    if (priorityError) {
        if (!allPriorityInputs[2].parentElement.lastElementChild.classList.contains("warning-msg")) {
            allPriorityInputs[2].parentElement.innerHTML += `
            <p class="warning-msg">Please enter the priority option to continue.</p>
            `;
        }
        addTask = false;
    }
    else if (!priorityError) {
        if (allPriorityInputs[2].parentElement.lastElementChild.classList.contains("warning-msg")) {
            allPriorityInputs[2].parentElement.lastElementChild.remove()
        }
    }
    if (addTask) {
        taskDate = new Date(taskDate.value).toDateString();
        taskDescription = taskDescription.value;
        tasksListContainer.firstElementChild.nextElementSibling.innerHTML += `
        <tr class="task">
        <td>
            <span class="date">${taskDate}</span>
        </td>
        <td>
            ${taskDescription}
        </td>
        <td>
            ${getPriorityForNewTask()}
        </td>
        <td>
            <i class="fa-solid fa-check done-btn"></i>
            <i class="fa-solid fa-trash-can del-btn"></i>
        </td>
        </tr>    
        `;
        clearValues()
        deleteTasks()
        markTasksComplete()
        toggleNewTaskFormPopup()
        todoSyncSetup()
    }
}

function getPriorityForNewTask() {
    let allPriorityInputs = document.querySelectorAll(".task-priority-input");
    for (let i = 0; i < allPriorityInputs.length; i++) {
        if (allPriorityInputs[i].checked) {
            if (allPriorityInputs[i].value === "high") {
                return "<span class='high'>High Priority</span>"
            }
            else if (allPriorityInputs[i].value === "medium") {
                return "<span class='medium'>Medium Priority</span>"
            }
            else if (allPriorityInputs[i].value === "low") {
                return "<span class='low'>Low Priority</span>"
            }
        }
    }
}