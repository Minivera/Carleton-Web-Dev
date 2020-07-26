package edu.carleton.dev.components;

import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Tutorial;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.List;
import java.util.function.Supplier;

@BindTemplate("templates/components/tutorials.html")
@BindElement(name = "tutorials")
public class TutorialsListComponent extends ModelWidget {
    private Supplier<List<Tutorial>> tutorialsSupplier;

    public TutorialsListComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "tutorials")
    public void setTutorialsSupplier(Supplier<List<Tutorial>> tutorialsSupplier) {
        this.tutorialsSupplier = tutorialsSupplier;
    }

    public List<Tutorial> getTutorials() {
        return tutorialsSupplier.get();
    }
}
