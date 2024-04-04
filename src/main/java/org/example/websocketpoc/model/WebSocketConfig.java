package org.example.websocketpoc.model;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic/", "/queue/");
        config.setApplicationDestinationPrefixes("/app");;

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/endpointChatRoom").
                setAllowedOrigins("mydomain.com").
                withSockJS();
        registry.addEndpoint("/chatroom-websocket");
    }
}


//@EnableWebSocketMessageBroker註解是宣告啟用STOMP協定,他是WebSocket的子協定來傳輸(message broker)消息,當註冊了之後控制器(Controller)就能使用@MessageMapping
//configureMessageBroker方法是配製訊息代理(Message broker)
//registerStompEndpoints方法是我們註冊了一個節點,用來映射指定URL,方法內註冊一個STOMP的endpoint,並且指定使用SockJS協定