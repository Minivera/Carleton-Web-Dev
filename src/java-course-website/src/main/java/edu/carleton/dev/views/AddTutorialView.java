package edu.carleton.dev.views;

import edu.carleton.dev.Router;
import edu.carleton.dev.model.Model;
import edu.carleton.dev.model.Tutorial;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/addTutorial.html")
public class AddTutorialView extends BaseView {
    private String newName;

    public AddTutorialView(Model model) {
        super(model);
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public void addTutorial() {
        Tutorial created = this.getModel().addTutorial(this.newName);
        Routing.open(Router.class).singleTutorial(created.getId());
    }

    public void goBack() {
        Routing.open(Router.class).tutorials();
    }
}