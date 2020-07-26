package edu.carleton.dev.components;

import edu.carleton.dev.Router;
import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Assignment;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.function.Supplier;

@BindTemplate("templates/components/assignment.html")
@BindElement(name = "assignment")
public class AssignmentComponent extends ModelWidget {
    private Supplier<Assignment> assignmentSupplier;

    public AssignmentComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "assignment")
    public void setAssignmentSupplier(Supplier<Assignment> assignmentSupplier) {
        this.assignmentSupplier = assignmentSupplier;
    }

    public Assignment getAssignment() {
        return assignmentSupplier.get();
    }

    public void deleteAssignment() {
        if (this.getModel().deleteAssignment(getAssignment().getId())) {
            Routing.open(Router.class).assignments();
        }
    }
}
