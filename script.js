var array = [];

function callstorage() {

    var fromlocalstorage = JSON.parse(localStorage.getItem("local"));
    if (fromlocalstorage !== null) {
        array = fromlocalstorage;
    }
    console.log(fromlocalstorage);
    console.log(array);

    for (var i = 0; i < array.length; i++) {
        var note = document.createElement("div");
        var container = document.getElementById("notescontainer");
        note.className = "notestyle";
        note.innerHTML = "<span class = 'taskproperties'>" + array[i].task + "</span>" + "<span class = 'dateproperties'>" + array[i].date + "</span>" + "<span class = 'timeproperties'>" + array[i].time + "</span>" + "<i class='fas fa-times deleteproperties' onclick='del(" + array[i].id + ",this )'></i>";

        container.append(note);
    }
}
callstorage();

function add() {
    var task = document.forms["taskform"]["task"].value;
    var date = document.forms["taskform"]["date"].value;
    var time = document.forms["taskform"]["time"].value;
    var id = Math.floor(Math.random() * 1000000);
    if (validation(task, date)) {
        array.push(createObj(task, date, time, id));
        localStorage.setItem("local", JSON.stringify(array));
        var index = array.length - 1;

        var note = document.createElement("div");
        var container = document.getElementById("notescontainer");

        note.className = "notestyle";
        note.innerHTML = "<span class = 'taskproperties'>" + array[index].task + "</span>" + "<span class = 'dateproperties'>" + array[index].date + "</span>" + "<span class = 'timeproperties'>" + array[index].time + "</span>" + "<i class='fas fa-times deleteproperties' onclick='del(" + array[index].id + ",this )'></i>";

        container.append(note);
        document.forms["taskform"]["task"].value = "";
        document.forms["taskform"]["date"].value = "";
        document.forms["taskform"]["time"].value = "";

    }
}
function validation(task, date) {
    if (task == "") {
        document.getElementById("error").value = "Task is empty";
        return false;
    }
    else if (date == "") {
        document.getElementById("error").value = "Please select a date";
        return false;
    }

    else {
        return true;
    }
}

function createObj(task, date, time, id) {
    var obj = {
        task: task,
        date: date,
        time: time,
        id: id
    };
    return obj;
}

function del(id, elem) {
    elem.parentElement.remove();

    var noteindex = array.findIndex((note) => {
        return id == note.id;
    });
    if (noteindex !== -1) {
        array.splice(noteindex, 1);
        localStorage.setItem("local", JSON.stringify(array));
    }

}

function removeall() {
    if (confirm("Are you sure you would like to remove all your tasks?")) {
        array = [];
        localStorage.setItem("local", JSON.stringify(array));
        document.getElementById("notescontainer").innerHTML = "";

    }

}

