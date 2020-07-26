package edu.carleton.dev.views;

import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/lectures.html")
public class LecturesView extends BaseView {
    public LecturesView(Model model) {
        super(model);
    }
}
