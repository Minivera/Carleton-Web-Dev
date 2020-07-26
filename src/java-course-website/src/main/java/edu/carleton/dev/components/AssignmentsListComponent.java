package edu.carleton.dev.components;

import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Assignment;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.List;
import java.util.function.Supplier;

@BindTemplate("templates/components/assignments.html")
@BindElement(name = "assignments")
public class AssignmentsListComponent extends ModelWidget {
    private Supplier<List<Assignment>> assignmentsSupplier;

    public AssignmentsListComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "assignments")
    public void setAssignmentsSupplier(Supplier<List<Assignment>> assignmentsSupplier) {
        this.assignmentsSupplier = assignmentsSupplier;
    }

    public List<Assignment> getAssignments() {
        return assignmentsSupplier.get();
    }
}
