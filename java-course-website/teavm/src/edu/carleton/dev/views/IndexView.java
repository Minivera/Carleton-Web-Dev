package edu.carleton.dev.views;

import edu.carleton.dev.model.*;
import org.teavm.flavour.templates.BindTemplate;

@BindTemplate("templates/views/index.html")
public class IndexView extends BaseView {
    public IndexView(Model model) {
        super(model);
    }

    public int getForumTopicsCount() {
        int count = 0;
        for (Forum forum: getForums()) {
            count += forum.getTopics().size();
        }
        return count;
    }
}
