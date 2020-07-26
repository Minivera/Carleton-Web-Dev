package edu.carleton.dev.components;

import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Lecture;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.List;
import java.util.function.Supplier;

@BindTemplate("templates/components/lectures.html")
@BindElement(name = "lectures")
public class LecturesListComponent extends ModelWidget {
    private Supplier<List<Lecture>> lecturesSupplier;

    public LecturesListComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "lectures")
    public void setLecturesSupplier(Supplier<List<Lecture>> lecturesSupplier) {
        this.lecturesSupplier = lecturesSupplier;
    }

    public List<Lecture> getLectures() {
        return lecturesSupplier.get();
    }
}
