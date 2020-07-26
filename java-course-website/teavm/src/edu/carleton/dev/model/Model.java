package edu.carleton.dev.model;

import org.teavm.jso.browser.Window;
import org.teavm.jso.browser.Storage;
import org.teavm.flavour.json.JSON;
import org.teavm.flavour.json.tree.Node;

import java.util.List;

public class Model {
    private final String storageItemName = "course-content";

    private CourseContent content = new CourseContent();
    private final Storage localStorage = Window.current().getLocalStorage();

    public Model() {
        String contentJson = localStorage.getItem(storageItemName);
        if (contentJson != null && !contentJson.isEmpty()) {
            content = JSON.deserialize(Node.parse(contentJson), CourseContent.class);
        }
    }

    public List<Lecture> getLectures() {
        return content.getLectures();
    }

    public List<Tutorial> getTutorials() {
        return content.getTutorials();
    }

    public List<Assignment> getAssignments() {
        return content.getAssignments();
    }

    public List<Forum> getForums() {
        return content.getForums();
    }

    public Lecture getLecture(String id) {
        return content.getLectures().stream().filter(el -> el.getId().equals(id)).limit(1).findAny().orElse(null);
    }

    public Tutorial getTutorial(String id) {
        return content.getTutorials().stream().filter(el -> el.getId().equals(id)).limit(1).findAny().orElse(null);
    }

    public Assignment getAssignment(String id) {
        return content.getAssignments().stream().filter(el -> el.getId().equals(id)).limit(1).findAny().orElse(null);
    }

    public Forum getForum(String id) {
        return content.getForums().stream().filter(el -> el.getId().equals(id)).limit(1).findAny().orElse(null);
    }

    public Topic forumTopic(String forumId, String topicId) {
        Forum found = getForum(forumId);
        if (found != null) {
            return found.getTopic(topicId);
        }
        return null;
    }

    public Lecture addLecture(String newName) {
        Lecture newLecture = Data.newLecture(String.valueOf(content.getLectures().size()), newName);
        content.getLectures().add(newLecture);
        this.saveToStorage();
        return newLecture;
    }

    public Tutorial addTutorial(String newName) {
        Tutorial newTutorial = Data.newTutorial(String.valueOf(content.getTutorials().size()), newName);
        content.getTutorials().add(newTutorial);
        this.saveToStorage();
        return newTutorial;
    }

    public Assignment addAssignment(String newName) {
        Assignment newAssignment = Data.newAssignment(String.valueOf(content.getAssignments().size()), newName);
        content.getAssignments().add(newAssignment);
        this.saveToStorage();
        return newAssignment;
    }

    public Topic addForumTopic(String forumId, String title, String username, String content) {
        Forum found = getForum(forumId);
        if (found != null) {
            Topic created = found.addTopic(title, Data.getUser(username), content);
            this.saveToStorage();
            return created;
        }
        return null;
    }

    public Comment addTopicComment(String forumId, String topicId, String username, String content) {
        Forum found = getForum(forumId);
        if (found != null) {
            Comment created = found.addComment(topicId, Data.getUser(username), content);
            this.saveToStorage();
            return created;
        }
        return null;
    }

    public boolean deleteLecture(String id) {
        if (content.getLectures().remove(getLecture(id))) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    public boolean deleteTutorial(String id) {
        if (content.getTutorials().remove(getTutorial(id))) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    public boolean deleteAssignment(String id) {
        if (content.getAssignments().remove(getAssignment(id))) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    public boolean deleteTopic(String forumId, String topicId) {
        Forum found = getForum(forumId);
        if (found != null && found.deleteTopic(topicId)) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    public boolean deleteTopicComment(String forumId, String topicId, String commentId) {
        Forum found = getForum(forumId);
        if (found != null && found.deleteComment(topicId, commentId)) {
            this.saveToStorage();
            return true;
        }
        return false;
    }

    private void saveToStorage() {
        localStorage.setItem(storageItemName, JSON.serialize(content).stringify());
    }
}
