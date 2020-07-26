package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

import java.util.ArrayList;
import java.util.List;

@JsonPersistable
public class Lecture {
    private String id;
    private String unit;
    private List<ListElement> slides;
    private List<ListElement> recordings;
    private List<ListElement> code;

    public Lecture(String id, String unit, List<ListElement> slides, List<ListElement> recordings) {
        this(id, unit, slides, recordings, new ArrayList<>());
    }

    public Lecture(String id, String unit, List<ListElement> slides, List<ListElement> recordings, List<ListElement> code) {
        this.id = id;
        this.unit = unit;
        this.slides = slides;
        this.recordings = recordings;
        this.code = code;
    }

    @JsonCreator
    public Lecture(
            @JsonProperty("unit") String unit,
            @JsonProperty("slides") List<ListElement> slides,
            @JsonProperty("recordings") List<ListElement> recordings,
            @JsonProperty("code") List<ListElement> code
    ) {
        this.unit = unit;
        this.slides = slides;
        this.recordings = recordings;
        this.code = code;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public List<ListElement> getSlides() {
        return slides;
    }

    public void setSlides(List<ListElement> slides) {
        this.slides = slides;
    }

    public List<ListElement> getRecordings() {
        return recordings;
    }

    public void setRecordings(List<ListElement> recordings) {
        this.recordings = recordings;
    }

    public List<ListElement> getCode() {
        return code;
    }

    public void setCode(List<ListElement> code) {
        this.code = code;
    }
}
