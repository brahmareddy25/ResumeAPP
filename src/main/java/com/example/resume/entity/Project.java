package com.example.resume.entity;

import jakarta.persistence.*;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String projectTitle;
    private String softwareUsed;
    private String technologyUsed;

    @Column(length = 2000)
    private String description;

    @Lob
    private byte[] document;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and Setters
    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getSoftwareUsed() {
        return softwareUsed;
    }

    public void setSoftwareUsed(String softwareUsed) {
        this.softwareUsed = softwareUsed;
    }

    public String getTechnologyUsed() {
        return technologyUsed;
    }

    public void setTechnologyUsed(String technologyUsed) {
        this.technologyUsed = technologyUsed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getDocument() {
        return document;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
