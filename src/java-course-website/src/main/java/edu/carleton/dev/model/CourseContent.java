package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

@JsonPersistable
public class CourseContent {
    private List<Lecture> lectures;
    private List<Tutorial> tutorials;
    private List<Assignment> assignments;
    private List<Forum> forums;

    public CourseContent() {
        lectures = Data.lectures();
        for (int i = 0; i < lectures.size(); i++) {
            lectures.get(i).setId(String.valueOf(i));
        }

        tutorials = Data.tutorials();
        for (int i = 0; i < tutorials.size(); i++) {
            tutorials.get(i).setId(String.valueOf(i));
        }

        assignments = Data.assignments();
        for (int i = 0; i < assignments.size(); i++) {
            assignments.get(i).setId(String.valueOf(i));
        }

        forums = new ArrayList<Forum>(Arrays.asList(
                new Forum("0", "Announcements"),
                new Forum("1", "General"))
        );
    }

    @JsonCreator
    public CourseContent(
            @JsonProperty("lectures") List<Lecture> lectures,
            @JsonProperty("tutorials") List<Tutorial> tutorials,
            @JsonProperty("assignments") List<Assignment> assignments,
            @JsonProperty("forums") List<Forum> forums
    ) {
        this.lectures = lectures;
        this.tutorials = tutorials;
        this.assignments = assignments;
        this.forums = forums;
    }

    public List<Lecture> getLectures() {
        return lectures;
    }

    public void setLectures(List<Lecture> lectures) {
        this.lectures = lectures;
    }

    public List<Tutorial> getTutorials() {
        return tutorials;
    }

    public void setTutorials(List<Tutorial> tutorials) {
        this.tutorials = tutorials;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    public List<Forum> getForums() {
        return forums;
    }

    public void setForums(List<Forum> forums) {
        this.forums = forums;
    }
}
