package org.example.websocketpoc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InMessage {

    private String from;

    private String to;

    private String content;

    private Date time;

    public String getFrom() {
        return from;
    }

    public InMessage(String content) {
        this.content = content;
    }
}
