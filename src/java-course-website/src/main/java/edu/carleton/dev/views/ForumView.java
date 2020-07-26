package edu.carleton.dev.views;

import edu.carleton.dev.Router;
import edu.carleton.dev.model.*;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindTemplate;

import java.util.Arrays;
import java.util.List;

@BindTemplate("templates/views/forum.html")
public class ForumView extends BaseView {
    private final Forum forum;
    private String title;
    private String description;

    public ForumView(Model model, String id) {
        super(model);
        forum = model.getForum(id);
    }

    public Forum getForum() {
        return this.forum;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> commentToList(Comment comment) {
        return Arrays.asList(comment.getContent().split("\n"));
    }

    public void deleteTopic(Topic topic) {
        this.getModel().deleteTopic(this.forum.getId(), topic.getId());
    }

    public void createTopic() {
        Topic created = this.getModel().addForumTopic(this.forum.getId(), this.title, Data.users().get(0).getEmail(), this.description);
        Routing.open(Router.class).forumTopic(this.forum.getId(), created.getId());
    }
}
