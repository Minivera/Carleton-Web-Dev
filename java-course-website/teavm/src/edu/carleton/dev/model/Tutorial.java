package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

import java.util.ArrayList;
import java.util.List;

@JsonPersistable
public class Tutorial {
    private String id;
    private String name;
    private String term;
    private ListElement specfile;
    private List<ListElement> resources;

    public Tutorial(String id, String name, String term, ListElement specfile) {
        this(id, name, term, specfile, new ArrayList<>());
    }

    public Tutorial(String id, String name, String term, ListElement specfile, List<ListElement> resources) {
        this.id = id;
        this.name = name;
        this.term = term;
        this.specfile = specfile;
        this.resources = resources;
    }

    @JsonCreator
    public Tutorial(
            @JsonProperty("name") String name,
            @JsonProperty("term") String slides,
            @JsonProperty("specfile") ListElement specfile,
            @JsonProperty("resources") List<ListElement> resources
    ) {
        this.name = name;
        this.term = slides;
        this.specfile = specfile;
        this.resources = resources;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public ListElement getSpecfile() {
        return specfile;
    }

    public void setSpecfile(ListElement specfile) {
        this.specfile = specfile;
    }

    public List<ListElement> getResources() {
        return resources;
    }

    public void setResources(List<ListElement> resources) {
        this.resources = resources;
    }
}
