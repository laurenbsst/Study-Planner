let prevMonthBtn = document.querySelector(".prev");
let nextMonthBtn = document.querySelector(".next");

function todoSyncSetup() {
    let currentMonth = document.querySelector(".date").firstElementChild.innerHTML.slice(0, 3);
    let currentMonthTasks = [];
    let allTasks = document.querySelectorAll(".task");
    let daysEl = document.querySelector(".days");
    allTasks.forEach((task) => {
        if (task.firstElementChild.innerHTML.includes(currentMonth)) {
            currentMonthTasks.push(task)
        }
    })
    currentMonthTasks.forEach((task) => {
        let taskDate = new Date(task.firstElementChild.firstElementChild.innerHTML).getDate();
        taskDate = taskDate.toString()
        Array.from(daysEl.children).forEach((day) => {
            if (!day.classList.contains("next-date") && day.innerHTML === taskDate) {
                day.setAttribute("style", "background-color: yellow;color: #000")
                day.addEventListener("click", (event) => {
                    showTasksForDay(event.target)
                })
            }
        })
    })
}

function toggleCurrentDateTasksContainer() {
    let currentDateTasksContainer = document.querySelector(".current-date-tasks-container");
    currentDateTasksContainer.classList.toggle("d-none")
}

function deleteTasksFromCalendar() {
    let taskDelBtns = document.querySelectorAll(".del-btn");
    let allTasks = document.querySelector(".tasks-table").firstElementChild.nextElementSibling.children;
    taskDelBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove()
            Array.from(allTasks).forEach((task) => {
                if (task.innerHTML === btn.parentElement.parentElement.innerHTML) {
                    task.remove()
                }
            })
        })
    })
}

function markTasksCompleteFromCalendar() {
    let taskDoneBtns = document.querySelectorAll(".done-btn");
    let allTasks = document.querySelector(".tasks-table").firstElementChild.nextElementSibling.children;
    taskDoneBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let taskParent = btn.parentElement.parentElement;
            Array.from(allTasks).forEach((task) => {
                if (task.innerHTML === taskParent.innerHTML) {
                    task.classList.add("completed");
                    task.children[3].innerHTML = `
                    <span class="done">COMPLETED</span>
                    `;
                }
            })
            taskParent.classList.add("completed");
            taskParent.children[3].innerHTML = `
            <span class="done">COMPLETED</span>
            `;
            taskParent.children[3].setAttribute("style", "text-decoration: none");
        })
    })
}

function showTasksForDay(day) {
    let currentMonth = document.querySelector(".date").firstElementChild.innerHTML.slice(0, 3);
    let currentYear = document.querySelector(".date").firstElementChild.nextElementSibling.innerHTML.slice(-4);
    let selectedDate = `${day.innerHTML} ${currentMonth} ${currentYear}`
    selectedDate = new Date(selectedDate).toDateString();
    toggleCurrentDateTasksContainer();
    let currentTasksContainer = document.querySelector(".current-date-tasks").firstElementChild.nextElementSibling;
    currentTasksContainer.innerHTML = "";
    let allTasks = document.querySelector(".tasks-table").firstElementChild.nextElementSibling.children;
    Array.from(allTasks).forEach((task) => {
        if (task.firstElementChild.firstElementChild.innerHTML.includes(currentMonth)) {
            if (task.firstElementChild.firstElementChild.innerHTML === selectedDate) {
                currentTasksContainer.innerHTML += `<tr class="current-day-task">${task.innerHTML}</tr>`;
            }
        }
    })
    deleteTasksFromCalendar()
    markTasksCompleteFromCalendar()
}

let currentDateTasksOverlayBtn = document.querySelector(".current-date-tasks-overlay");
currentDateTasksOverlayBtn.addEventListener("click", toggleCurrentDateTasksContainer)

todoSyncSetup();

prevMonthBtn.addEventListener("click", todoSyncSetup);
nextMonthBtn.addEventListener("click", todoSyncSetup);