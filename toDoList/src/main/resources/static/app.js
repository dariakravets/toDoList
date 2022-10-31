let socket = new WebSocket("ws://localhost:2324/user");

socket.onopen = function () {
    console.log("Connection is made");
};

socket.onclose = function () {
    if (event.wasClean) {
        console.log('Connection is closed');
    } else {
        console.log('Обрыв соединения');
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

socket.onmessage = function (event) {
    console.log(event.data)
};

socket.onerror = function (error) {
    console.log("Ошибка " + error.message);
};

document.getElementById("send").onclick = function () {
    socket.send(document.getElementById("user").value)
}

