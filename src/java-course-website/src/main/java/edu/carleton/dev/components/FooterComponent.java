package edu.carleton.dev.components;

import edu.carleton.dev.Router;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.Slot;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Consumer;

@BindTemplate("templates/components/footer.html")
@BindElement(name = "footer")
public class FooterComponent extends AbstractWidget {
    public FooterComponent(Slot slot) {
        super(slot);
    }

    public Router route(Consumer<String> consumer) {
        return Routing.build(Router.class, consumer);
    }
}
