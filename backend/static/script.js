const InputContainer = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");

const API_URL = `${window.location.protocol}//${window.location.hostname}:5000/todos`;


window.onload = loadTasks;


function addtask() {
    const task = InputContainer.value.trim();

    if (task === "") {
        alert("You must add some task");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
    })
    .then(() => {
        InputContainer.value = "";
        loadTasks(); // reload list
    });
}


function loadTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            ListContainer.innerHTML = "";

            data.forEach(todo => {
                let li = document.createElement("li");
                li.innerHTML = todo[1]; // todo[1] = task text
                ListContainer.appendChild(li);

                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
            });
        });
}


ListContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        alert("Delete API not implemented yet");
    }
}, false);

