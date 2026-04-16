const API = "/tasks";

// ================= EMPTY STATE =================
function renderEmpty(list, message = "No tasks found") {
    list.innerHTML = `<li style="color:gray;font-style:italic;">${message}</li>`;
}

// ================= LOAD =================
window.onload = () => {
    refreshAll();
};

// ================= COMMON FETCH =================
async function getAllTasks() {
    const res = await fetch(API);
    return await res.json();
}

// ================= AUTO REFRESH =================
function refreshAll() {
    fetchTasks();
    loadUpdate();
    loadDelete();
    loadComplete();
    filterTasks();
}

// ================= VIEW =================
async function fetchTasks() {
    const tasks = await getAllTasks();

    const date = document.getElementById("viewDate")?.value;
    const list = document.getElementById("taskList");

    list.innerHTML = "";

    if (!date) {
        renderEmpty(list, "Select a date to view tasks");
        return;
    }

    const filtered = tasks.filter(t => t.date?.slice(0, 10) === date);

    if (filtered.length === 0) {
        renderEmpty(list);
        return;
    }

    filtered.forEach(task => {
        list.innerHTML += `
        <li>
            <b>${task.title}</b> - ${task.description}
            (${task.date})
            ${task.completed ? "✔ Done" : "❌ Pending"}
        </li>`;
    });
}

// ================= CREATE =================
async function addTask() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const date = document.getElementById("date").value;
    const error = document.getElementById("error");

    if (!title) {
        error.innerText = "Title required!";
        return;
    }

    // BLOCK PAST DATE
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(date);

    if (inputDate < today) {
        error.innerText = "Cannot create task for past date!";
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description: desc,
            date,
            completed: false
        })
    });

    error.innerText = "Task Added ✔";

    refreshAll();
}

// ================= UPDATE =================
async function loadUpdate() {
    const tasks = await getAllTasks();

    const date = document.getElementById("updateDate")?.value;
    const list = document.getElementById("updateList");

    list.innerHTML = "";

    if (!date) {
        renderEmpty(list, "Select a date to view tasks");
        return;
    }

    const filtered = tasks.filter(t => t.date?.slice(0, 10) === date);

    if (filtered.length === 0) {
        renderEmpty(list);
        return;
    }

    filtered.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.innerHTML = `
                <b>${task.title}</b> - ${task.description}
                <span style="color:green;font-weight:bold;"> ✔ DONE</span>
            `;
        } else {
            li.innerHTML = `
                <b>${task.title}</b> - ${task.description}
                <button onclick="editTask('${task._id}','${task.title}','${task.description}')">
                    Edit
                </button>
            `;
        }

        list.appendChild(li);
    });
}

// ================= EDIT =================
async function editTask(id, oldTitle, oldDesc) {
    const newTitle = prompt("New Title", oldTitle);
    const newDesc = prompt("New Desc", oldDesc);

    if (!newTitle) return;

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newTitle,
            description: newDesc
        })
    });

    refreshAll();
}

// ================= DELETE =================
async function loadDelete() {
    const tasks = await getAllTasks();

    const date = document.getElementById("deleteDate")?.value;
    const list = document.getElementById("deleteList");

    list.innerHTML = "";

    if (!date) {
        renderEmpty(list, "Select a date to view tasks");
        return;
    }

    const filtered = tasks.filter(t => t.date?.slice(0, 10) === date);

    if (filtered.length === 0) {
        renderEmpty(list);
        return;
    }

    filtered.forEach(task => {
        list.innerHTML += `
        <li>
            ${task.title}
            <button onclick="deleteTask('${task._id}')">Delete</button>
        </li>`;
    });
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    refreshAll();
}

// ================= COMPLETE =================
async function loadComplete() {
    const tasks = await getAllTasks();

    const date = document.getElementById("completeDate")?.value;
    const list = document.getElementById("completeList");

    list.innerHTML = "";

    if (!date) {
        renderEmpty(list, "Select a date to view tasks");
        return;
    }

    const filtered = tasks.filter(t => t.date?.slice(0, 10) === date);

    if (filtered.length === 0) {
        renderEmpty(list);
        return;
    }

    filtered.forEach(task => {
        list.innerHTML += `
        <li>
            ${task.title}
            ${
                task.completed
                    ? "<span style='color:green;font-weight:bold;'>✔ Done</span>"
                    : `<button onclick="completeTask('${task._id}', ${task.completed})">Mark Done</button>`
            }
        </li>`;
    });
}

async function completeTask(id, completed) {
    if (completed) return alert("Already done");

    await fetch(`${API}/${id}/complete`, {
        method: "PATCH"
    });

    refreshAll();
}

// ================= FILTER =================
async function filterTasks() {
    const tasks = await getAllTasks();

    const date = document.getElementById("filterDate")?.value;
    const list = document.getElementById("filterList");

    list.innerHTML = "";

    if (!date) {
        renderEmpty(list, "Select a date to view tasks");
        return;
    }

    const filtered = tasks.filter(t => t.date?.slice(0, 10) === date);

    if (filtered.length === 0) {
        renderEmpty(list);
        return;
    }

    filtered.forEach(t => {
        list.innerHTML += `
        <li>
            ${t.title} ${t.completed ? "✔ Done" : "❌ Pending"}
        </li>`;
    });
}