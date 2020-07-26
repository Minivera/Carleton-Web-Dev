package edu.carleton.dev.base;

import edu.carleton.dev.model.*;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.Slot;

import java.util.List;
import java.util.function.Supplier;

public class ModelWidget extends RouteWidget {
    private Supplier<Model> modelSupplier;

    public ModelWidget(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "model")
    public void setModelSupplier(Supplier<Model> modelSupplier) {
        this.modelSupplier = modelSupplier;
    }

    public Model getModel() {
        return modelSupplier.get();
    }

    public List<Lecture> getLectures() {
        return getModel().getLectures();
    }

    public List<Tutorial> getTutorials() {
        return getModel().getTutorials();
    }

    public List<Assignment> getAssignments() {
        return getModel().getAssignments();
    }

    public List<Forum> getForums() {
        return getModel().getForums();
    }
}
