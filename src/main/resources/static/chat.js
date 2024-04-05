
//這個方法只是用來改變樣式，不是核心
function setConnected(connected) {
    $( "#connect").prop("disabled" , connected);
    $( "#disconnect").prop("disabled", ! connected);
    if (connected) {
        $( "#conversation" ).show();
    }
    else {
        $( "#conversation" ).hide();
    }
    $( "#notice").html("" );
}

// 1、建立連接（先連接服務端設定檔中的基地台，建立連接，然後訂閱伺服器目錄訊息
function connect() {
    // 1、連接SockJS的endpoint是“endpoint-websocket”，與後台程式碼中註冊的endpoint 要一樣。var
    socket = new SockJS('/chatroom-websocket');

    // 2、用stomp包裝，規範協定
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {

        // 3、建立通訊
        setConnected( true );
        console.log( 'Connected: ' + frame);

        // 4.透過stompClient.subscribe（）訂閱伺服器的目標是'/topic/game_chat'發送過來的位址，與@SendTo中的位址對應。
        stompClient.subscribe('/topic/chatroom', function (result) {
            console.info(result)
            showContent(JSON.parse(result.body));
        });
    });
}

// 2、關閉連線
function disconnect() {
    if (stompClient !== null ) {
        stompClient.disconnect();
    }
    setConnected( false );
    console.log( "Disconnected" );
}

// 3、遊戲管理員發送公告訊息（這個也是遊戲使用者所沒有功能，其它都一樣）
function sendName() {
    // 1、透過stompClient.send 向/app/gonggao/chat 目標發送訊息,這個是在控制器的@messageMapping 中定義的。 (/app為前綴，配置內配置）
    stompClient.send(
        "/app/messageEndpoint", {},
        JSON.stringify({
            'content': $("#content" ).val(),
            'from': $("#from").val()
        }));
}

// 4、訂閱的訊息顯示在客戶端指定位置
function showContent(body) {
    $( "#notice").append("<tr><td>" + body.content + "</td> <td>"+ new Date(body.time).toLocaleString()+"</td> </tr>" );
}


$( function () {
    $( "form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click( function () { connect(); });
    $( "#disconnect" ).click( function () { disconnect(); });
    $( "#send" ).click( function () { sendName(); });
});