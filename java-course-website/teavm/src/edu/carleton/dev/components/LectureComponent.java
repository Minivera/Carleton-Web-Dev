package edu.carleton.dev.components;

import edu.carleton.dev.Router;
import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Lecture;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.function.Supplier;

@BindTemplate("templates/components/lecture.html")
@BindElement(name = "lecture")
public class LectureComponent extends ModelWidget {
    private Supplier<Lecture> lectureSupplier;

    public LectureComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "lecture")
    public void setLectureSupplier(Supplier<Lecture> lectureSupplier) {
        this.lectureSupplier = lectureSupplier;
    }

    public Lecture getLecture() {
        return this.lectureSupplier.get();
    }

    public void deleteLecture() {
        if (this.getModel().deleteLecture(this.getLecture().getId())) {
            Routing.open(Router.class).lectures();
        }
    }
}
