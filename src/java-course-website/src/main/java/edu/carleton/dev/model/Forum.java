package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

import java.util.ArrayList;
import java.util.List;

@JsonPersistable
public class Forum {
    private String id;
    private String title;
    private List<Topic> topics;

    public Forum(String id, String title) {
        this.id = id;
        this.title = title;
        this.topics = new ArrayList<>();
    }

    public Forum(String id, String title, List<Topic> topics) {
        this.id = id;
        this.title = title;
        this.topics = topics;
    }

    @JsonCreator
    public Forum(
            @JsonProperty("title") String title,
            @JsonProperty("topics") List<Topic> topics
    ) {
        this.title = title;
        this.topics = topics;
    }

    public Topic getTopic(String id) {
        return topics.stream().filter(el -> el.getId().equals(id)).limit(1).findAny().orElse(null);
    }

    public Topic addTopic(String title, User user, String content) {
        Topic created = new Topic(String.valueOf(topics.size()), title, content, user);
        topics.add(created);
        return created;
    }

    public boolean deleteTopic(String topicId) {
        return topics.remove(getTopic(topicId));
    }

    public Comment addComment(String topicId, User user, String content) {
        Topic found = getTopic(topicId);
        if (found != null) {
            return found.addComment(user, content);
        }
        return null;
    }

    public boolean deleteComment(String topicId, String commentId) {
        Topic found = getTopic(topicId);
        if (found != null) {
            return found.deleteComment(commentId);
        }
        return false;
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

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }
}
