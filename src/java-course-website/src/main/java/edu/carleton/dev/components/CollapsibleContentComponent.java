package edu.carleton.dev.components;

import org.teavm.flavour.templates.*;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Supplier;

@BindTemplate("templates/components/collapsibleContent.html")
@BindElement(name = "collapsible-content")
public class CollapsibleContentComponent extends AbstractWidget {
    private Fragment body;
    private boolean opened = true;
    private Supplier<String> titleSupplier;

    public CollapsibleContentComponent(Slot slot) {
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

    public String getStyle() {
        StringBuilder builder = new StringBuilder();
        if (opened) {
            builder.append("transition: max-height 1s ease-in-out; max-height: 9000px; padding-bottom: 20px;");
        } else {
            builder.append("transition: max-height 0.5s cubic-bezier(0, 1, 0, 1); max-height: 0; padding-bottom: 0;");
        }
        builder.append("overflow-y: hidden; margin-left: -20px; padding-left: 20px; margin-right: -20px; padding-right: 20px;");
        return builder.toString();
    }

    @BindAttribute(name = "title")
    public void setTitleSupplier(Supplier<String> titleSupplier) {
        this.titleSupplier = titleSupplier;
    }

    public String getTitle() {
        return titleSupplier.get();
    }
}
