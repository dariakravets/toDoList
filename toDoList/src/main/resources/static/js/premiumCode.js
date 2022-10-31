axios.get('http://3.87.204.1/premiumCode?code='+getCookie("premiumCode")).then(resp => {
    if (resp.data){
        let prem_block = document.getElementById("premium_block");
        prem_block.innerHTML = "";

        let secDiv = document.createElement("div");
        secDiv.classList.add("online_list_but");
        secDiv.id = "online_list_but";
        prem_block.appendChild(secDiv);

        let img = document.createElement("img");
        img.src = "images/list.png";
        img.classList.add("online_list_img");
        secDiv.appendChild(img);

        let h3 = document.createElement("h3");
        h3.innerHTML = "Online List";
        h3.classList.add("online_list_text");
        secDiv.appendChild(h3);

        setActionForOnlineListBut();
    }
});

function setActionForOnlineListBut() {
    document.getElementById("online_list_but").onclick = function () {
        getAllOnlineTasks();
        document.getElementById("add_task").style.display = "none";

        document.getElementById("name_of_list_text").innerHTML = "Online List";
        document.getElementById("name_of_list").style.display = "flex";
        document.getElementById("tasks").style.display = "flex";
        document.getElementById("add_task_online").style.display = "flex";

        document.getElementById("add_task_online").onclick = function () {
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
                    let h3 = document.createElement("h3");
                    h3.innerHTML = text;
                    h3.classList.add("task_text");
                    input.remove();
                    secDiv.appendChild(h3);

                    let date = new Date();
                    let dateDiv = document.createElement("p");
                    dateDiv.innerHTML = date;
                    dateDiv.classList.add("date");
                    secDiv.appendChild(dateDiv);
                    updateAllTheCheckmarks();

                    saveInDB(text, false, date);
                }
            });
            input.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    input.blur();
                }
            });
        }
    }
}

function saveInDB(taskText, done, date) {
    axios.get('http://3.87.204.1/saveTask?taskText='+taskText+'&done='+done+'&date='+date);
}

function getAllOnlineTasks() {
    updateAllTheCheckmarks();
    axios.get('http://3.87.204.1/getAll').then(resp => {
        let taskOfListJSON = resp.data;
        let firstDiv = document.getElementById("tasks");
        firstDiv.innerHTML = "";
        if (taskOfListJSON.length === undefined){
            for (let key in taskOfListJSON) {
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
                if (taskOfListJSON[key].done === "true") {
                    img.classList.add("done");
                }
                thirdDiv.appendChild(img);

                let h3 = document.createElement("h3");
                h3.innerHTML = taskOfListJSON[key].taskText;
                h3.classList.add("task_text");
                if (taskOfListJSON[key].done === "true") {
                    h3.classList.add("done");
                }
                secDiv.appendChild(h3);
            }
        }

        updateAllTheCheckmarks();
    });

}

function updateAllTheCheckmarks() {
    let allTheCheckmarks = document.querySelectorAll(".circle");
    let allTaskTexts = document.querySelectorAll(".task_text");
    let allDates = document.querySelectorAll(".date");
    allTheCheckmarks.forEach(
        function (currentValue, currentIndex, listObj) {
            currentValue.onclick = function (){
                if(!currentValue.firstElementChild.classList.contains('done')){
                    currentValue.firstElementChild.classList.add("done");
                    allTaskTexts[currentIndex].classList.add("done");
                    changeCheckmarkInDB(allDates[currentIndex].innerHTML, true);
                }else {
                    currentValue.firstElementChild.classList.remove("done")
                    allTaskTexts[currentIndex].classList.remove("done");
                    changeCheckmarkInDB(allDates[currentIndex].innerHTML, false);                }
            }
        },
    );
}

function changeCheckmarkInDB(date, done) {
    axios.get('http://3.87.204.1/updateDone?done='+done+'&date='+date);
}

document.getElementById("btn_get_premium").onclick = function () {
    let input_code = document.getElementById("premium_input");
    axios.get('http://3.87.204.1/premiumCode?code='+input_code.value).then(resp => {
        if (resp.data){
            document.cookie = "premiumCode="+input_code.value;
            input_code.style.border = "0px"
            location.reload();
        }else {
            input_code.style.border = "2px solid #FA3107"
        }
    });
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
