package org.example.websocketpoc.model;

public class WebsocketServerResponse {

    private String content;

    public WebsocketServerResponse() {
    }

    public WebsocketServerResponse(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

}