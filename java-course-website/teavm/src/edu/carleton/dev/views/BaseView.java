package edu.carleton.dev.views;

import edu.carleton.dev.Router;
import edu.carleton.dev.model.*;
import org.teavm.flavour.routing.Routing;

import java.util.List;
import java.util.function.Consumer;

public class BaseView {
    private final Model model;

    public BaseView(Model model) {
        this.model = model;
    }

    public Router route(Consumer<String> consumer) {
        return Routing.build(Router.class, consumer);
    }

    public Model getModel() {
        return model;
    }

    public List<Lecture> getLectures() {
        return model.getLectures();
    }

    public List<Tutorial> getTutorials() {
        return model.getTutorials();
    }

    public List<Assignment> getAssignments() {
        return model.getAssignments();
    }

    public List<Forum> getForums() {
        return model.getForums();
    }
}
