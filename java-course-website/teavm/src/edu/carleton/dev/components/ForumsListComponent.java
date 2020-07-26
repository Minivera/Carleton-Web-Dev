package edu.carleton.dev.components;

import edu.carleton.dev.base.RouteWidget;
import edu.carleton.dev.model.Forum;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.Slot;

import java.util.List;
import java.util.function.Supplier;

@BindTemplate("templates/components/forums.html")
@BindElement(name = "forums")
public class ForumsListComponent extends RouteWidget {
    private Supplier<List<Forum>> forumsSupplier;

    public ForumsListComponent(Slot slot) {
        super(slot);
    }

    @BindAttribute(name = "forums")
    public void setForumsSupplier(Supplier<List<Forum>> forumsSupplier) {
        this.forumsSupplier = forumsSupplier;
    }

    public List<Forum> getForums() {
        return forumsSupplier.get();
    }
}
