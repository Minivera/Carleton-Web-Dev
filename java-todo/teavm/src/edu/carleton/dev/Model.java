package edu.carleton.dev;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.teavm.jso.browser.Window;
import org.teavm.jso.browser.Storage;
import org.teavm.flavour.json.JSON;
import org.teavm.flavour.json.tree.Node;
import org.teavm.flavour.json.JsonPersistable;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

enum TodoFilterType {
    ALL,
    ACTIVE,
    COMPLETED
}

public class Model {
    private final String storageItemName = "todos";

    @JsonPersistable
    public static class Todo {
        private String title = "";
        private boolean completed = false;
        private Model model;

        public Todo(Model model, String title) {
            this.model = model;
            this.title = title;
        }

        @JsonCreator
        public Todo(@JsonProperty("title") String title) {
            this.title = title;
        }

        public void setTitle(String title) {
            this.title = title;
            this.model.saveToStorage();
        }

        public String getTitle() {
            return this.title;
        }

        public void setCompleted(boolean completed){
            this.completed = completed;
            this.model.saveToStorage();
        }

        public boolean getIsCompleted() {
            return this.completed;
        }

        public void toggle() {
            this.completed = !this.completed;
            this.model.saveToStorage();
        }
    }

    private ArrayList<Todo> todos = new ArrayList<>();
    private final Storage localStorage = Window.current().getLocalStorage();
    private TodoFilterType isShowing = TodoFilterType.ALL;

    public Model() {
        String todosJson = localStorage.getItem(storageItemName);
        if (todosJson != null && !todosJson.isEmpty()) {
            todos = JSON.deserialize(Node.parse(todosJson), ArrayList.class);
            todos.forEach(todo -> todo.model = this);
        }
    }

    public List<Todo> getFilteredTodos() {
        if (this.isShowing == TodoFilterType.ACTIVE) {
            return this.getActiveTodos();
        } else if (this.isShowing == TodoFilterType.COMPLETED) {
            return this.getCompletedTodos();
        }
        return this.todos;
    }

    public List<Todo> getCompletedTodos() {
        return this.todos.stream().filter(Todo::getIsCompleted).collect(Collectors.toList());
    }

    public List<Todo> getActiveTodos() {
        return this.todos.stream().filter(todo -> !todo.getIsCompleted()).collect(Collectors.toList());
    }

    private void saveToStorage() {
        localStorage.setItem(storageItemName, JSON.serialize(todos).stringify());
    }

    public void setIsShowing(TodoFilterType isShowing) {
        this.isShowing = isShowing;
    }

    public TodoFilterType getIsShowing() {
        return this.isShowing;
    }

    public List<Todo> getTodos() {
        return this.todos;
    }

    public void addTodo(String title) {
        this.todos.add(new Todo(this, title));
        this.saveToStorage();
    }

    public void deleteTodo(Todo todo) {
        this.todos.remove(todo);
        this.saveToStorage();
    }

    public void clearCompleted() {
        this.todos = new ArrayList(this.todos.stream().filter(todo -> !todo.completed).collect(Collectors.toList()));
    }
}
