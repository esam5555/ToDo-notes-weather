// main variables
let addNote = document.querySelector(".new-note");
let contResult = document.querySelector(".cont");

// add event click on the addNote
addNote.addEventListener("click", () => showAlldata());

// function show Data
function showAlldata(info = " Write Your note here...", id = Date.now()) {
  //   create element
  let mainDiv = document.createElement("div");
  let note = document.createElement("div");
  let controls = document.createElement("div");
  let remove = document.createElement("div");
  let save = document.createElement("div");

  //   add class and Attrebute
  mainDiv.className = "data";
  note.setAttribute("contenteditable", true);
  note.className = "side";
  controls.className = "controls";
  remove.className = "remove";
  save.className = "save";

  //   add text and icon
  note.innerHTML = info;
  remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
  save.innerHTML = ' <i class="fa-solid fa-floppy-disk"></i>';

  //   append element

  contResult.appendChild(mainDiv);
  mainDiv.appendChild(note);
  mainDiv.appendChild(controls);
  controls.appendChild(remove);
  controls.appendChild(save);

  //   event remove Element
  remove.onclick = function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((n) => n.id !== Number(id));

    localStorage.setItem("notes", JSON.stringify(notes));

    mainDiv.remove();
  };

  //   event remove Element
  save.onclick = function () {
    saveData(note.innerHTML, id);
  };

  // update auto
  note.addEventListener("input", function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.map((n) => {
      if (n.id === id) {
        n.info = note.innerHTML;
      }
      return n;
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}

// localStorage.removeItem("notes");
// start save data in localStorge
function saveData(note, id) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  let obj = {
    info: note,
    id: id,
  };

  notes.push(obj);

  localStorage.setItem("notes", JSON.stringify(notes));
}

// show data from localStorge
function apperData() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((ele) => {
    showAlldata(ele.info, ele.id);
  });
}

window.onload = apperData;
