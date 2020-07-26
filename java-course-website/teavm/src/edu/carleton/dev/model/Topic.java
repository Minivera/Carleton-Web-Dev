package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;
import java.util.ArrayList;
import java.util.List;

@JsonPersistable
public class Topic {
    private String id;
    private String title;
    private List<Comment> comments;

    public Topic(String id, String title, String description, User user) {
        this.id = id;
        this.title = title;
        this.comments = new ArrayList<>();
        this.comments.add(new Comment("0", user, description));
    }

    @JsonCreator
    public Topic(
            @JsonProperty("title") String title,
            @JsonProperty("comments") List<Comment> comments
    ) {
        this.title = title;
        this.comments = comments;
    }

    public Comment getComment(String commentId) {
        return comments.stream().filter(el -> el.getId().equals(commentId)).limit(1).findAny().orElse(null);
    }

    public Comment addComment(User user, String content) {
        Comment created = new Comment(String.valueOf(comments.size()), user, content);
        comments.add(created);
        return created;
    }

    public boolean deleteComment(String commentId) {
        return comments.remove(getComment(commentId));
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
