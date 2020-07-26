package edu.carleton.dev.views;

import edu.carleton.dev.Router;
import edu.carleton.dev.model.Model;
import edu.carleton.dev.model.Assignment;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/addAssignment.html")
public class AddAssignmentView extends BaseView {
    private String newName;

    public AddAssignmentView(Model model) {
        super(model);
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public void addAssignment() {
        Assignment created = this.getModel().addAssignment(this.newName);
        Routing.open(Router.class).singleAssignment(created.getId());
    }

    public void goBack() {
        Routing.open(Router.class).assignments();
    }
}