package edu.carleton.dev.base;

import edu.carleton.dev.Router;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.Slot;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Consumer;

public class RouteWidget extends AbstractWidget {
    public RouteWidget(Slot slot) {
        super(slot);
    }

    public Router route(Consumer<String> consumer) {
        return Routing.build(Router.class, consumer);
    }
}
