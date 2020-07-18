package edu.carleton.dev;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;

import java.util.List;

@BindTemplate("templates/app.html")
public class App extends ApplicationTemplate {
    private Model model = new Model();
    private String newTodo = "";

    public static void main(String[] args) {
        App client = new App();
        client.bind("application-content");
    }

    public Model getModel() {
        return this.model;
    }

    public String getNewTodo() {
        return this.newTodo;
    }

    public void setNewTodo(String newTodo) {
        this.newTodo = newTodo;
    }

    public void addTodo() {
        model.addTodo(this.newTodo);
        this.newTodo = "";
    }

    public boolean allCompleted() {
        for (Model.Todo todo : model.getTodos()) {
            if (!todo.getIsCompleted()) {
                return false;
            }
        }
        return true;
    }

    public void toggleAll(boolean value) {
        for (Model.Todo todo : model.getTodos()) {
            todo.setCompleted(value);
        }
    }
}
