package edu.carleton.dev.views;

import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/assignments.html")
public class AssignmentsView extends BaseView {
    public AssignmentsView(Model model) {
        super(model);
    }
}
