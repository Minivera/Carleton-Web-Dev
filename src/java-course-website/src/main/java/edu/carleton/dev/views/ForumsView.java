package edu.carleton.dev.views;

import edu.carleton.dev.model.Model;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/forums.html")
public class ForumsView extends BaseView {
    public ForumsView(Model model) {
        super(model);
    }
}
