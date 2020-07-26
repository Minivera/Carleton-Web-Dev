package edu.carleton.dev.views;

import edu.carleton.dev.model.Model;
import edu.carleton.dev.model.Tutorial;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/tutorial.html")
public class TutorialView extends BaseView {
    private final Tutorial tutorial;

    public TutorialView(Model model, String id) {
        super(model);
        this.tutorial = this.getModel().getTutorial(id);
    }

    public Tutorial getTutorial() {
        return tutorial;
    }
}
