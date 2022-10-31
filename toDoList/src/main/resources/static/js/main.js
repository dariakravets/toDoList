let allTheLists = document.querySelectorAll(".list_but");
let allListTexts = document.querySelectorAll(".list_text");
let allTheCheckmarks = document.querySelectorAll(".circle");
let allTaskTexts = document.querySelectorAll(".task_text");
let tasks = '{}';
updateAllTheLists();
updateAllTheCheckmarks();
setAllTheListFromLocStorage()

setTimeout(function(){
    document.getElementById("preloader").style.display = "none";
}, 2000);

document.getElementById("add_list_inner").onclick = function (){
    addListInput();
}

document.getElementById("add_task").onclick = function (){
    addTaskInput();
}

function addListInput(){
    let firstDiv = document.getElementById("lists_block");
    let secDiv = document.createElement("div");
    secDiv.classList.add("list_but");
    firstDiv.appendChild(secDiv);

    let img = document.createElement("img");
    img.src = "images/list.png";
    img.classList.add("list_img");
    secDiv.appendChild(img);

    let input = document.createElement("input");
    input.type = "text";
    input.maxLength = 25;
    input.classList.add("list_text");
    input.classList.add("input");
    secDiv.appendChild(input);

    input.focus();
    input.addEventListener('focusout', () => {
        if (input.value.length === 0){
            secDiv.remove();
        }else {
            if (!haveList(input.value)){
                saveName("list_text", input, secDiv, true);
                saveInLocalStorage(input.value);
                updateAllTheLists();
            }else {
                input.style.border = "2px solid #FA3107"
            }
        }
    });
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            input.blur();
        }
    });
}

function haveList(listText) {
    for (let i = 0; i < allListTexts.length; i++){
        if (allListTexts[i].innerHTML === listText){
            return true;
        }
    }
    return false;
}

function addTaskInput() {
    let firstDiv = document.getElementById("tasks");
    let secDiv = document.createElement("div");
    secDiv.classList.add("task");
    firstDiv.appendChild(secDiv);

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("circle");
    secDiv.appendChild(thirdDiv);

    let img = document.createElement("img");
    img.src = "images/check-mark.png";
    img.classList.add("circle_img");
    thirdDiv.appendChild(img);

    let input = document.createElement("input");
    input.type = "text";
    input.maxLength = 100;
    input.classList.add("list_text");
    input.classList.add("input");
    secDiv.appendChild(input);

    input.focus();
    input.addEventListener('focusout', () => {
        if (input.value.length === 0){
            secDiv.remove();
        }else {
            let text = input.value;
            saveName("task_text", input, secDiv, true);
            saveNewTasks(document.getElementById("name_of_list_text").innerHTML, false, text, secDiv);
            updateAllTheCheckmarks();
        }
    });
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            input.blur();
        }
    });
}

function updateAllTheLists(){
    allTheLists = document.querySelectorAll(".list_but");
    allListTexts = document.querySelectorAll(".list_text");

    allTheLists.forEach(
        function (currentValue, currentIndex, listObj) {
            currentValue.onclick = function (){
                document.getElementById("add_task_online").style.display = "none";

                document.getElementById("name_of_list_text").innerHTML = allListTexts[currentIndex].innerHTML;
                document.getElementById("name_of_list").style.display = "flex";
                document.getElementById("tasks").style.display = "flex";
                document.getElementById("add_task").style.display = "flex";
                addAllTasksOfList(allListTexts[currentIndex].innerHTML)
            }
        },
    );
}

function addAllTasksOfList(listName) {
    let taskOfListJSON = JSON.parse(localStorage.getItem(listName))
    let firstDiv = document.getElementById("tasks");
    firstDiv.innerHTML = "";
    for(let key in taskOfListJSON){
        let secDiv = document.createElement("div");
        secDiv.classList.add("task");
        firstDiv.appendChild(secDiv);

        let thirdDiv = document.createElement("div");
        thirdDiv.classList.add("circle");
        secDiv.appendChild(thirdDiv);

        let dateDiv = document.createElement("p");
        dateDiv.innerHTML = key;
        dateDiv.classList.add("date");
        secDiv.appendChild(dateDiv);

        let img = document.createElement("img");
        img.src = "images/check-mark.png";
        img.classList.add("circle_img");
        if (taskOfListJSON[key].done === true){
            img.classList.add("done");
        }
        thirdDiv.appendChild(img);

        let h3 = document.createElement("h3");
        h3.innerHTML = taskOfListJSON[key].taskText;
        h3.classList.add("task_text");
        if (taskOfListJSON[key].done === true){
            h3.classList.add("done");
        }
        secDiv.appendChild(h3);
        updateAllTheCheckmarks()
    }
}

function updateAllTheCheckmarks() {
    allTheCheckmarks = document.querySelectorAll(".circle");
    allTaskTexts = document.querySelectorAll(".task_text");
    let allDates = document.querySelectorAll(".date");
    allTheCheckmarks.forEach(
        function (currentValue, currentIndex, listObj) {
            currentValue.onclick = function (){
                if(!currentValue.firstElementChild.classList.contains('done')){
                    currentValue.firstElementChild.classList.add("done");
                    allTaskTexts[currentIndex].classList.add("done");
                    changeCheckmarkInLocStorage(document.getElementById("name_of_list_text").innerHTML, allDates[currentIndex].innerHTML, true);
                }else {
                    currentValue.firstElementChild.classList.remove("done")
                    allTaskTexts[currentIndex].classList.remove("done");
                    changeCheckmarkInLocStorage(document.getElementById("name_of_list_text").innerHTML, allDates[currentIndex].innerHTML, false);
                }
            }
        },
    );
}

function changeCheckmarkInLocStorage(key, date, done){
    let json = JSON.parse(localStorage.getItem(key));
    let json_array = JSON.parse(localStorage.getItem(key))[date];
    json_array.done = done;
    json[date] = json_array
    localStorage.setItem(key, JSON.stringify(json))
}

function saveName(className, input, secDiv, remove){
    let h3 = document.createElement("h3");
    h3.innerHTML = input.value;
    h3.classList.add(className);
    if (remove){
        input.remove();
    }
    secDiv.appendChild(h3);
}

function saveInLocalStorage(listName){
    localStorage.setItem(listName, tasks);
}

function setAllTheListFromLocStorage() {
    for (let i = 0; i < localStorage.length; i++){
        addNewList(localStorage.key(i))
    }
    updateAllTheLists();
}

function addNewList(name) {
    let firstDiv = document.getElementById("lists_block");
    let secDiv = document.createElement("div");
    secDiv.classList.add("list_but");
    firstDiv.appendChild(secDiv);

    let img = document.createElement("img");
    img.src = "images/list.png";
    img.classList.add("list_img");
    secDiv.appendChild(img);

    let h3 = document.createElement("h3");
    h3.innerHTML = name;
    h3.classList.add("list_text");
    secDiv.appendChild(h3);
}

function saveNewTasks(listName, done, taskText, secDiv) {
    let oldData = localStorage.getItem(listName);
    oldData = oldData.substring(0, oldData.length-1);

    let date = new Date();

    let text = "";
    if (oldData.length === 1){
        text = oldData+'"'+date+'":{"done":"'+done+'", "taskText":"'+taskText+'"}}';
    }else {
        text = oldData+', "'+date+'":{"done":"'+done+'", "taskText":"'+taskText+'"}}';
    }

    let dateDiv = document.createElement("p");
    dateDiv.innerHTML = date;
    dateDiv.classList.add("date");
    secDiv.appendChild(dateDiv);

    localStorage.setItem(listName, text);
}