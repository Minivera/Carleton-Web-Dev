package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

@JsonPersistable
public class Comment {
    private String id;
    private User user;
    private String content;

    public Comment(String id, User user, String content) {
        this.id = id;
        this.user = user;
        this.content = content;
    }

    @JsonCreator
    public Comment(
            @JsonProperty("user") User user,
            @JsonProperty("content") String content
    ) {
        this.user = user;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
