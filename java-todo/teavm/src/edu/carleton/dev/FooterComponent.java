package edu.carleton.dev;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.Slot;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Supplier;

@BindTemplate("templates/components/footer.html")
@BindElement(name = "footer")
public class FooterComponent extends AbstractWidget {
    public FooterComponent(Slot slot) {
        super(slot);
    }

    private Supplier<Model> modelSupplier;

    @BindAttribute(name = "model")
    public void setModelSupplier(Supplier<Model> modelSupplier) {
        this.modelSupplier = modelSupplier;
    }

    public Model getModel() {
        return modelSupplier.get();
    }

    public int getCount() {
        return getModel().getActiveTodos().size();
    }

    public int getCompletedCount() {
        return getModel().getCompletedTodos().size();
    }
}
