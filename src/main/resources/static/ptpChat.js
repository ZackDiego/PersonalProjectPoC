

const stompClient = new StompJs.Client({
    brokerURL: 'ws://35.72.46.23/chatroom-websocket'
});

stompClient.onConnect = (frame) => {
    var from = $("#from").val();
    var to = $("#to").val();

    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/single/chat/'+ from, function (result) {
        showContent(JSON.parse(result.body));
    });

    stompClient.subscribe('/single/chat/'+ to, function (result) {
        showContent(JSON.parse(result.body));
    });

    console.log("from:" + from);
    console.log("to:" + to);
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $( "#connect").prop("disabled" , connected);
    $( "#disconnect").prop("disabled", ! connected);
    if (connected) {
        $( "#conversation" ).show();
    }
    else {
        $( "#conversation" ).hide();
    }
    // $( "#notice").html("" );
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
        destination: "/websocket/ptp/single/chat",
        body: JSON.stringify({
            'content': $("#content").val(),
            'to': $("#to").val(),
            'from': $("#from").val()
        })
    });
}

function showContent(body) {
    $( "#conversation-body").append("<tr><td>" + body.content + "</td> <td>"+new Date(body.time).toLocaleString()+"</td> </tr>" );
}

$( function () {
    $( "form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click( function () { connect(); });
    $( "#disconnect" ).click( function () { disconnect(); });
    $( "#send" ).click( function () { sendMessage(); });
});