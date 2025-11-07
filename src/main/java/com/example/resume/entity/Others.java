package com.example.resume.entity;

import jakarta.persistence.*;


@Entity
public class Others {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long othersId;

    private String documentName;

    @Lob
    private byte[] documentFile;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and Setters
    public Long getOthersId() {
        return othersId;
    }

    public void setOthersId(Long othersId) {
        this.othersId = othersId;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public byte[] getDocumentFile() {
        return documentFile;
    }

    public void setDocumentFile(byte[] documentFile) {
        this.documentFile = documentFile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
