package org.example.websocketpoc.controller;

import org.example.websocketpoc.model.InGroupMessage;
import org.example.websocketpoc.model.InMessage;
import org.example.websocketpoc.model.OutMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatRoomController {

    @Autowired
    private SimpMessagingTemplate messageTemplate;

    @MessageMapping("/channelEndpoint")
//    @SendTo("/chatGroup/chatroom")
    public void said(InGroupMessage message) throws Exception {
        // Send the response to the dynamically constructed destination
        messageTemplate.convertAndSend(
                "/chatGroup/" + message.getChatGroup(),
                new OutMessage(message.getFrom()+" send: " + message.getContent()));
    }

    @MessageMapping("/ptp/single/chat")
    public void processPtpChatMessage(InMessage message) {
        // Send to Message Receiver
        messageTemplate.convertAndSend("/single/chat/"+ message.getTo(),
                new OutMessage(message.getFrom()+" send: "+ message.getContent()));
        // Send to Message Sender
        messageTemplate.convertAndSend("/single/chat/"+ message.getFrom(),
                new OutMessage(message.getFrom()+" send: "+ message.getContent()));
    }
}



// . It also designates the /app prefix for messages that are bound for methods annotated with @MessageMapping.
// This prefix will be used to define all the message mappings.
// For example, /app/hello is the endpoint that the GreetingController.greeting() method is mapped to handle.