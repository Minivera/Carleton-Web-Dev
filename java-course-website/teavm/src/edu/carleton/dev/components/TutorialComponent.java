package edu.carleton.dev.components;

import edu.carleton.dev.Router;
import edu.carleton.dev.base.ModelWidget;
import edu.carleton.dev.model.Tutorial;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.function.Supplier;

@BindTemplate("templates/components/tutorial.html")
@BindElement(name = "tutorial")
public class TutorialComponent extends ModelWidget {
    private Supplier<Tutorial> tutorialSupplier;

    public TutorialComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "tutorial")
    public void setTutorialSupplier(Supplier<Tutorial> tutorialSupplier) {
        this.tutorialSupplier = tutorialSupplier;
    }

    public Tutorial getTutorial() {
        return tutorialSupplier.get();
    }

    public void deleteTutorial() {
        if (this.getModel().deleteTutorial(this.getTutorial().getId())) {
            Routing.open(Router.class).tutorials();
        }
    }
}
