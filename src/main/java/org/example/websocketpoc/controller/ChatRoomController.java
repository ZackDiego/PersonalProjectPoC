package org.example.websocketpoc.controller;

import org.example.websocketpoc.model.WebsocketServerResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import org.example.websocketpoc.model.ChatMessage;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChatRoomController {
    @MessageMapping("/messageEndpoint")
    @SendTo("/topic/chatroom")
    public WebsocketServerResponse said(ChatMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new WebsocketServerResponse("FAQ, " + HtmlUtils.htmlEscape(message.getMessage()) + "!");
    }
}



// . It also designates the /app prefix for messages that are bound for methods annotated with @MessageMapping.
// This prefix will be used to define all the message mappings.
// For example, /app/hello is the endpoint that the GreetingController.greeting() method is mapped to handle.