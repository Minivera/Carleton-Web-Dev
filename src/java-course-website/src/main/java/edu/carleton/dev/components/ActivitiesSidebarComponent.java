package edu.carleton.dev.components;

import edu.carleton.dev.base.ModelWidget;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

@BindTemplate("templates/components/activitiesSidebar.html")
@BindElement(name = "activities-sidebar")
public class ActivitiesSidebarComponent extends ModelWidget {
    public ActivitiesSidebarComponent(Slot slot) {
        super(slot);
    }
}
