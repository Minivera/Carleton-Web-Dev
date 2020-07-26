package edu.carleton.dev.views;

import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/tutorials.html")
public class TutorialsView extends BaseView {
    public TutorialsView(Model model) {
        super(model);
    }
}
