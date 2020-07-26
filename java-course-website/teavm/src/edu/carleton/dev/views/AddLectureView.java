package edu.carleton.dev.views;

import edu.carleton.dev.Router;
import edu.carleton.dev.model.Lecture;
import edu.carleton.dev.model.Model;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/addLecture.html")
public class AddLectureView extends BaseView {
    private String newName;

    public AddLectureView(Model model) {
        super(model);
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public void addLecture() {
        Lecture created = this.getModel().addLecture(this.newName);
        Routing.open(Router.class).singleLecture(created.getId());
    }

    public void goBack() {
        Routing.open(Router.class).lectures();
    }
}