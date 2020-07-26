package edu.carleton.dev.views;

import edu.carleton.dev.model.*;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Templates;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@BindTemplate("templates/views/forumTopic.html")
public class ForumTopicView extends BaseView {
    private final Forum forum;
    private final Topic topic;
    private String newComment;

    public ForumTopicView(Model model, String forumId, String topicId) {
        super(model);
        forum = model.getForum(forumId);
        topic = forum.getTopic(topicId);
    }

    public Forum getForum() {
        return forum;
    }

    public Topic getTopic() {
        return topic;
    }

    public Comment getLastComment() {
        return this.topic.getComments().get(this.topic.getComments().size() - 1);
    }

    public List<Comment> getNextComments() {
        try {
            return this.topic.getComments().subList(1, this.topic.getComments().size());
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public String getNewComment() {
        return newComment;
    }

    public void setNewComment(String newComment) {
        this.newComment = newComment;
    }

    public List<String> commentToList(Comment comment) {
        return Arrays.asList(comment.getContent().split("\n"));
    }

    public void addComment() {
        this.getModel().addTopicComment(this.forum.getId(), this.topic.getId(), Data.users().get(0).getEmail(), newComment);
        this.newComment = "";
    }

    public void deleteComment(Comment comment) {
        this.getModel().deleteTopicComment(this.forum.getId(), this.topic.getId(), comment.getId());
    }
}
