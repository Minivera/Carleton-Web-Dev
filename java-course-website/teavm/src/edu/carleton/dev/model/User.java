package edu.carleton.dev.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

@JsonPersistable
public class User {
    private String name;
    private String role;
    private String email;
    private String avatar;

    public User(
            @JsonProperty("name") String name,
            @JsonProperty("role") String role,
            @JsonProperty("email") String email,
            @JsonProperty("avatar") String avatar
    ) {
        this.name = name;
        this.role = role;
        this.email = email;
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
