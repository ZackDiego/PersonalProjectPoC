const stompClient = new StompJs.Client({
    brokerURL: 'ws://35.72.46.23/chatroom-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/chatroom', (result) => {
        showContent(JSON.parse(result.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    // $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    if (stompClient !== null ) {
        stompClient.deactivate();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.publish({
        destination: "/app/channelEndpoint",
        body: JSON.stringify({'message': $("#message").val()})
    });
}

function showContent(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
});