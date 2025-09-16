// main variables
let input = document.querySelector(".task-input");
let addTask = document.querySelector(".add-task");
let result = document.querySelector(".result");

// add click on addbtn
addTask.addEventListener("click", showData);

function showData() {
  if (input.value !== "") {
    // create id
    let id = Date.now();
    // create task
    createTask(input.value, id, false);
    storgeData(input.value, id);
  } else {
    return;
  }
  input.value = "";
}

// create task
function createTask(valueInput, id, status) {
  // create Element
  let li = document.createElement("li");
  let info = document.createElement("div");
  let inputSide = document.createElement("input");
  let label = document.createElement("label");
  let btn = document.createElement("div");
  let remove = document.createElement("div");

  // add attrebute
  inputSide.className = "info";
  inputSide.type = "checkbox";
  inputSide.id = id;
  label.setAttribute("for", id);
  info.className = "info";
  btn.className = "btn";
  remove.className = "remove";

  //   add text
  label.innerHTML = valueInput;

  remove.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  //   check
  if (status) {
    li.classList.add("done");
    inputSide.checked = true;
  }

  //   append Element
  result.appendChild(li);
  li.appendChild(info);
  info.appendChild(inputSide);
  info.appendChild(label);
  li.appendChild(btn);
  btn.appendChild(remove);

  //   click event
  remove.addEventListener("click", removeData);

  inputSide.onclick = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((ele) => {
      if (ele.id == inputSide.id) {
        if (inputSide.checked) {
          ele.status = true;
          li.classList.add("done");
          inputSide.checked = true;
        } else {
          li.classList.remove("done");
          ele.status = false;
        }
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  //   remove Data
  function removeData() {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// function localStorge
function storgeData(valueInput, id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let obj = {
    taskName: valueInput,
    id: id,
    status: false,
  };

  tasks.push(obj);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// show task
function showTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((ele) => {
    createTask(ele.taskName, ele.id, ele.status);
  });
}

showTask();
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    showData();
  }
});
