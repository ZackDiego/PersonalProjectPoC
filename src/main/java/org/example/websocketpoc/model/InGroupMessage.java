package org.example.websocketpoc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InGroupMessage {

    private String from;

    private String chatGroup;

    private String content;

    private Date time;

    public String getFrom() {
        return from;
    }

    public InGroupMessage(String content) {
        this.content = content;
    }
}
