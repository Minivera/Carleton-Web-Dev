package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

@JsonPersistable
public class ListElement {
    private String title;
    private String url;

    @JsonCreator
    public ListElement(
            @JsonProperty("title") String title,
            @JsonProperty("url") String url
    ) {
        this.title = title;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
