package edu.carleton.dev;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.Slot;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Supplier;

@BindTemplate("templates/components/todo-item.html")
@BindElement(name = "todo-item")
public class TodoItemComponent extends AbstractWidget {
    private boolean isEditing = false;
    private String newText = "";

    public TodoItemComponent(Slot slot) {
        super(slot);
    }

    public void edit() {
        this.isEditing = true;
        this.newText = this.getTodo().getTitle();
    }

    public boolean getIsEditing() {
        return isEditing;
    }

    public void setNewText(String newText) {
        this.newText = newText;
    }

    public String getNewText() {
        return newText;
    }

    public void saveEdit() {
        if (this.newText.isEmpty()) {
            return;
        }

        this.getTodo().setTitle(newText);
        this.isEditing = false;
        this.newText = this.getTodo().getTitle();
    }

    public String getTodoText() {
        if (this.isEditing) {
            return newText;
        }
        return this.getTodo().getTitle();
    }

    private Supplier<Model.Todo> todoSupplier;
    private Supplier<Model> modelSupplier;

    @BindAttribute(name = "todo")
    public void setTodoSupplier(Supplier<Model.Todo> todoSupplier) {
        this.todoSupplier = todoSupplier;
    }

    public Model.Todo getTodo() {
        return todoSupplier.get();
    }

    @BindAttribute(name = "model")
    public void setModelSupplier(Supplier<Model> modelSupplier) {
        this.modelSupplier = modelSupplier;
    }

    public Model getModel() {
        return modelSupplier.get();
    }
}
