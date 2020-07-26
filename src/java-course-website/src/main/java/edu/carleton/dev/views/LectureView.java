package edu.carleton.dev.views;

import edu.carleton.dev.model.Lecture;
import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/lecture.html")
public class LectureView extends BaseView {
    private final Lecture lecture;

    public LectureView(Model model, String id) {
        super(model);
        this.lecture = this.getModel().getLecture(id);
    }

    public Lecture getLecture() {
        return lecture;
    }
}
