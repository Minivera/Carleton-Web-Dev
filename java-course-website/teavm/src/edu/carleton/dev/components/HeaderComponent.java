package edu.carleton.dev.components;

import edu.carleton.dev.base.ModelWidget;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.Slot;

@BindTemplate("templates/components/header.html")
@BindElement(name = "header")
public class HeaderComponent extends ModelWidget {
    public HeaderComponent(Slot slot) {
        super(slot);
    }
}
