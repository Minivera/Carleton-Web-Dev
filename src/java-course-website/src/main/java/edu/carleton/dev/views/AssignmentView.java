package edu.carleton.dev.views;

import edu.carleton.dev.model.Assignment;
import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/assignment.html")
public class AssignmentView extends BaseView {
    private final Assignment assignment;

    public AssignmentView(Model model, String id) {
        super(model);
        this.assignment = this.getModel().getAssignment(id);
    }

    public Assignment getAssignment() {
        return assignment;
    }
}
