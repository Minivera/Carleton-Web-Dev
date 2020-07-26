package edu.carleton.dev.components;

import edu.carleton.dev.Router;
import edu.carleton.dev.base.RouteWidget;
import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.*;

import java.util.function.Supplier;

@BindTemplate("templates/components/collapsibleMenu.html")
@BindElement(name = "collapsible-menu")
public class CollapsibleMenuComponent extends RouteWidget {
    private Fragment body;
    private boolean opened = false;
    private Supplier<String> titleSupplier;
    private Supplier<String> toSupplier;

    public CollapsibleMenuComponent(Slot slot) {
        super(slot);
    }

    @BindContent
    public void setBody(Fragment body) {
        this.body = body;
    }

    public Fragment getBody() {
        return body;
    }

    public void toggle() {
        opened = !opened;
    }

    public boolean getOpened() {
        return opened;
    }

    public String getCollapsibleStyle() {
        StringBuilder builder = new StringBuilder();
        if (opened) {
            builder.append("transition: max-height 1s ease-in-out; max-height: 9000px;");
        } else {
            builder.append("transition: max-height 0.5s cubic-bezier(0, 1, 0, 1); max-height: 0;");
        }
        builder.append("overflow-y: hidden;");
        return builder.toString();
    }

    @BindAttribute(name = "title")
    public void setTitleSupplier(Supplier<String> titleSupplier) {
        this.titleSupplier = titleSupplier;
    }

    public String getTitle() {
        return titleSupplier.get();
    }

    @BindAttribute(name = "to")
    public void setToSupplier(Supplier<String> toSupplier) {
        this.toSupplier = toSupplier;
    }

    public void routeTo() {
        switch (toSupplier.get()) {
            case "lectures": {
                Routing.open(Router.class).lectures();
                break;
            }
            case "tutorials": {
                Routing.open(Router.class).tutorials();
                break;
            }
            case "assignments": {
                Routing.open(Router.class).assignments();
                break;
            }
        }
    }
}
