let socket = new WebSocket("ws://localhost:2324/task");

socket.onopen = function () {
    console.log("Connection is made");
    console.log(socket.sessionId)
};

socket.onclose = function () {
    if (event.wasClean) {
        console.log('Connection is closed');
    } else {
        console.log('Connection is lost');
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

socket.onmessage = function (event) {
    console.log(event.data)
};

socket.onerror = function (error) {
    console.log("Error " + error.message);
};

