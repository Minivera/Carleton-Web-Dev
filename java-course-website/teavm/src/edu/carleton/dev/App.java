package edu.carleton.dev;

import edu.carleton.dev.model.Model;
import edu.carleton.dev.views.*;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;
import org.teavm.flavour.widgets.RouteBinder;

@BindTemplate("templates/app.html")
public class App extends ApplicationTemplate implements Router {
    private final Model model = new Model();

    public static void main(String[] args) {
        App client = new App();
        new RouteBinder()
            .withDefault(Router.class, Router::index)
            .add(client)
            .update();

        client.bind("application-content");
    }

    public Model getModel() {
        return this.model;
    }

    @Override
    public void index() {
        setView(new IndexView(this.model));
    }

    @Override
    public void singleLecture(String id) {
        setView(new LectureView(this.model, id));
    }

    @Override
    public void lectures() {
        setView(new LecturesView(this.model));
    }

    @Override
    public void addLecture() {
        setView(new AddLectureView(this.model));
    }

    @Override
    public void singleTutorial(String id) {
        this.setView(new TutorialView(this.model, id));
    }

    @Override
    public void tutorials() {
        setView(new TutorialsView(this.model));
    }

    @Override
    public void addTutorial() {
        setView(new AddTutorialView(this.model));
    }

    @Override
    public void singleAssignment(String id) {
        this.setView(new AssignmentView(this.model, id));
    }

    @Override
    public void assignments() {
        this.setView(new AssignmentsView(this.model));
    }

    @Override
    public void addAssignment() {
        setView(new AddAssignmentView(this.model));
    }

    @Override
    public void forumTopic(String forumId, String topic_id) {
        setView(new ForumTopicView(this.model, forumId, topic_id));
    }

    @Override
    public void singleForum(String id) {
        setView(new ForumView(this.model, id));
    }

    @Override
    public void forums() {
        this.setView(new ForumsView(this.model));
    }
}
