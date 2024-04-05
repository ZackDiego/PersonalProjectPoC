const stompClient = new StompJs.Client({
    brokerURL: 'ws://35.72.46.23/chatroom-websocket'
});

stompClient.onConnect = (frame) => {
    var group = $("#chat-group").val();

    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/chatGroup/'+ group, (result) => {
        showContent(JSON.parse(result.body));
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
        destination: "/websocket/channelEndpoint",
        body: JSON.stringify({
            'content': $("#content").val(),
            'from': $("#name").val(),
            'chatGroup': $("#chat-group").val()
        })
    });
}

function showContent(body) {
    $( "#conversation-body").append("<tr><td>" + body.content + "</td> <td>"+new Date(body.time).toLocaleString()+"</td> </tr>" );
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
});